"use client";

import React from "react";
import InfoUserSection from "../../components/profile/InfoUserSection";
import HistorySection from "../../components/profile/HistorySection";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const PerfilUsuario = () => {
  const { user } = useUserStore();
  const router = useRouter();

  if(!user){
    router.push("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 pt-24 gap-4">
      <InfoUserSection />

      <HistorySection />
    </main>
  );
};

export default PerfilUsuario;
