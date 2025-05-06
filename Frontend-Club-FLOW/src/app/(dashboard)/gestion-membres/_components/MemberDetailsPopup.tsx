/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Member } from "@/types/Member";
import { AtSign, Cake, Link, MapPin, Phone, X } from "lucide-react";

interface MemberDetailsPopupProps {
  member: Member;
  onClose: () => void;
}

const MemberDetailsPopup: React.FC<MemberDetailsPopupProps> = ({
  member,
  onClose,
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
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold mt-2 text-center mb-4">
          Détails du membre
        </h2>
        <div className="text-center mb-4">
          <img
            src={member.image}
            alt={member.firstName}
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h2 className="text-lg font-semibold mt-2">
            {member.firstName} {member.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {member.role} - Pôle {member.club}
          </p>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex flex-row gap-2 items-center">
            <AtSign size={18} />
            {member.email}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Phone size={18} />
            {member.phoneNumber}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <MapPin size={18} />
            {member.address}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Cake size={18} />
            {member.birthDate}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Link size={18} />
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {member.link}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPopup;
