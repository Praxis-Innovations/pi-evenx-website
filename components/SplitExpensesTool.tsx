'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import {
  buildTransactionCalculation,
  calculateExpenseSummary,
  formatCurrencyFromCents,
  formatInputCurrency,
  parseCurrencyToCents,
  Person,
  sanitizeDecimalInput,
  SplitType,
  TransactionDraft,
} from '@/lib/splitExpenses';
import styles from '@/components/SplitExpensesTool.module.css';

const INITIAL_PEOPLE: Person[] = [
  { id: 'person-you', name: 'You' },
  { id: 'person-alex', name: 'Alex' },
] as const;

const EXAMPLE_PEOPLE: Person[] = [
  { id: 'sample-maya', name: 'Maya' },
  { id: 'sample-luca', name: 'Luca' },
  { id: 'sample-nina', name: 'Nina' },
] as const;

const EXAMPLE_TRANSACTIONS: TransactionDraft[] = [
  {
    id: 'sample-1',
    title: 'Dinner',
    amount: '96.40',
    payerId: 'sample-maya',
    participantIds: ['sample-maya', 'sample-luca', 'sample-nina'],
    splitType: 'even',
    customShares: {},
    ratioShares: {},
  },
  {
    id: 'sample-2',
    title: 'Museum tickets',
    amount: '72.00',
    payerId: 'sample-luca',
    participantIds: ['sample-luca', 'sample-nina'],
    splitType: 'custom',
    customShares: {
      'sample-luca': '36.00',
      'sample-nina': '36.00',
    },
    ratioShares: {},
  },
  {
    id: 'sample-3',
    title: 'Hotel room',
    amount: '210.00',
    payerId: 'sample-nina',
    participantIds: ['sample-maya', 'sample-luca', 'sample-nina'],
    splitType: 'ratio',
    customShares: {},
    ratioShares: {
      'sample-maya': '2',
      'sample-luca': '1',
      'sample-nina': '1',
    },
  },
] as const;

let idCounter = 0;

function createId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function createDefaultPersonName(people: Person[]) {
  const usedIndexes = new Set(
    people
      .map((person) => person.name.trim())
      .map((name) => {
        const match = /^person\s+(\d+)$/i.exec(name);
        return match ? Number(match[1]) : null;
      })
      .filter((value): value is number => value !== null && Number.isInteger(value) && value > 0),
  );

  let nextIndex = 1;

  while (usedIndexes.has(nextIndex)) {
    nextIndex += 1;
  }

  return `Person ${nextIndex}`;
}

function createEmptyTransaction(people: Person[]): TransactionDraft {
  return {
    id: createId('transaction'),
    title: '',
    amount: '',
    payerId: people[0]?.id ?? '',
    participantIds: people.map((person) => person.id),
    splitType: 'even',
    customShares: {},
    ratioShares: {},
  };
}

function buildInitialState() {
  const people = INITIAL_PEOPLE.map((person) => ({ ...person }));

  return {
    people,
    transactions: [
      {
        id: 'transaction-initial',
        title: '',
        amount: '',
        payerId: people[0]?.id ?? '',
        participantIds: people.map((person) => person.id),
        splitType: 'even' as const,
        customShares: {},
        ratioShares: {},
      },
    ],
  };
}

