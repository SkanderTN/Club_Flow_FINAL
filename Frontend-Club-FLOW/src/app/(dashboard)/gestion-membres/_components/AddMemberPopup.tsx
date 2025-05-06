/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Member } from "@/types/Member";
import { X } from "lucide-react";

interface AddMemberPopupProps {
  onClose: () => void;
  onSave: (newMember: Member) => void;
}

const AddMemberPopup: React.FC<AddMemberPopupProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Member>({
    _id: Date.now().toString(),
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
    club: "CME",
    role: "Président",
    birthDate: "",
    address: "",
    link: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageURL }));
      setImagePreview(imageURL);
    }
    
  };
  const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  const token = localStorage.getItem("token");
  const payload = {
    ...formData,
    password,
    roles: ["user"],
  };

  const res = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const newUser = await res.json();
    onSave({
      ...formData,
      _id: newUser.data.id.toString(),
    });
    onClose();
  } else {
    alert("Erreur lors de l’ajout");
  }
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
          Ajouter un Membre
        </h2>
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
              required
            >
              <option value="Président">Président</option>
              <option value="Vice-Président">Vice-Président</option>
              <option value="Secrétaire Général">Secrétaire Général</option>
              <option value="Trésorier">Trésorier</option>
            </select>
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
              required
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
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="link">
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
            <label className="block text-sm font-medium mb-1" htmlFor="image">
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
              src={imagePreview || "/avatars/default.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover mt-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/avatars/default.png";
              }}
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
            <div>
  <label className="block text-sm font-medium mb-1" htmlFor="password">
    Mot de passe
  </label>
  <input
    id="password"
    name="password"
    type="password"
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded p-2"
    required
  />
</div>
<div>
  <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
    Confirmer le mot de passe
  </label>
  <input
    id="confirmPassword"
    name="confirmPassword"
    type="password"
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border rounded p-2"
    required
  />
</div>

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

export default AddMemberPopup;
