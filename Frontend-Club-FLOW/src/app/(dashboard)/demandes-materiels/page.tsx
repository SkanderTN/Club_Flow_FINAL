"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import MaterielRequestList from "./_components/MaterielRequestList";

export default function DemandesMaterielsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="p-6">
      <MaterielRequestList />
    </div>
  );
}
