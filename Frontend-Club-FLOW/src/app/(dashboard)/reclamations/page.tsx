// src/app/reclamations/page.tsx
import { Metadata } from "next";
import { ReclamationList } from "./_components/ReclamationsList";

export const metadata: Metadata = {
  title: "Réclamations",
  description: "Liste des réclamations soumises par les clubs.",
};

export default function ReclamationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">
            📋 Liste des Réclamations
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Consultez ci-dessous les réclamations envoyées par les clubs.
          </p>
        </div>

        <ReclamationList />
      </div>
    </div>
  );
}
