"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Info,
  CalendarDays,
  MapPin,
  User,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";

export interface DemandeSalle {
  id: number;
  demandeur: string;
  salle: string;
  batiment: string;
  date: string;
  heure: string;
  duree: number;
  objectif: string;
  statut: "En attente" | "Confirmée" | "Rejetée";
  motifRejet?: string;
}

export function RoomReservationCard({
  demandes,
  isAdmin,
  token,
}: {
  demandes: DemandeSalle[];
  isAdmin: boolean;
  token: string;
}) {
  const [demandesList, setDemandesList] = useState(demandes);
  const [selectedStatus, setSelectedStatus] = useState<string>("Tous");

  const handleStatusChange = async (id: number, newStatus: "Confirmée" | "Rejetée") => {
    const statusBackend = newStatus === "Confirmée" ? "APPROVED" : "REJECTED";
    try {
      await fetch(`http://localhost:8080/api/room-requests/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: statusBackend }),
      });

      setDemandesList((prev) =>
        prev.map((demande) =>
          demande.id === id ? { ...demande, statut: newStatus } : demande
        )
      );
    } catch (error) {
      console.error("Erreur mise à jour statut:", error);
    }
  };

  const filteredDemandes =
    selectedStatus === "Tous"
      ? demandesList
      : demandesList.filter((d) => d.statut === selectedStatus);

  const statusOptions = ["Tous", "En attente", "Confirmée", "Rejetée"];

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm transition-all duration-200 ${
              selectedStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {status === "En attente" && <Clock className="mr-2 h-4 w-4" />}
            {status === "Confirmée" && <CheckCircle2 className="mr-2 h-4 w-4" />}
            {status === "Rejetée" && <XCircle className="mr-2 h-4 w-4" />}
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredDemandes.map((demande) => (
          <motion.div
            key={demande.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-gray-400" /> {demande.demandeur}
                </h3>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" /> {demande.salle} ({demande.batiment})
                </p>
                <p className="text-gray-600 flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2 text-gray-400" /> {demande.date} à {demande.heure}
                </p>
                <p className="text-gray-500 flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-gray-400" /> Durée : {demande.duree} min
                </p>
                <p className="text-gray-700 italic">📝 {demande.objectif}</p>

                {demande.statut === "Rejetée" && demande.motifRejet && (
                  <div className="text-red-600 text-sm flex items-start mt-1">
                    <Info className="w-4 h-4 mr-1 mt-0.5" /> Motif: {demande.motifRejet}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-3">
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${
                    demande.statut === "Confirmée"
                      ? "bg-green-100 text-green-800"
                      : demande.statut === "Rejetée"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {demande.statut === "En attente" && <Clock className="mr-1 h-4 w-4" />}
                  {demande.statut === "Confirmée" && <CheckCircle2 className="mr-1 h-4 w-4" />}
                  {demande.statut === "Rejetée" && <XCircle className="mr-1 h-4 w-4" />}
                  {demande.statut}
                </span>

                {isAdmin && demande.statut === "En attente" && (
  <div className="flex space-x-2">
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => handleStatusChange(demande.id, "Confirmée")}
      className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition shadow"
    >
      <CheckCircle2 className="w-4 h-4 inline mr-1" /> Confirmer
    </motion.button>
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => handleStatusChange(demande.id, "Rejetée")}
      className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition shadow"
    >
      <XCircle className="w-4 h-4 inline mr-1" /> Rejeter
    </motion.button>
  </div>
)}

                {demande.statut !== "En attente" && (
                  <span className="text-xs text-gray-400">Action terminée</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}