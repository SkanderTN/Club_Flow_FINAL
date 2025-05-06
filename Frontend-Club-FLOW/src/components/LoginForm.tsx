"use client";
import React, { useState } from "react";
import CustomLoginInput from "./CustomLoginInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
  
      if (!response.ok) {
        throw new Error("Échec de connexion");
      }
  
      const data = await response.json();
  
      // 🧠 Store the token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("roles", JSON.stringify(data.roles)); // <- ✅ this line

  
      toast.success("Connexion réussie");
  
      router.push("/mon-profil");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erreur de connexion");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full bg-white flex-col items-center justify-center px-4 md:px-8 lg:px-24 gap-8 text-center"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex sm:hidden"
        >
          <Image
            src="/logos/main.png"
            width={200}
            height={200}
            alt="logo"
            priority
          />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00008B] to-[#000023] bg-clip-text text-transparent">
          Bienvenue dans votre espace Club Flow
        </h1>
        
        <p className="text-grey max-w-md">
          Connectez-vous pour accéder à votre espace personnel et profiter de toutes nos fonctionnalités.
        </p>
      </div>

      <div className="w-full max-w-[480px] flex flex-col gap-6">
        <CustomLoginInput
          icon="mail"
          placeholder="Entrer votre addresse email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <CustomLoginInput
          icon="password"
          placeholder="Entrer votre mot de passe"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <button 
            className="text-primary text-sm hover:underline hover:text-[#000023] transition-colors"
            onClick={() => router.push("/mot-de-passe-oublie")}
          >
            Mot de passe oublié ?
          </button>
        </div>

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="relative overflow-hidden group px-8 py-4 rounded-xl cursor-pointer select-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00008B] to-[#000023] group-hover:from-[#00005e] group-hover:to-[#000018] transition-all duration-300" />
          
          <span className="relative z-10 text-white font-semibold text-xl flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </span>
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-grey">
          <span>Pas encore membre ?</span>
          <button 
            className="text-primary font-medium hover:underline hover:text-[#000023] transition-colors"
            onClick={() => router.push("/inscription")}
          >
            Créer un compte
          </button>
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 bg-red-50 py-2 px-4 rounded-lg"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}