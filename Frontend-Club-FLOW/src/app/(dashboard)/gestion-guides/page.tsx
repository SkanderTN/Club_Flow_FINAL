import React from "react";
import { guides } from "@/dump";
import AddGuideForm from "./_components/GuideForm";
import GuideList from "./_components/GuideList";
export const metadata = {
  title: "Club FLOW | Gestion des Guides",
  description:
    "Consulter et gérer les guides et les supports pour les membres.",
};

export default function page() {
  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Gestion des Guides</h1>
        <p className="text-grey">
          Consulter et gérer les guides et les supports pour les membres.
        </p>
      </div>

      {/* Ajouter des guides */}
      <div className="space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-primary">
          Ajouter un guide
        </h2>
        <AddGuideForm />
      </div>

      {/* Liste des guides */}
      <div className="space-y-4 w-full">
        <h2 className="text-2xl font-semibold text-primary">
          Liste des guides
        </h2>
        <GuideList guides={guides} />
      </div>
    </main>
  );
}
