"use client";

import React, { useEffect, useState } from "react";
import EventCard from "./_components/EventCard";
import { Event } from "@/types/Event";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth"; // ✅ Assurez-vous que ce chemin est correct

export default function PlanningPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // ✅ récupération du token

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erreur de récupération des évènements");

        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        console.error(err);
        toast.error("❌ Impossible de charger les évènements");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEvents();
    } else {
      setLoading(false);
      toast.error("❌ Vous devez être connecté pour voir les évènements.");
    }
  }, [token]);

  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Planning</h1>
        <p className="text-grey">
          Consultez les évènements à venir et les détails des activités planifiées.
        </p>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-gray-500">Chargement des évènements...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">Aucun évènement trouvé.</p>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </main>
  );
}
