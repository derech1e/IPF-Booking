// Header.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin")
    }
  });

  return (
    <div>
      Header
    </div>
  )
}

function componentDidMount() {
  throw new Error('Function not implemented.');
}

