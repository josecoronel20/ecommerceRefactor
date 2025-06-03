'use client';

import React, { useEffect } from 'react';
import InfoUserSection from './components/InfoUserSection';
import HistorySection from './components/HistorySection';
import useUserInfo from '@/hooks/useUserInfo';
import { logout } from '@/lib/api/auth';

const UserProfile = () => {
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo) {
      logout();
    }
  }, [userInfo]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 pt-24 gap-4">
      <InfoUserSection />

      <HistorySection />
    </main>
  );
};

export default UserProfile;
