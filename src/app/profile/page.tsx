'use client';

import React from 'react';
import InfoUserSection from './components/InfoUserSection';
import HistorySection from './components/HistorySection';

const UserProfile = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 pt-24 gap-4">
      <InfoUserSection />

      <HistorySection />
    </main>
  );
};

export default UserProfile;
