"use client";

import { useEffect, useState } from "react";
import { RoomReservationCard, DemandeSalle } from "./_components/RoomReservationCard";
import { useAuth } from "@/hooks/useAuth"; // adjust path if needed

export default function DemandesSallesPage() {
  const { token, userId, isAdmin } = useAuth();
  const [reservations, setReservations] = useState<DemandeSalle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const url = isAdmin
          ? `http://localhost:8080/api/room-requests`
          : `http://localhost:8080/api/room-requests/user/${userId}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const mapped: DemandeSalle[] = data.map((r: any) => ({
          id: r.id,
          demandeur: r.user?.username ?? "Utilisateur",
          salle: r.roomNumber,
          batiment: r.building,
          date: r.date,
          heure: r.startTime,
          duree: r.duration,
          objectif: r.purpose,
          statut: translateStatus(r.status),
          motifRejet: r.rejectionReason,
        }));

        setReservations(mapped);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchReservations();
    }
  }, [token, isAdmin, userId]);

  const translateStatus = (status: string): DemandeSalle["statut"] => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "APPROVED":
        return "Confirmée";
      case "REJECTED":
        return "Rejetée";
      default:
        return "En attente";
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-primary">📋 Vos réservations de salles</h1>
          <p className="text-gray-600 mt-1">
            Retrouvez ici toutes vos demandes de réservation de salle.
          </p>
        </header>

        <RoomReservationCard demandes={reservations} isAdmin={isAdmin} token={token!} />
      </div>
    </div>
  );
}
