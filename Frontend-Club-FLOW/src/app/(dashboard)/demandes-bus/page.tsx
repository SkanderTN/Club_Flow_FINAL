import { Bus } from 'lucide-react';
import { DemandesBusTable } from './_components/DemandesBusTable';

export default function DemandesBusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Bus className="h-8 w-8 mr-2 text-blue-600" />
        <h1 className="text-4xl font-bold text-primary">Demandes de Bus</h1>
      </div>
      <div className="bg-white rounded-lg shadow border">
        <DemandesBusTable />
      </div>
    </div>
  );
}
