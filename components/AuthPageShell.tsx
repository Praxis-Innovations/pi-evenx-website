import React from 'react';
import Image from 'next/image';

interface AuthPageShellProps {
  children: React.ReactNode;
}

export default function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary-600 via-violet-600 to-primary-500">
      <div className="bg-white p-10 md:p-12 rounded-2xl shadow-2xl max-w-[500px] w-full">
        <div className="flex justify-center mb-4">
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        {children}
      </div>
    </div>
  );
}
