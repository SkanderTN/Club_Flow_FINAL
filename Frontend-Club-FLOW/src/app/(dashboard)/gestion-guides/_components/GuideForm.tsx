"use client";

import { Guide } from "@/types/Guide";
import React, { useState } from "react";

const AddGuideForm: React.FC = () => {
  const [formData, setFormData] = useState<Guide>({
    _id: Date.now().toString(),
    title: "",
    description: "",
    club: undefined,
    link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Guide Submitted:", formData);

    setFormData({
      _id: Date.now().toString(),
      title: "",
      description: "",
      club: undefined,
      link: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Entrez le titre du guide"
          required
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
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Entrez une description du guide"
          rows={2}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="link">
          Lien Support
        </label>
        <input
          id="link"
          name="link"
          type="text"
          value={formData.link}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Entrez le lien du support"
          required
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AddGuideForm;
