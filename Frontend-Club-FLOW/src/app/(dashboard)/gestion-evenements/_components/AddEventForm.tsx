"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth"; // ✅ Assurez-vous qu'il donne bien { token, userId }

const AddEventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Réunion",
    club: "",
    date: "",
    time: "",
    location: "",
  });

  const { token, userId } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !userId) {
      toast.error("❌ Vous devez être connecté.");
      return;
    }

    if (["Réunion", "Formation", "Workshop"].includes(formData.type) && !formData.club) {
      toast.error("❌ Veuillez sélectionner un club.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      club: formData.club.trim(),
      date: formData.date,
      time: formData.time,
      location: formData.location.trim(),
    };

    console.log("📤 Payload envoyé:", payload);

    try {
      const response = await fetch(`http://localhost:8080/api/events/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur lors de l'envoi");
      }

      toast.success("✅ Évènement créé !");
      setFormData({
        title: "",
        description: "",
        type: "Réunion",
        club: "",
        date: "",
        time: "",
        location: "",
      });
    } catch (error: any) {
      console.error("Erreur API:", error);
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">Titre</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Titre de l'évènement"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="Réunion">Réunion</option>
          <option value="Formation">Formation</option>
          <option value="Workshop">Workshop</option>
          <option value="Assemblée Générale">Assemblée Générale</option>
          <option value="Réunion Générale">Réunion Générale</option>
          <option value="Team Building">Team Building</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {["Réunion", "Formation", "Workshop"].includes(formData.type) && (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="club">Club</label>
          <select
            id="club"
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Sélectionnez un club</option>
            <option value="IEEE">IEEE</option>
            <option value="MELKART">MELKART</option>
            <option value="CME">CME</option>
            <option value="MICROSOFT">MICROSOFT</option>
            <option value="CPC">CPC</option>
          </select>
        </div>
      )}

      <div className="flex gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium mb-1" htmlFor="time">Heure</label>
          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="location">Lieu</label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AddEventForm;
