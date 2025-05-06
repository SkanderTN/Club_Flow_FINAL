import React from "react";
import WorkshopRequestTable from "./_components/WorkshopRequestTable";
export const metadata = {
  title: "ClubFLOW | Demandes des Formations",
  description: "Consultez les demandes de formations soumises par les membres.",
};

export default function page() {
  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Demandes des Formations
        </h1>
        <p className="text-grey">
          Consultez les demandes de formations soumises par les membres.
        </p>
      </div>

      <WorkshopRequestTable />
    </main>
  );
}
