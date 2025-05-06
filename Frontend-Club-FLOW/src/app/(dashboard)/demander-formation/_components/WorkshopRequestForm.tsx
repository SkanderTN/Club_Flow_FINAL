"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth"; // ✅ Assurez-vous que ce hook retourne bien { token, userId }

const WorkshopRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    reason: ""
  });

  const { token, userId } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !userId) {
      toast.error("Vous devez être connecté pour soumettre une demande.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/workshop-requests/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Erreur lors de la soumission");
      }

      toast.success("✅ Demande de formation envoyée !");
      setFormData({ title: "", reason: "" });
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Nom de la formation
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="reason">
          Raison
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Soumettre
      </button>
    </form>
  );
};

export default WorkshopRequestForm;
