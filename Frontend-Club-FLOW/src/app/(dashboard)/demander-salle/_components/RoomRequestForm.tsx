'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  roomNumber: z.string().min(1, "Le numéro de salle est requis"),
  building: z.enum(['Principal', 'Annexe']),
  date: z.string().min(1, "La date est requise"),
  startTime: z.string().min(1, "L'heure de début est requise"),
  duration: z.number().min(30, "Minimum 30 minutes").max(240, "Maximum 4 heures"),
  purpose: z.string().min(10, "Merci de détailler l'objectif (10 caractères minimum)")
});

export function RoomRequestForm() {
  const { token, userId } = useAuth(); // ✅ Use authenticated user context

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: '',
      building: 'Principal',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      duration: 60,
      purpose: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!token || !userId) {
      toast.error("Vous devez être connecté");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/room-requests/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const resBody = await response.json();
        throw new Error(resBody.message || 'Erreur lors de la création de la demande');
      }

      toast.success('✅ Demande de salle envoyée !');
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(`❌ ${error.message || "Erreur lors de l'envoi"}`);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Numéro de salle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de salle *
          </label>
          <input
            type="text"
            {...form.register('roomNumber')}
            placeholder="Ex: B101 ou A202"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {form.formState.errors.roomNumber && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.roomNumber.message}
            </p>
          )}
        </div>

        {/* Bâtiment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bâtiment *
          </label>
          <select
            {...form.register('building')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Principal">Bâtiment Principal</option>
            <option value="Annexe">Bâtiment Annexe</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            {...form.register('date')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {form.formState.errors.date && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.date.message}
            </p>
          )}
        </div>

        {/* Heure de début */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heure de début *
          </label>
          <input
            type="time"
            min="08:00"
            max="19:30"
            {...form.register('startTime')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {form.formState.errors.startTime && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.startTime.message}
            </p>
          )}
        </div>

        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée (minutes) *
          </label>
          <input
            type="number"
            min="30"
            max="240"
            step="15"
            {...form.register('duration', { valueAsNumber: true })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Durée entre 30 et 240 minutes (par pas de 15)
          </p>
          {form.formState.errors.duration && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.duration.message}
            </p>
          )}
        </div>
      </div>

      {/* Objectif */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Objectif de la réservation *
        </label>
        <textarea
          {...form.register('purpose')}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          placeholder="Décrivez l'activité prévue..."
        />
        {form.formState.errors.purpose && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.purpose.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => form.reset()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Soumettre la demande
        </button>
      </div>
    </form>
  );
}
