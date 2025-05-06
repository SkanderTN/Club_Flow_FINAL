import { Bus } from 'lucide-react';
import { BusForm } from './_components/BusForm';

export default function DemanderBusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Bus className="h-8 w-8 mr-2 text-blue-600" />
        <h1 className="text-4xl font-bold text-primary">Demander un Bus</h1>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <p className="mb-6 text-gray-600">
          Veuillez remplir ce formulaire pour faire une demande de bus. Nous traiterons votre demande dans les plus brefs délais.
        </p>
        
        <BusForm />
      </div>
    </div>
  );
}