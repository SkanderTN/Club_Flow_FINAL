"use client";

import { useEffect, useState } from "react";
import { Inbox, CalendarDays, Info, UserCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

export interface Reclamation {
  id: number;
  club: string;
  objet: string;
  message: string;
  date: string;
}

export function ReclamationList() {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [filter, setFilter] = useState<string>("Tous");
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8080/api/complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erreur de récupération des réclamations");

        const data = await res.json();

        const formatted = data.map((c: any) => ({
          id: c.id,
          club: c.club,
          objet: c.subject,
          message: c.message,
          date: c.date,
        }));

        setReclamations(formatted);
      } catch (err: any) {
        toast.error(err.message || "Erreur inattendue");
      }
    };

    fetchData();
  }, [token]);

  const filteredReclamations =
    filter === "Tous"
      ? reclamations
      : reclamations.filter((rec) =>
          rec.objet.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {["Tous", "Salle", "Matériel", "Bus", "Autre"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200 flex items-center gap-2
              ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            <Inbox className="w-4 h-4" /> {type}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredReclamations.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            Aucune réclamation ne correspond au filtre.
          </div>
        ) : (
          filteredReclamations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <UserCircle2 className="w-5 h-5 text-blue-600" /> {rec.club}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    <Info className="w-4 h-4 text-gray-500" /> {rec.objet}
                  </p>
                  <p className="text-gray-700 mt-2 italic">{rec.message}</p>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" /> {rec.date}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
