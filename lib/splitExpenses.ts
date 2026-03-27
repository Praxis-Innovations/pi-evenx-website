export type SplitType = 'even' | 'custom' | 'ratio';

export type Person = {
  id: string;
  name: string;
};

export type TransactionDraft = {
  id: string;
  title: string;
  amount: string;
  payerId: string;
  participantIds: string[];
  splitType: SplitType;
  customShares: Record<string, string>;
  ratioShares: Record<string, string>;
};

export type TransactionErrors = {
  amount?: string;
  payerId?: string;
  participantIds?: string;
  customShares?: string;
  ratioShares?: string;
};

export type PersonTotals = {
  personId: string;
  name: string;
  totalPaidCents: number;
  totalOwedCents: number;
  netCents: number;
};

export type Settlement = {
  fromPersonId: string;
  fromName: string;
  toPersonId: string;
  toName: string;
  amountCents: number;
};

export type CalculationResult = {
  activeTransactionCount: number;
  validTransactionCount: number;
  transactionErrors: Record<string, TransactionErrors>;
  totals: PersonTotals[];
  settlements: Settlement[];
  totalSpentCents: number;
};

type Allocation = {
  personId: string;
  amountCents: number;
};

export function formatCurrencyFromCents(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseCurrencyToCents(value: string) {
  const normalized = value.replace(/,/g, '').trim();

  if (!normalized) {
    return null;
  }

  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.round(parsed * 100);
}

export function sanitizeDecimalInput(value: string, maxDecimals = 2) {
  const normalized = value.replace(/[^\d.]/g, '');

  if (!normalized) {
    return '';
  }

  const dotIndex = normalized.indexOf('.');

  if (dotIndex === -1) {
    return normalized;
  }

  const integerPart = normalized.slice(0, dotIndex) || '0';
  const rawDecimalPart = normalized.slice(dotIndex + 1).replace(/\./g, '');
  const decimalPart = rawDecimalPart.slice(0, maxDecimals);

  return `${integerPart}.${decimalPart}`;
}

export function formatInputCurrency(cents: number) {
  return (cents / 100).toFixed(2);
}

export function buildTransactionCalculation(
  transaction: TransactionDraft,
  people: Person[],
) {
  const peopleMap = new Map(people.map((person) => [person.id, person]));
  const errors: TransactionErrors = {};

  if (isTransactionBlank(transaction)) {
    return { isBlank: true as const, errors };
  }

  const amountCents = parseCurrencyToCents(transaction.amount);

  if (amountCents === null || amountCents <= 0) {
    errors.amount = 'Enter a valid amount greater than 0.';
  }

  if (!transaction.payerId || !peopleMap.has(transaction.payerId)) {
    errors.payerId = 'Choose who paid for this expense.';
  }

  const participantIds = transaction.participantIds.filter((participantId, index, allIds) => {
    return allIds.indexOf(participantId) === index && peopleMap.has(participantId);
  });

  if (participantIds.length === 0) {
    errors.participantIds = 'Select at least one participant.';
  }

  if (Object.keys(errors).length > 0 || amountCents === null || amountCents <= 0) {
    return {
      isBlank: false as const,
      errors,
      amountCents: amountCents ?? 0,
      allocations: [] as Allocation[],
    };
  }

  let allocations: Allocation[] = [];

  if (transaction.splitType === 'even') {
    allocations = allocateEvenly(participantIds, amountCents);
  }

  if (transaction.splitType === 'custom') {
    const customAllocations = allocateCustom(transaction, participantIds, amountCents);

    if ('error' in customAllocations) {
      errors.customShares = customAllocations.error;
    } else {
      allocations = customAllocations.allocations;
    }
  }

  if (transaction.splitType === 'ratio') {
    const ratioAllocations = allocateByRatio(transaction, participantIds, amountCents);

    if ('error' in ratioAllocations) {
      errors.ratioShares = ratioAllocations.error;
    } else {
      allocations = ratioAllocations.allocations;
    }
  }

  return {
    isBlank: false as const,
    errors,
    amountCents,
    allocations,
  };
}

export function calculateExpenseSummary(
  people: Person[],
  transactions: TransactionDraft[],
): CalculationResult {
  const totalsMap = new Map(
    people.map((person) => [
      person.id,
      {
        personId: person.id,
        name: person.name,
        totalPaidCents: 0,
        totalOwedCents: 0,
        netCents: 0,
      },
    ]),
  );

  const transactionErrors: Record<string, TransactionErrors> = {};
  let activeTransactionCount = 0;
  let validTransactionCount = 0;
  let totalSpentCents = 0;

  for (const transaction of transactions) {
    const result = buildTransactionCalculation(transaction, people);

    if (result.isBlank) {
      continue;
    }

    activeTransactionCount += 1;

    if (Object.keys(result.errors).length > 0) {
      transactionErrors[transaction.id] = result.errors;
      continue;
    }

    validTransactionCount += 1;
    totalSpentCents += result.amountCents;

    const payerTotals = totalsMap.get(transaction.payerId);

    if (payerTotals) {
      payerTotals.totalPaidCents += result.amountCents;
    }

    for (const allocation of result.allocations) {
      const personTotals = totalsMap.get(allocation.personId);

      if (personTotals) {
        personTotals.totalOwedCents += allocation.amountCents;
      }
    }
  }

  const totals = people.map((person) => {
    const row = totalsMap.get(person.id);

    if (!row) {
      return {
        personId: person.id,
        name: person.name,
        totalPaidCents: 0,
        totalOwedCents: 0,
        netCents: 0,
      };
    }

    return {
      ...row,
      netCents: row.totalPaidCents - row.totalOwedCents,
    };
  });

  const settlements =
    activeTransactionCount > 0 && validTransactionCount === activeTransactionCount
      ? minimizeSettlements(totals)
      : [];

  return {
    activeTransactionCount,
    validTransactionCount,
    transactionErrors,
    totals,
    settlements,
    totalSpentCents,
  };
}

export function countPersonUsage(personId: string, transactions: TransactionDraft[]) {
  return transactions.reduce((total, transaction) => {
    const payerMatch = transaction.payerId === personId ? 1 : 0;
    const participantMatch = transaction.participantIds.includes(personId) ? 1 : 0;
    const customMatch = personId in transaction.customShares ? 1 : 0;
    const ratioMatch = personId in transaction.ratioShares ? 1 : 0;

    return total + Math.max(payerMatch, participantMatch, customMatch, ratioMatch);
  }, 0);
}

export function isTransactionBlank(transaction: TransactionDraft) {
  const hasTitle = transaction.title.trim().length > 0;
  const hasAmount = transaction.amount.trim().length > 0;
  const hasCustomInput = Object.values(transaction.customShares).some((value) => value.trim());
  const hasRatioInput = Object.values(transaction.ratioShares).some((value) => value.trim());

  return !hasTitle && !hasAmount && !hasCustomInput && !hasRatioInput;
}

function allocateCustom(
  transaction: TransactionDraft,
  participantIds: string[],
  totalCents: number,
) {
  const allocations: Allocation[] = [];
  let allocatedCents = 0;

  for (const participantId of participantIds) {
    const shareCents = parseCurrencyToCents(transaction.customShares[participantId] ?? '');

    if (shareCents === null || shareCents < 0) {
      return {
        error: 'Enter an exact amount for every included participant.',
      };
    }

    allocations.push({
      personId: participantId,
      amountCents: shareCents,
    });

    allocatedCents += shareCents;
  }

  if (allocatedCents !== totalCents) {
    return {
      error: `Custom amounts must add up to ${formatCurrencyFromCents(totalCents)}.`,
    };
  }

  return { allocations };
}

function allocateByRatio(
  transaction: TransactionDraft,
  participantIds: string[],
  totalCents: number,
) {
  const ratioInputs: Array<{ personId: string; weight: number }> = [];

  for (const participantId of participantIds) {
    const rawValue = transaction.ratioShares[participantId] ?? '';
    const normalized = rawValue.trim();

    if (!normalized || !/^\d+(\.\d{1,2})?$/.test(normalized)) {
      return {
        error:
          'Enter a positive weight or percentage for every included participant (up to 2 decimals).',
      };
    }

    const weight = Number(normalized);

    if (!Number.isFinite(weight) || weight <= 0) {
      return {
        error: 'Ratio values must be greater than 0.',
      };
    }

    ratioInputs.push({ personId: participantId, weight });
  }

  return {
    allocations: allocateProportionally(totalCents, ratioInputs),
  };
}

function allocateEvenly(participantIds: string[], totalCents: number) {
  if (participantIds.length === 0) {
    return [];
  }

  const baseShare = Math.floor(totalCents / participantIds.length);
  let remainder = totalCents - baseShare * participantIds.length;

  return participantIds.map((personId) => {
    const extraCent = remainder > 0 ? 1 : 0;
    remainder = Math.max(0, remainder - 1);

    return {
      personId,
      amountCents: baseShare + extraCent,
    };
  });
}

function allocateProportionally(
  totalCents: number,
  values: Array<{ personId: string; weight: number }>,
) {
  const totalWeight = values.reduce((sum, value) => sum + value.weight, 0);

  if (totalWeight <= 0) {
    return values.map((value) => ({
      personId: value.personId,
      amountCents: 0,
    }));
  }

  const exactValues = values.map((value, index) => {
    const exactShare = (totalCents * value.weight) / totalWeight;
    const flooredShare = Math.floor(exactShare);

    return {
      personId: value.personId,
      flooredShare,
      remainder: exactShare - flooredShare,
      index,
    };
  });

  let centsLeft =
    totalCents - exactValues.reduce((sum, value) => sum + value.flooredShare, 0);

  const sortedByRemainder = [...exactValues].sort((a, b) => {
    if (b.remainder !== a.remainder) {
      return b.remainder - a.remainder;
    }

    return a.index - b.index;
  });

  const extraByPersonId = new Map<string, number>();

  for (const item of sortedByRemainder) {
    extraByPersonId.set(item.personId, 0);
  }

  for (let index = 0; index < sortedByRemainder.length && centsLeft > 0; index += 1) {
    const item = sortedByRemainder[index];
    extraByPersonId.set(item.personId, (extraByPersonId.get(item.personId) ?? 0) + 1);
    centsLeft -= 1;
  }

  return exactValues.map((value) => ({
    personId: value.personId,
    amountCents: value.flooredShare + (extraByPersonId.get(value.personId) ?? 0),
  }));
}

function minimizeSettlements(totals: PersonTotals[]) {
  const creditors = totals
    .filter((row) => row.netCents > 0)
    .map((row) => ({ ...row }))
    .sort((a, b) => b.netCents - a.netCents);
  const debtors = totals
    .filter((row) => row.netCents < 0)
    .map((row) => ({ ...row, remainingDebtCents: Math.abs(row.netCents) }))
    .sort((a, b) => b.remainingDebtCents - a.remainingDebtCents);

  const settlements: Settlement[] = [];
  let creditorIndex = 0;
  let debtorIndex = 0;

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];
    const transferAmount = Math.min(creditor.netCents, debtor.remainingDebtCents);

    if (transferAmount > 0) {
      settlements.push({
        fromPersonId: debtor.personId,
        fromName: debtor.name,
        toPersonId: creditor.personId,
        toName: creditor.name,
        amountCents: transferAmount,
      });
    }

    creditor.netCents -= transferAmount;
    debtor.remainingDebtCents -= transferAmount;

    if (creditor.netCents === 0) {
      creditorIndex += 1;
    }

    if (debtor.remainingDebtCents === 0) {
      debtorIndex += 1;
    }
  }

  return settlements;
}
