"use client";

import { pageRoutes } from "@/lib/constants";
import { LogOut, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const { isAdmin } = useAuth();

  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    router.push("/");
  };

  const sidebarVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden sm:flex flex-col justify-start items-center bg-gradient-to-b from-[#00008B] to-[#000023] h-screen overflow-y-auto w-80 px-5 py-8 gap-6 shadow-xl"
      >
        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image src="/logos/light.png" width={128} height={128} alt="logo" />
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col items-start w-full gap-2">
        {pageRoutes
  .filter((page) => {
    if (isAdmin && page.route.startsWith("/demander")) return false;
    if (!isAdmin && page.route === "/gestion-membres") return false;
    return true;
  })
  .map((page, index) => (

            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Link
                href={page.route}
                className={`${
                  pathname === page.route
                    ? "bg-primary text-white shadow-md"
                    : "text-white hover:bg-white/10"
                } group rounded-xl flex items-center gap-4 w-full py-3 px-4 cursor-pointer transition-all duration-300`}
              >
                <page.icon 
                  size={24} 
                  strokeWidth={pathname === page.route ? 2 : 1.8} 
                  className={pathname === page.route ? "text-primary" : "text-white"}
                />
                <span className="font-medium whitespace-normal break-words">
                  {page.title}
                </span>
              </Link>
            </motion.div>
          ))}

          {/* Logout Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4"
          >
            <button
              onClick={handleLogout}
              className="group rounded-xl flex items-center gap-4 w-full py-3 px-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 cursor-pointer transition-all duration-300"
            >
              <LogOut size={24} strokeWidth={1.8} />
              <span className="font-medium">Se Déconnecter</span>
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden w-full h-fit fixed z-[50] flex flex-row justify-between items-center px-6 py-4 bg-white shadow-md">
        <Link href="/" className="flex lg:hidden">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image src="/logos/main.png" width={48} height={48} alt="logo" />
          </motion.div>
        </Link>
        
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="size-8 relative flex justify-center items-center"
        >
          <ChevronDown
            onClick={() => setToggle(true)}
            className="text-primary cursor-pointer size-full"
          />
        </motion.div>

        <AnimatePresence>
          {toggle && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[100] bg-gradient-to-b from-[#00008B] to-[#000023] text-white"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <Image src="/logos/light.png" width={100} height={40} alt="logo" />
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X
                    className="text-white cursor-pointer size-8"
                    onClick={() => setToggle(false)}
                  />
                </motion.div>
              </div>

              <ul className="h-full w-full flex flex-col px-6 py-8 gap-4 overflow-y-auto">
                {pageRoutes.map((page, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={page.route}
                      className={`${
                        pathname === page.route ? "bg-white text-primary" : "hover:bg-white/10"
                      } rounded-xl flex items-center gap-4 w-full py-4 px-6 cursor-pointer transition-all duration-300`}
                      onClick={() => setToggle(false)}
                    >
                      <page.icon size={26} />
                      <span className="font-medium text-lg">{page.title}</span>
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mt-4"
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      setToggle(false);
                    }}
                    className="rounded-xl flex items-center gap-4 w-full py-4 px-6 border-2 border-white/30 hover:bg-white/10 hover:border-white/50 cursor-pointer transition-all duration-300"
                  >
                    <LogOut size={26} />
                    <span className="font-medium text-lg">Se Déconnecter</span>
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
