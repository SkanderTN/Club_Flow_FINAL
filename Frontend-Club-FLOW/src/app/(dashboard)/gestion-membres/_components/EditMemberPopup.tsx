/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Member } from "@/types/Member";
import { X } from "lucide-react";

interface EditMemberPopupProps {
  member: Member;
  onClose: () => void;
  onSave: (updatedMember: Member) => void;
}

const EditMemberPopup: React.FC<EditMemberPopupProps> = ({
  member,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Member>(member);
  const [imagePreview, setImagePreview] = useState<string>(member.image);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
  
    await fetch(`http://localhost:8080/api/users/${formData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  
    onSave(formData);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Modifier les informations du membre
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
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
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
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
            <label htmlFor="email" className="block text-sm font-medium mb-1">
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
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              Numéro de téléphone
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
            <label htmlFor="club" className="block text-sm font-medium mb-1">
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
              <option value="CME">CME</option>
              <option value="IEEE">IEEE</option>
              <option value="Mlekart">Mlekart</option>
              <option value="Microsoft">Microsoft</option>
              <option value="CPC">CPC</option>
            </select>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="Président">Président</option>
              <option value="Vice-Président">Vice-Président</option>
              <option value="Secrétaire Général">Secrétaire Général</option>
              <option value="Trésorier">Trésorier</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium mb-1">
              Date de naissance
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Adresse
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-1">
              Lien
            </label>
            <input
              id="link"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Photo de profil
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Aperçu de la photo"
                className="mt-2 w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex justify-end gap-2 col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberPopup;
