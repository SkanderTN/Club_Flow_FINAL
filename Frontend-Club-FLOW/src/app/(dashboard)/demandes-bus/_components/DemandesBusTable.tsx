'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  CheckCircle2, XCircle, Clock, Mail, User, MapPin, CalendarDays, Users, Info
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BusRequest {
  id: number;
  destination: string;
  departureDate: string;
  returnDate: string;
  numberOfPassengers: number;
  purpose: string;
  additionalNotes: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export function DemandesBusTable() {
  const { token, userId, isAdmin } = useAuth();
  const [demandesList, setDemandesList] = useState<BusRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('TOUS');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = isAdmin
        ? 'http://localhost:8080/api/bus-requests'
        : `http://localhost:8080/api/bus-requests/user/${userId}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setDemandesList(data);
    } catch (err: any) {
      console.error(err);
      toast.error("❌ Erreur lors du chargement des demandes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin]);

  const handleStatusChange = async (id: number, newStatus: 'APPROVED' | 'REJECTED') => {
    const rejectionReason = newStatus === 'REJECTED'
      ? prompt("Motif du rejet :")
      : null;

    try {
      const res = await fetch(`http://localhost:8080/api/bus-requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, rejectionReason })
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      setDemandesList(prev =>
        prev.map((d) =>
          d.id === id ? { ...d, status: newStatus, rejectionReason: rejectionReason ?? undefined } : d
        )
      );

      toast.success("✅ Statut mis à jour !");
    } catch (err) {
      console.error(err);
      toast.error("❌ Échec de la mise à jour");
    }
  };

  const filteredDemandes = selectedStatus === 'TOUS'
    ? demandesList
    : demandesList.filter(d => d.status === selectedStatus);

  const statusOptions = ['TOUS', 'PENDING', 'APPROVED', 'REJECTED'];

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              selectedStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'PENDING' && <Clock className="mr-2 h-4 w-4" />}
            {status === 'APPROVED' && <CheckCircle2 className="mr-2 h-4 w-4" />}
            {status === 'REJECTED' && <XCircle className="mr-2 h-4 w-4" />}
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Demandeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDemandes.map((demande) => (
                <tr key={demande.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {demande.user?.firstName} {demande.user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1" /> {demande.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      {demande.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center">
                        <CalendarDays className="h-4 w-4 text-gray-400 mr-2" />
                        Départ: {demande.departureDate}
                      </span>
                      <span className="flex items-center">
                        <CalendarDays className="h-4 w-4 text-gray-400 mr-2" />
                        Retour: {demande.returnDate || '—'}
                      </span>
                      <span className="flex items-center text-sm text-gray-500 mt-1">
                        <Users className="h-4 w-4 mr-1" /> {demande.numberOfPassengers} passagers
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      demande.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : demande.status === 'REJECTED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {demande.status === 'PENDING' && <Clock className="mr-1 h-4 w-4" />}
                      {demande.status === 'APPROVED' && <CheckCircle2 className="mr-1 h-4 w-4" />}
                      {demande.status === 'REJECTED' && <XCircle className="mr-1 h-4 w-4" />}
                      {demande.status}
                    </span>
                    {demande.status === 'REJECTED' && demande.rejectionReason && (
                      <p className="text-xs text-red-500 mt-1 flex items-start">
                        <Info className="h-3 w-3 mr-1 mt-0.5" /> Motif: {demande.rejectionReason}
                      </p>
                    )}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 text-right">
                      {demande.status === 'PENDING' ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleStatusChange(demande.id, 'APPROVED')}
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <CheckCircle2 className="mr-1 h-4 w-4" /> Confirmer
                          </button>
                          <button
                            onClick={() => handleStatusChange(demande.id, 'REJECTED')}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Rejeter
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">Action terminée</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
