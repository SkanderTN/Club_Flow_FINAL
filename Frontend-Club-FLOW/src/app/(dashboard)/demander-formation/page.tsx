import React from "react";
import WorkshopRequestForm from "./_components/WorkshopRequestForm";
export const metadata = {
  title: "ClubFLOW | Demander une Formation",
  description:
    "Remplissez le formulaire pour demander une formation à l'équipe.",
};

export default function page() {
  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Demander une Formation
        </h1>
        <p className="text-grey">
          Remplissez le formulaire pour demander une formation à l'équipe.
        </p>
      </div>

      <WorkshopRequestForm />
    </main>
  );
}
