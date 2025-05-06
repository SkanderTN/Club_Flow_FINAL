// src/app/demander-salle/page.tsx
import { Metadata } from 'next';
import { RoomRequestForm } from './_components/RoomRequestForm';

export const metadata: Metadata = {
  title: "ClubFLOW | Demander une salle",
  description: "Formulaire de réservation de salle pour les activités des clubs",
};

export default function DemanderSallePage() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary">Demander une salle</h1>
        <p className="text-gray-600 mt-2">
          Réservez une salle du bâtiment principal ou annexe pour vos activités.
        </p>
      </header>

      <section className="bg-white rounded-lg shadow-md p-6">
        <RoomRequestForm />
      </section>
    </main>
  );
}
