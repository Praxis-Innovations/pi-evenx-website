import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function AccountDeletionPage() {
  const steps = [
    { text: 'Log in to', bold: 'the EvenX app', suffix: ' on your mobile device.' },
    { text: 'Navigate to the', bold: 'Settings', suffix: ' tab in the app.' },
    { text: 'Find and tap the', bold: 'Delete Account', suffix: ' option.' },
    { text: 'Confirm your decision when prompted to complete the account deletion process.', bold: '', suffix: '' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-violet-600 to-primary-500 p-5">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-[600px] w-full text-center">
        <div className="flex justify-center mb-6">
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          Delete Your Account
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          If you wish to delete your EvenX account, please follow these simple steps:
        </p>

        <ol className="text-left mb-8 space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 text-white text-sm font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-600 leading-relaxed">
                {step.text}{' '}
                {step.bold && <span className="font-semibold text-slate-900">{step.bold}</span>}
                {step.suffix}
              </span>
            </li>
          ))}
        </ol>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8 text-left">
          <div className="font-semibold text-red-600 mb-2 flex items-center gap-2">
            <Icon name="warning" size={18} />
            Important Notice
          </div>
          <p className="text-red-800 text-sm leading-relaxed">
            Account deletion is permanent and cannot be undone. All your expenses,
            groups, and associated data will be permanently removed from our system.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white font-semibold shadow-primary-sm hover:shadow-primary-md hover:-translate-y-0.5 transition-all"
          >
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
