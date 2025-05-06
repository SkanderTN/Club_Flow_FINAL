"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MemberTable from "./MemberTable";

export default function ClientPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("roles")?.includes("ROLE_ADMIN");
    if (!isAdmin) router.push("/");
  }, []);

  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Gestion des Membres</h1>
        <p className="text-grey">
          Gérez les informations des membres, modifiez leurs profils ou supprimez des comptes.
        </p>
      </div>
      <MemberTable />
    </main>
  );
}
