"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface MaterialRequest {
  id: number;
  name: string;
  quantity: number;
  club: string;
  requestedDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  requestedBy?: {
    id: number;
    email?: string;
  };
}

export default function MaterielRequestList() {
  const { token, userId, isAdmin } = useAuth();
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/material-requests/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Échec du chargement");

      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isAdmin
          ? "http://localhost:8080/api/material-requests"
          : `http://localhost:8080/api/material-requests/user/${userId}`;
  
        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error("Échec du chargement");
  
        const data = await res.json();
        setRequests(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
  
    fetchData();
  }, [isAdmin, userId, token]);

  const handleAction = async (id: number, status: "APPROVED" | "REJECTED") => {
    const rejectionReason = status === "REJECTED"
      ? prompt("Raison du refus :")
      : null;

    try {
      const res = await fetch(`http://localhost:8080/api/material-requests/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          rejectionReason
        })
      });

      if (!res.ok) throw new Error("Échec de la mise à jour");

      // Update UI after success
      setRequests(prev =>
        prev.map((req: any) =>
          req.id === id ? { ...req, status, rejectionReason } : req
        )
      );

      alert("✅ Statut mis à jour !");
    } catch (err: any) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary">📋 Demandes de Matériel</h2>

        <div className="space-y-6 mt-6">
          {requests.length === 0 && (
            <p className="text-gray-500">Aucune demande pour l’instant.</p>
          )}

          {requests.map((req: any) => (
            <motion.div
              key={req.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="space-y-1 text-[15px]">
                  <h3 className="text-lg font-semibold text-gray-800">
                    🏷️ {req.name} ({req.quantity}x)
                  </h3>
                  <p className="text-gray-500">
                    🏫 <strong>Club :</strong> {req.club}
                  </p>
                  <p className="text-gray-500">
                    📆 <strong>Date :</strong> {req.requestedDate}
                  </p>
                  <p className="text-gray-600">
                    📝 <strong>Raison :</strong> {req.reason}
                  </p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === "APPROVED"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : req.status === "REJECTED"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  }`}>
                    {req.status === "PENDING"
                      ? "⏳ En attente"
                      : req.status === "APPROVED"
                      ? "✅ Acceptée"
                      : "❌ Refusée"}
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(req.id, "APPROVED")}
                      className="px-4 py-1.5 text-sm bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition shadow"
                    >
                      ✅ Accepter
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(req.id, "REJECTED")}
                      className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition shadow"
                    >
                      ❌ Refuser
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
