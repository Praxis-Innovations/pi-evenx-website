'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colors, gradients, shadows, radius } from '@/lib/theme';

export default function AccountDeletionPage() {
  const styles = {
    accountDeletionPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradients.hero_bg,
      padding: '20px',
    },
    container: {
      background: colors.white,
      padding: '3rem',
      borderRadius: radius.xl,
      boxShadow: shadows.xl,
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center' as const,
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: colors.neutral[900],
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      color: colors.neutral[500],
      marginBottom: '2rem',
      lineHeight: 1.6,
      fontSize: '1rem',
    },
    instructionsList: {
      textAlign: 'left' as const,
      marginBottom: '2rem',
      padding: '0',
      listStyle: 'none' as const,
    },
    instructionItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '1.25rem',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    stepNumber: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: gradients.primary,
      color: colors.white,
      fontSize: '0.875rem',
      fontWeight: '600',
      marginRight: '1rem',
      flexShrink: 0,
      marginTop: '2px',
    },
    instructionText: {
      color: colors.neutral[600],
      flex: 1,
    },
    strongText: {
      fontWeight: 600,
      color: colors.neutral[900],
    },
    warningBox: {
      background: colors.error[50],
      border: `1px solid ${colors.error[200]}`,
      borderRadius: radius.md,
      padding: '1.5rem',
      marginBottom: '2rem',
      textAlign: 'left' as const,
    },
    warningTitle: {
      fontWeight: 600,
      color: colors.error[600],
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    warningText: {
      color: colors.error[800],
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    backButton: {
      background: gradients.primary,
      color: colors.white,
      border: 'none',
      padding: '12px 24px',
      borderRadius: radius.md,
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },
  };

  return (
    <div style={styles.accountDeletionPage}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        
        <h1 style={styles.title}>Delete Your Account</h1>
        <p style={styles.subtitle}>
          If you wish to delete your EvenX account, please follow these simple steps:
        </p>

        <ol style={styles.instructionsList}>
          <li style={styles.instructionItem}>
            <span style={styles.stepNumber}>1</span>
            <span style={styles.instructionText}>
              Log in to <span style={styles.strongText}>the EvenX app</span> on your mobile device.
            </span>
          </li>
          <li style={styles.instructionItem}>
            <span style={styles.stepNumber}>2</span>
            <span style={styles.instructionText}>
              Navigate to the <span style={styles.strongText}>Settings</span> tab in the app.
            </span>
          </li>
          <li style={styles.instructionItem}>
            <span style={styles.stepNumber}>3</span>
            <span style={styles.instructionText}>
              Find and tap the <span style={styles.strongText}>Delete Account</span> option.
            </span>
          </li>
          <li style={styles.instructionItem}>
            <span style={styles.stepNumber}>4</span>
            <span style={styles.instructionText}>
              Confirm your decision when prompted to complete the account deletion process.
            </span>
          </li>
        </ol>

        <div style={styles.warningBox}>
          <div style={styles.warningTitle}>
            <i className="fas fa-exclamation-triangle"></i>
            Important Notice
          </div>
          <p style={styles.warningText}>
            Account deletion is permanent and cannot be undone. All your expenses, groups, and associated data will be permanently removed from our system.
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <Link href="/" style={styles.backButton}>Back to Website</Link>
        </div>
      </div>
    </div>
  );
}