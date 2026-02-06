'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AccountDeletionPage() {
  const styles = {
    accountDeletionPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '"Inter", sans-serif',
    },
    container: {
      background: 'white',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
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
      color: '#1f2937',
      marginBottom: '1.5rem',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      color: '#6b7280',
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
      background: '#6366f1',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginRight: '1rem',
      flexShrink: 0,
      marginTop: '2px',
    },
    instructionText: {
      color: '#374151',
      flex: 1,
    },
    strongText: {
      fontWeight: 600,
      color: '#1f2937',
    },
    warningBox: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
      textAlign: 'left' as const,
    },
    warningTitle: {
      fontWeight: 600,
      color: '#dc2626',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    warningText: {
      color: '#7f1d1d',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    backButton: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
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