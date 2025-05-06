// src/app/reclamer/page.tsx
import { Metadata } from "next";
import { ReclamationForm } from "./_components/ReclamationForm";

export const metadata: Metadata = {
  title: "Réclamer",
  description: "Soumettre une réclamation concernant les services ou équipements.",
};

export default function ReclamerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10 md:px-6 lg:py-16">
      <section className="max-w-3xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary">
              📨 Soumettre une Réclamation
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Remplissez le formulaire ci-dessous pour signaler un problème ou soumettre une plainte.
            </p>
          </header>

          <ReclamationForm />
        </div>
      </section>
    </main>
  );
}
