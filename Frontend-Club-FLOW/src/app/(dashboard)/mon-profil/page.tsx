"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "./_components/ProfileCard";
import EditProfileForm from "./_components/EditProfileForm";
import { Member } from "@/types/Member";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { token, userId } = useAuth();
  const [user, setUser] = useState<Member | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) return;

      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          _id: data.id.toString(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          image: data.image || "/avatars/default.png",
          club: data.club,
          role: data.role,
          birthDate: data.birthDate,
          address: data.address,
          link: data.link || "",
        });
      }
    };

    fetchUser();
  }, [token, userId]);

  if (!user) return <p className="p-8">Chargement du profil...</p>;

  return (
    <main className="flex flex-col justify-start items-start sm:p-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">Mon profil</h1>
        <p className="text-grey">
          Bienvenue sur votre profil, vous pouvez mettre à jour vos informations personnelles ici.
        </p>
      </div>

      <ProfileCard user={user} />

      <div className="w-full space-y-4">
        <h1 className="text-2xl font-bold text-primary">Modifier Mes Informations</h1>
        <EditProfileForm user={user} onUpdate={setUser} />
      </div>
    </main>
  );
};

export default ProfilePage;
