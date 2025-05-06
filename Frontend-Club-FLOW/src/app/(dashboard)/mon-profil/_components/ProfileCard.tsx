/* eslint-disable @next/next/no-img-element */
import { Member } from "@/types/Member";
import { AtSign, Cake, Link as LinkIcon, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProfileCard({ user }: { user: Member }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:p-8 rounded-3xl border-primary sm:border">
      <img
        src={user.image}
        alt="User Avatar"
        className="size-48 rounded-full"
      />
      <div className="space-y-2">
        <h2 className="font-bold text-primary text-2xl">
          {user.firstName} {user.lastName}
        </h2>
        <span className="text-grey text-sm">
          {user.role} - Club {user.club}
        </span>
        <div className="flex flex-row gap-2 justify-start items-center">
          <AtSign size={18} className="text-primary" />
          {user.email}
        </div>
        <div className="flex flex-row gap-2 justify-start items-center">
          <Phone size={18} className="text-primary" />
          {user.phoneNumber}
        </div>
        <div className="flex flex-row gap-2 justify-start items-center">
          <MapPin size={18} className="text-primary" />
          {user.address}
        </div>
        <div className="flex flex-row gap-2 justify-start items-center">
          <Cake size={18} className="text-primary" />
          {user.birthDate}
        </div>
        <div className="flex flex-row gap-2 justify-start items-center">
          <LinkIcon size={18} className="text-primary" />
          {user.link ? (
  <Link
    href={user.link}
    className="hover:text-primary transition duration-300"
    target="_blank"
  >
    Consulter Fiche Membre
  </Link>
) : (
  <span className="text-gray-400 italic">Aucun lien</span>
)}
        </div>
      </div>
    </div>
  );
}
