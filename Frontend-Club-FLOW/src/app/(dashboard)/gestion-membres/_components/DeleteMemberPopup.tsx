import React, { useEffect } from "react";
import { Member } from "@/types/Member";
import { X } from "lucide-react";

interface DeleteMemberPopupProps {
  member: Member;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteMemberPopup: React.FC<DeleteMemberPopupProps> = ({
  member,
  onClose,
  onDelete,
}) => {
  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">
          Confirmer la suppression
        </h3>
        <p className="mb-6 text-center">
          Êtes-vous sûr de vouloir supprimer{" "}
          <span className="font-bold">
            {member.firstName} {member.lastName}
          </span>
          ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Annuler
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberPopup;
