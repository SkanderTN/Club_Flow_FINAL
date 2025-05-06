import {
  CalendarClock,
  CalendarPlus,
  UserCircle2,
  Users2,
  ClipboardPlus,
  ClipboardList,
  BookCopy,
  GraduationCap,
  BookPlusIcon,
  DoorOpen,
  DoorClosed,
  Bus,
  AlertCircle,
  MessagesSquare
} from "lucide-react";

export const pageRoutes = [
  { title: "Mon Profil", route: "/mon-profil", icon: UserCircle2 },

  {
    title: "Gestion des Membres",
    route: "/gestion-membres",
    icon: Users2,
  },

  {
    title: "Gestion des Évènements",
    route: "/gestion-evenements",
    icon: CalendarPlus,
  },

  { title: "Planning", route: "/planning", icon: CalendarClock },

  { title: "Gestion des Guides", route: "/gestion-guides", icon: BookPlusIcon },
  { title: "Guides et Supports", route: "/guides-supports", icon: BookCopy },

  {
    title: "Demander une Formation",
    route: "/demander-formation",
    icon: GraduationCap,
  },
  {
    title: "Demandes de Formation",
    route: "/demandes-formation",
    icon: GraduationCap,
  },
  {
    title: "Demander une Salle",
    route: "/demander-salle",
    icon: DoorOpen,
  },
  {
    title: "Demandes de Salles",
    route: "/demandes-salles",
    icon: DoorClosed,
  },
  {
    title: "Demander un Bus",
    route: "/demander-bus",
    icon: Bus,
  },
  {
    title: "Demandes de Bus",
    route: "/demandes-bus",
    icon: Bus
  },
  {
    title: "Demander un Matériel",
    route: "/demander-materiels",
    icon: ClipboardPlus
  },
  {
    title: "Demandes de Matériels",
    route: "/demandes-materiels",
    icon: ClipboardList
  },

  // 🆕 Ajouts pour Réclamations
  {
    title: "Réclamer",
    route: "/reclamer",
    icon: AlertCircle,
  },
  {
    title: "Réclamations",
    route: "/reclamations",
    icon: MessagesSquare,
  }
];
