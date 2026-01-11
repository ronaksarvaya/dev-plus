import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen w-full bg-brand-dark flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-orange/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-light/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {children}
      </div>
    </div>
  );
}