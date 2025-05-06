import React from "react";
import AddEventForm from "./_components/AddEventForm";
export const metadata = {
  title: "Club FLOW | Gestion des Évènements",
  description:
    "Ajoutez de nouveaux évènements et planifiez des activités ",
};

export default function EventPage() {
  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Gestion des Évènements
        </h1>
        <p className="text-grey">
          Ajoutez de nouveaux évènements et planifiez des activités 
        </p>
      </div>
      <div className="w-full">
        <AddEventForm />
      </div>
    </main>
  );
}
