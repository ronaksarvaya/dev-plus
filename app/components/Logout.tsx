'use client';

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react'

const Logout = () => {


  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/auth/signin");
        },
      },
    });
  };


  return (
    <div>
        <button onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default Logout
