import React from "react";
import { guides } from "@/dump";
import GuideCard from "./_components/GuideCard";
export const metadata = {
  title: "ClubFLOW | Guides et Supports",
  description:
    "Accédez aux ressources éducatives et guides postés par les responsables.",
};

export default function page() {
  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Guides et Supports</h1>
        <p className="text-grey">
          Accédez aux ressources éducatives et guides postés par les
          responsables.
        </p>
      </div>

      {/* Liste des guides */}
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <GuideCard key={index} guide={guide} />
        ))}
      </div>
    </main>
  );
}
