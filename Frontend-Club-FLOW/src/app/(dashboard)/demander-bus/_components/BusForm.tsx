'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const BusForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    numberOfPassengers: '',
    purpose: '',
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { token, userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!token || !userId) {
    alert("Vous devez être connecté");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/bus-requests/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        numberOfPassengers: Number(formData.numberOfPassengers)
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Erreur lors de la demande");
    }

    alert("✅ Demande de bus envoyée !");
    setFormData({
      destination: '',
      departureDate: '',
      returnDate: '',
      numberOfPassengers: '',
      purpose: '',
      additionalNotes: ''
    });
  } catch (error: any) {
    console.error(error);
    alert(`❌ ${error.message}`);
  }
};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Demande de Bus</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date de départ
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date de retour
            </label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de passagers
          </label>
          <input
            type="number"
            id="numberOfPassengers"
            name="numberOfPassengers"
            value={formData.numberOfPassengers}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
            Motif du déplacement
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes supplémentaires
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Soumettre la demande
        </button>
      </form>
    </div>
  );
};