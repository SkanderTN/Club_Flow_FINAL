"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Member } from "@/types/Member";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  user: Member;
  onUpdate: (updated: Member) => void;
}

export default function EditProfileForm({ user, onUpdate }: Props) {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    birthDate: user.birthDate,
    image: user.image,
    club: user.club,
    role: user.role,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      const updated = await res.json();
      toast.success("✅ Profil mis à jour !");
      onUpdate(updated); // Update parent component
    } catch (err) {
      console.error(err);
      toast.error("❌ Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="firstName">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="lastName">
          Nom
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
          Téléphone
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="address">
          Adresse
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="birthDate">
          Date de naissance
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="club">
          Club
        </label>
        <select
          id="club"
          name="club"
          value={formData.club}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="CME">CME</option>
          <option value="IEEE">IEEE</option>
          <option value="Mlekart">Mlekart</option>
          <option value="Microsoft">Microsoft</option>
          <option value="CPC">CPC</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="role">
          Rôle
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="Président">Président</option>
          <option value="Vice-Président">Vice-Président</option>
          <option value="Secrétaire Général">Secrétaire Général</option>
          <option value="Trésorier">Trésorier</option>
        </select>
      </div>

      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