export default function SplitExpensesTool() {
  const initialState = buildInitialState();
  const [people, setPeople] = useState<Person[]>(initialState.people);
  const [transactions, setTransactions] = useState<TransactionDraft[]>(initialState.transactions);
  const [newPersonName, setNewPersonName] = useState('');
  const [expandedTransactionIds, setExpandedTransactionIds] = useState<Set<string>>(
    new Set(),
  );
  const [validatedTransactionIds, setValidatedTransactionIds] = useState<Set<string>>(
    new Set(),
  );
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const namedPeople = people.map((person, index) => ({
    ...person,
    name: person.name.trim() || `Person ${index + 1}`,
  }));
  const blankNameIds = new Set(
    people.filter((person) => !person.name.trim()).map((person) => person.id),
  );
  const summary = calculateExpenseSummary(namedPeople, transactions);
  const hasVisibleTransactionErrors = Object.keys(summary.transactionErrors).some(
    (transactionId) =>
      validatedTransactionIds.has(transactionId) &&
      Object.keys(summary.transactionErrors[transactionId] ?? {}).length > 0,
  );
  const hasBlockingErrors =
    blankNameIds.size > 0 || summary.activeTransactionCount !== summary.validTransactionCount;
  const canShowResults = summary.activeTransactionCount > 0 && !hasBlockingErrors;
  const nonZeroTotals = summary.totals.filter(
    (row) => row.totalPaidCents !== 0 || row.totalOwedCents !== 0 || row.netCents !== 0,
  );

  function setTransactionExpanded(transactionId: string, expanded: boolean) {
    setExpandedTransactionIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (expanded) {
        nextIds.add(transactionId);
      } else {
        nextIds.delete(transactionId);
      }

      return nextIds;
    });
  }

  function updateTransaction(
    transactionId: string,
    updater: (current: TransactionDraft) => TransactionDraft,
  ) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === transactionId ? updater(transaction) : transaction,
      ),
    );
  }

  function addPerson() {
    const trimmed = newPersonName.trim();
    const currentPersonIds = people.map((person) => person.id);
    const nextName = trimmed || createDefaultPersonName(people);
    const nextPerson: Person = { id: createId('person'), name: nextName };

    setPeople((currentPeople) => [...currentPeople, nextPerson]);
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) => {
        const parsedAmountCents = parseCurrencyToCents(transaction.amount);
        const isZeroOrBlankAmount = parsedAmountCents === null || parsedAmountCents === 0;
        const includesAllCurrentPeople = currentPersonIds.every((personId) =>
          transaction.participantIds.includes(personId),
        );

        if (!isZeroOrBlankAmount || !includesAllCurrentPeople) {
          return transaction;
        }

        return {
          ...transaction,
          participantIds: [...transaction.participantIds, nextPerson.id],
          customShares:
            transaction.splitType === 'custom'
              ? {
                  ...transaction.customShares,
                  [nextPerson.id]: transaction.customShares[nextPerson.id] ?? '0.00',
                }
              : transaction.customShares,
          ratioShares:
            transaction.splitType === 'ratio'
              ? {
                  ...transaction.ratioShares,
                  [nextPerson.id]: transaction.ratioShares[nextPerson.id] ?? '1',
                }
              : transaction.ratioShares,
        };
      }),
    );
    setNewPersonName('');
  }

  function removePerson(personId: string) {
    const remainingPeople = people.filter((person) => person.id !== personId);

    setPeople(remainingPeople);
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) => {
        const fallbackPayerId = remainingPeople[0]?.id ?? '';
        const nextParticipantIds = transaction.participantIds.filter(
          (participantId) => participantId !== personId,
        );
        const sanitizedParticipants =
          nextParticipantIds.length > 0 || !fallbackPayerId
            ? nextParticipantIds
            : [fallbackPayerId];
        const nextCustomShares = Object.fromEntries(
          Object.entries(transaction.customShares).filter(([key]) => key !== personId),
        );
        const nextRatioShares = Object.fromEntries(
          Object.entries(transaction.ratioShares).filter(([key]) => key !== personId),
        );

        return {
          ...transaction,
          payerId: transaction.payerId === personId ? fallbackPayerId : transaction.payerId,
          participantIds: sanitizedParticipants,
          customShares: nextCustomShares,
          ratioShares: nextRatioShares,
        };
      }),
    );
  }

  function addTransaction() {
    const invalidTransactionIds = transactions.flatMap((transaction) => {
      const result = buildTransactionCalculation(transaction, namedPeople);

      if (result.isBlank || Object.keys(result.errors).length === 0) {
        return [];
      }

      return [transaction.id];
    });

    if (invalidTransactionIds.length > 0) {
      setValidatedTransactionIds((currentIds) => {
        const nextIds = new Set(currentIds);

        for (const transactionId of invalidTransactionIds) {
          nextIds.add(transactionId);
        }

        return nextIds;
      });

      setExpandedTransactionIds((currentIds) => {
        const nextIds = new Set(currentIds);

        for (const transactionId of invalidTransactionIds) {
          nextIds.add(transactionId);
        }

        return nextIds;
      });

      return;
    }

    const nextTransaction = createEmptyTransaction(people);
    setTransactions((currentTransactions) => [...currentTransactions, nextTransaction]);
  }

  function resetAll() {
    const resetState = buildInitialState();
    setPeople(resetState.people);
    setTransactions(resetState.transactions);
    setNewPersonName('');
    setExpandedTransactionIds(new Set());
    setValidatedTransactionIds(new Set());
    setIsMembersModalOpen(false);
  }

  function loadExample() {
    setPeople(EXAMPLE_PEOPLE.map((person) => ({ ...person })));
    setTransactions(EXAMPLE_TRANSACTIONS.map((transaction) => ({ ...transaction })));
    setNewPersonName('');
    setExpandedTransactionIds(new Set());
    setValidatedTransactionIds(new Set());
    setIsMembersModalOpen(false);
  }

  function renamePerson(personId: string, name: string) {
    setPeople((currentPeople) =>
      currentPeople.map((person) => (person.id === personId ? { ...person, name } : person)),
    );
  }

  function toggleParticipant(transaction: TransactionDraft, participantId: string) {
    const isSelected = transaction.participantIds.includes(participantId);
    const nextParticipantIds = isSelected
      ? transaction.participantIds.filter((currentId) => currentId !== participantId)
      : [...transaction.participantIds, participantId];

    updateTransaction(transaction.id, (current) => ({
      ...current,
      participantIds: nextParticipantIds,
      customShares: isSelected
        ? Object.fromEntries(
            Object.entries(current.customShares).filter(([key]) => key !== participantId),
          )
        : current.customShares,
      ratioShares: isSelected
        ? Object.fromEntries(
            Object.entries(current.ratioShares).filter(([key]) => key !== participantId),
          )
        : {
            ...current.ratioShares,
            ...(current.splitType === 'ratio'
              ? { [participantId]: current.ratioShares[participantId] ?? '1' }
              : {}),
          },
    }));
  }

  function setSplitType(transaction: TransactionDraft, splitType: SplitType) {
    updateTransaction(transaction.id, (current) => {
      if (splitType === 'custom') {
        const calculation = buildTransactionCalculation(
          { ...current, splitType: 'even' },
          namedPeople,
        );
        const prefills =
          !calculation.isBlank && Object.keys(calculation.errors).length === 0
            ? Object.fromEntries(
                calculation.allocations.map((allocation) => [
                  allocation.personId,
                  formatInputCurrency(allocation.amountCents),
                ]),
              )
            : Object.fromEntries(
                current.participantIds.map((participantId) => [
                  participantId,
                  current.customShares[participantId] ?? '',
                ]),
              );

        return {
          ...current,
          splitType,
          customShares: prefills,
        };
      }

      if (splitType === 'ratio') {
        return {
          ...current,
          splitType,
          ratioShares: Object.fromEntries(
            current.participantIds.map((participantId) => [
              participantId,
              current.ratioShares[participantId] ?? '1',
            ]),
          ),
        };
      }

      return {
        ...current,
        splitType,
      };
    });
  }

  return (
    <div className={styles.workspace}>
      <section className={`${styles.panel} ${styles.mainPanel}`}>
        <header className={styles.toolbar}>
          <div className={styles.toolIdentity}>
            <span className={styles.toolbarBadge}>
              <Icon name="calculator" size={18} />
            </span>
            <h1>Split expenses</h1>
          </div>

          <div className={styles.iconActions}>
            <button
              type="button"
              className={styles.manageMembersButton}
              onClick={() => setIsMembersModalOpen(true)}
              aria-label={`Manage members (${people.length})`}
              title={`Manage members (${people.length})`}
            >
              <Icon name="users" size={16} />
              <span className={styles.manageMembersLabel}>
                {people.length} {people.length === 1 ? 'Member' : 'Members'}
              </span>
              <span className={styles.manageMembersCount} aria-hidden="true">
                {people.length}
              </span>
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={loadExample}
              aria-label="Load sample data"
              title="Load sample data"
            >
              <Icon name="bolt" size={18} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={resetAll}
              aria-label="Start over"
              title="Start over"
            >
              <Icon name="redo" size={18} />
            </button>
          </div>
        </header>

        <section
          className={`${styles.surface} ${styles.summarySectionPrimary}`}
          aria-labelledby="summary-heading"
        >
          <div className={styles.sectionHeader}>
            <h2 id="summary-heading" className={styles.sectionTitle}>
              Summary
            </h2>
            <div className={styles.summaryHeaderStats}>
              <div className={styles.summaryHeaderStat}>
                <span>Expenses</span>
                <strong>{summary.activeTransactionCount}</strong>
              </div>
              <div className={styles.summaryHeaderStat}>
                <span>Total</span>
                <strong>{formatCurrencyFromCents(summary.totalSpentCents)}</strong>
              </div>
            </div>
          </div>

          {blankNameIds.size > 0 ? (
            <div className={`${styles.stateCard} ${styles.stateError}`}>
              Add a name for every person.
            </div>
          ) : null}

          {summary.activeTransactionCount === 0 ? (
            <div className={`${styles.stateCard} ${styles.stateCardCentered}`}>
              Add expense to see who owes whom.
            </div>
          ) : null}

          {hasVisibleTransactionErrors ? (
            <div className={`${styles.stateCard} ${styles.stateError}`}>
              Fix the highlighted fields to finish the calculation.
            </div>
          ) : null}

          {canShowResults ? (
            <div className={styles.summaryContentRow}>
              <div className={styles.summaryBlock}>
                <h3 className={styles.summarySubheading}>Who owes whom</h3>

                {summary.settlements.length > 0 ? (
                  <div className={styles.settlementLedger}>
                    {summary.settlements.map((settlement) => (
                      <div
                        key={`${settlement.fromPersonId}-${settlement.toPersonId}`}
                        className={styles.settlementCompactRow}
                      >
                        <div className={styles.settlementRoute}>
                          <span className={styles.settlementFrom}>{settlement.fromName}</span>
                          <span className={styles.settlementVerb}>pays</span>
                          <span className={styles.settlementTo}>{settlement.toName}</span>
                        </div>
                        <div className={styles.settlementAmountCompact}>
                          {formatCurrencyFromCents(settlement.amountCents)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.stateCard}>Everyone is settled.</div>
                )}
              </div>

              {nonZeroTotals.length > 0 ? (
                <div id="summary-details-panel" className={styles.summaryDetailsPanel}>
                  <h3 className={styles.summarySubheading}>Per-person breakdown</h3>

                  <div className={styles.summaryDetailList}>
                    <div
                      className={`${styles.summaryDetailRow} ${styles.summaryDetailRowHeader}`}
                      aria-hidden="true"
                    >
                      <span>Person</span>
                      <span>Paid</span>
                      <span>Owed</span>
                      <span>Net</span>
                    </div>

                    {nonZeroTotals.map((row) => {
                      const netClassName =
                        row.netCents > 0
                          ? styles.positiveValue
                          : row.netCents < 0
                            ? styles.negativeValue
                            : styles.neutralValue;

                      return (
                        <div key={row.personId} className={styles.summaryDetailItem}>
                          <div className={styles.summaryDetailRow}>
                            <span className={styles.summaryName}>{row.name}</span>
                            <span
                              className={`${styles.summaryCellValue} ${styles.summaryMetricCell}`}
                              data-label="Paid"
                            >
                              {formatCurrencyFromCents(row.totalPaidCents)}
                            </span>
                            <span
                              className={`${styles.summaryCellValue} ${styles.summaryMetricCell}`}
                              data-label="Owed"
                            >
                              {formatCurrencyFromCents(row.totalOwedCents)}
                            </span>
                            <span
                              className={`${netClassName} ${styles.summaryMetricCell}`}
                              data-label="Net"
                            >
                              {formatCurrencyFromCents(row.netCents)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        <section
          className={`${styles.surface} ${styles.expensesSection}`}
          aria-labelledby="transactions-heading"
        >
            <div className={styles.sectionHeader}>
              <h2 id="transactions-heading" className={styles.sectionTitle}>
                Expenses
              </h2>

              <button
                type="button"
                className={`${styles.iconButton} ${styles.iconButtonPrimary} ${styles.addExpenseButton} ${styles.addExpenseButtonTop}`}
                onClick={addTransaction}
                aria-label="Add expense"
                title="Add expense"
              >
                <Icon name="plus" size={18} />
                <span>Add expense</span>
              </button>
            </div>

            <div className={styles.expenseTable}>
              <div className={styles.tableHeader} aria-hidden="true">
                <span>Title</span>
                <span>Amount</span>
                <span>Who paid</span>
                <span>Split type</span>
                <span>People</span>
                <span>Actions</span>
              </div>

            <div className={styles.transactionList}>
              {transactions.map((transaction, index) => {
                const errors = validatedTransactionIds.has(transaction.id)
                  ? summary.transactionErrors[transaction.id] ?? {}
                  : {};
                const calculation = buildTransactionCalculation(transaction, namedPeople);
                const evenPreview =
                  !calculation.isBlank &&
                  Object.keys(calculation.errors).length === 0 &&
                  calculation.allocations.length > 0
                    ? calculation.allocations
                    : [];
                const isExpanded =
                  expandedTransactionIds.has(transaction.id) ||
                  Boolean(errors.participantIds) ||
                  Boolean(errors.customShares) ||
                  Boolean(errors.ratioShares);
                const splitCountLabel = `${transaction.participantIds.length} person${
                  transaction.participantIds.length === 1 ? '' : 's'
                }`;

                return (
                  <article key={transaction.id} className={styles.rowGroup}>
                    <div className={styles.rowGrid}>
                      <div className={styles.titleCell}>
                        <input
                          id={`title-${transaction.id}`}
                          type="text"
                          value={transaction.title}
                          onChange={(event) =>
                            updateTransaction(transaction.id, (current) => ({
                              ...current,
                              title: event.target.value,
                            }))
                          }
                          placeholder={`Expense ${index + 1}`}
                          className={`${styles.field} ${styles.titleInput}`}
                          aria-label={`Expense ${index + 1} title`}
                        />
                      </div>

                      <div className={styles.inputCell}>
                        <div className={`${styles.prefixedField} ${
                          errors.amount ? styles.fieldError : ''
                        }`}>
                          <span className={styles.fieldPrefix}>$</span>
                          <input
                            id={`amount-${transaction.id}`}
                            inputMode="decimal"
                            step="0.01"
                            value={transaction.amount}
                            onChange={(event) =>
                              updateTransaction(transaction.id, (current) => {
                                const nextAmount = sanitizeDecimalInput(event.target.value);
                                const hasAnyCustomInput = current.participantIds.some((participantId) =>
                                  (current.customShares[participantId] ?? '').trim().length > 0,
                                );

                                if (
                                  current.splitType === 'custom' &&
                                  !hasAnyCustomInput &&
                                  nextAmount.trim().length > 0 &&
                                  current.participantIds.length > 0
                                ) {
                                  const evenCalculation = buildTransactionCalculation(
                                    {
                                      ...current,
                                      amount: nextAmount,
                                      splitType: 'even',
                                    },
                                    namedPeople,
                                  );

                                  if (
                                    !evenCalculation.isBlank &&
                                    Object.keys(evenCalculation.errors).length === 0 &&
                                    evenCalculation.allocations.length > 0
                                  ) {
                                    return {
                                      ...current,
                                      amount: nextAmount,
                                      customShares: Object.fromEntries(
                                        evenCalculation.allocations.map((allocation) => [
                                          allocation.personId,
                                          formatInputCurrency(allocation.amountCents),
                                        ]),
                                      ),
                                    };
                                  }
                                }

                                return {
                                  ...current,
                                  amount: nextAmount,
                                };
                              })
                            }
                            placeholder="0.00"
                            className={styles.field}
                            aria-label={`Expense ${index + 1} amount`}
                          />
                        </div>
                        {errors.amount ? <div className={styles.fieldNote}>{errors.amount}</div> : null}
                      </div>

                      <div className={styles.inputCell}>
                        <div
                          className={`${styles.selectWrap} ${styles.payerControl} ${
                            errors.payerId ? styles.fieldError : ''
                          }`}
                        >
                          <select
                            id={`payer-${transaction.id}`}
                            value={transaction.payerId}
                            onChange={(event) =>
                              updateTransaction(transaction.id, (current) => ({
                                ...current,
                                payerId: event.target.value,
                              }))
                            }
                            className={`${styles.select} ${styles.compactSelect}`}
                            aria-label={`Expense ${index + 1} payer`}
                          >
                            {people.length === 0 ? <option value="">Add a person first</option> : null}
                            {namedPeople.map((person) => (
                              <option key={person.id} value={person.id}>
                                {person.name}
                              </option>
                            ))}
                          </select>
                          <span className={styles.selectIcon} aria-hidden="true">
                            <Icon name="chevron-down" size={16} />
                          </span>
                        </div>
                        {errors.payerId ? <div className={styles.fieldNote}>{errors.payerId}</div> : null}
                      </div>

                      <div className={styles.inputCell}>
                        <div className={`${styles.selectWrap} ${styles.splitTypeControl}`}>
                          <select
                            value={transaction.splitType}
                            onChange={(event) =>
                              setSplitType(transaction, event.target.value as SplitType)
                            }
                            className={`${styles.select} ${styles.compactSelect}`}
                            aria-label={`Expense ${index + 1} split type`}
                          >
                            <option value="even">Even</option>
                            <option value="custom">Custom</option>
                            <option value="ratio">Ratio</option>
                          </select>
                          <span className={styles.selectIcon} aria-hidden="true">
                            <Icon name="chevron-down" size={16} />
                          </span>
                        </div>
                      </div>

                      <div className={styles.countCell}>{splitCountLabel}</div>
                      <div className={styles.actionsCell}>
                        <button
                          type="button"
                          className={`${styles.iconButton} ${styles.expandButton}`}
                          onClick={() => setTransactionExpanded(transaction.id, !isExpanded)}
                          aria-expanded={isExpanded}
                          aria-controls={`details-${transaction.id}`}
                          aria-label={isExpanded ? 'Collapse expense details' : 'Expand expense details'}
                          title={isExpanded ? 'Collapse details' : 'Expand details'}
                        >
                          <Icon
                            name="chevron-down"
                            size={16}
                            className={`${styles.chevronIcon} ${
                              isExpanded ? styles.chevronIconOpen : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          className={styles.iconButton}
                          onClick={() => {
                            setTransactions((currentTransactions) =>
                              currentTransactions.filter((item) => item.id !== transaction.id),
                            );
                            setTransactionExpanded(transaction.id, false);
                            setValidatedTransactionIds((currentIds) => {
                              const nextIds = new Set(currentIds);
                              nextIds.delete(transaction.id);
                              return nextIds;
                            });
                          }}
                          aria-label={`Delete expense ${index + 1}`}
                          title="Delete expense"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </div>
 
                    {isExpanded ? (
                      <div id={`details-${transaction.id}`} className={styles.rowDetails}>
                        <div className={styles.detailBlock}>
                          <span className={styles.detailLabel}>Split with</span>
                          <div className={styles.participants}>
                            {namedPeople.map((person) => {
                              const isSelected = transaction.participantIds.includes(person.id);

                              return (
                                <button
                                  key={person.id}
                                  type="button"
                                  className={`${styles.pill} ${isSelected ? styles.pillActive : ''}`}
                                  onClick={() => toggleParticipant(transaction, person.id)}
                                >
                                  {person.name}
                                </button>
                              );
                            })}
                          </div>
                          {errors.participantIds ? (
                            <div className={styles.fieldNote}>{errors.participantIds}</div>
                          ) : null}
                        </div>

                        {transaction.splitType === 'custom' ? (
                          <div className={styles.detailBlock}>
                            <span className={styles.detailLabel}>Custom amounts</span>
                            <div className={styles.shareList}>
                              {transaction.participantIds.map((participantId) => {
                                const person = namedPeople.find((entry) => entry.id === participantId);

                                if (!person) {
                                  return null;
                                }

                                return (
                                  <div key={participantId} className={styles.shareRow}>
                                    <span className={styles.shareLabel}>{person.name}</span>
                                    <div className={`${styles.prefixedField} ${
                                      errors.customShares ? styles.fieldError : ''
                                    }`}>
                                      <span className={styles.fieldPrefix}>$</span>
                                      <input
                                        inputMode="decimal"
                                        step="0.01"
                                        value={transaction.customShares[participantId] ?? ''}
                                        onChange={(event) =>
                                          updateTransaction(transaction.id, (current) => ({
                                            ...current,
                                            customShares: {
                                              ...current.customShares,
                                              [participantId]: sanitizeDecimalInput(
                                                event.target.value,
                                              ),
                                            },
                                          }))
                                        }
                                        placeholder="0.00"
                                        className={styles.field}
                                        aria-label={`${person.name} custom amount`}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {errors.customShares ? (
                              <div className={styles.fieldNote}>{errors.customShares}</div>
                            ) : null}
                          </div>
                        ) : null}

                        {transaction.splitType === 'ratio' ? (
                          <div className={styles.detailBlock}>
                            <span className={styles.detailLabel}>Ratio values</span>
                            <div className={styles.shareList}>
                              {transaction.participantIds.map((participantId) => {
                                const person = namedPeople.find((entry) => entry.id === participantId);

                                if (!person) {
                                  return null;
                                }

                                return (
                                  <div key={participantId} className={styles.shareRow}>
                                    <span className={styles.shareLabel}>{person.name}</span>
                                    <input
                                      inputMode="decimal"
                                      step="0.01"
                                      value={transaction.ratioShares[participantId] ?? ''}
                                      onChange={(event) =>
                                        updateTransaction(transaction.id, (current) => ({
                                          ...current,
                                          ratioShares: {
                                            ...current.ratioShares,
                                            [participantId]: sanitizeDecimalInput(
                                              event.target.value,
                                            ),
                                          },
                                        }))
                                      }
                                      placeholder="1"
                                      className={`${styles.field} ${
                                        errors.ratioShares ? styles.fieldError : ''
                                      }`}
                                      aria-label={`${person.name} ratio value`}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            {errors.ratioShares ? (
                              <div className={styles.fieldNote}>{errors.ratioShares}</div>
                            ) : null}
                          </div>
                        ) : null}

                        {transaction.splitType === 'even' && evenPreview.length > 0 ? (
                          <div className={styles.mutedText}>
                            {evenPreview
                              .map((allocation) => {
                                const person = namedPeople.find(
                                  (entry) => entry.id === allocation.personId,
                                );

                                return `${person?.name ?? 'Person'} ${formatCurrencyFromCents(
                                  allocation.amountCents,
                                )}`;
                              })
                              .join(' • ')}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <div className={styles.expenseFooterAction}>
              <button
                type="button"
                className={`${styles.iconButton} ${styles.iconButtonPrimary} ${styles.addExpenseButton} ${styles.addExpenseButtonBottom}`}
                onClick={addTransaction}
                aria-label="Add expense"
                title="Add expense"
              >
                <Icon name="plus" size={18} />
                <span>Add expense</span>
              </button>
            </div>
            </div>
        </section>

        {isMembersModalOpen ? (
          <div
            className={styles.modalOverlay}
            role="presentation"
            onClick={() => setIsMembersModalOpen(false)}
          >
            <section
              className={styles.membersModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="manage-members-heading"
              onClick={(event) => event.stopPropagation()}
            >
              <header className={styles.modalHeader}>
                <h2 id="manage-members-heading" className={styles.sectionTitle}>
                  Manage members
                </h2>
                <button
                  type="button"
                  className={styles.modalCloseButton}
                  onClick={() => setIsMembersModalOpen(false)}
                >
                  Close
                </button>
              </header>

              <div className={styles.modalBody}>
                <div className={`${styles.addRow} ${styles.peopleAddRow}`}>
                  <input
                    type="text"
                    value={newPersonName}
                    onChange={(event) => setNewPersonName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        addPerson();
                      }
                    }}
                    placeholder="Add person"
                    className={styles.field}
                    aria-label="Add person"
                  />
                  <button
                    type="button"
                    className={`${styles.iconButton} ${styles.addMemberButton}`}
                    onClick={addPerson}
                    aria-label="Add member"
                    title="Add member"
                  >
                    <Icon name="plus" size={18} />
                  </button>
                </div>

                {blankNameIds.size > 0 ? (
                  <div className={styles.fieldNote}>Every person needs a name.</div>
                ) : null}

                <div className={styles.modalPeopleList}>
                  {people.map((person) => {
                    const disableDelete = people.length <= 1;

                    return (
                      <div key={person.id} className={styles.personRow}>
                        <input
                          id={`person-${person.id}`}
                          type="text"
                          value={person.name}
                          onChange={(event) => renamePerson(person.id, event.target.value)}
                          placeholder="Name"
                          className={`${styles.field} ${
                            blankNameIds.has(person.id) ? styles.fieldError : ''
                          }`}
                        />
                        <button
                          type="button"
                          className={styles.iconButton}
                          onClick={() => removePerson(person.id)}
                          disabled={disableDelete}
                          aria-label={`Remove ${person.name || 'person'}`}
                          title="Remove person"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <footer className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.modalDoneButton}
                  onClick={() => setIsMembersModalOpen(false)}
                >
                  Done
                </button>
              </footer>
            </section>
          </div>
        ) : null}
      </section>
    </div>
  );
}
