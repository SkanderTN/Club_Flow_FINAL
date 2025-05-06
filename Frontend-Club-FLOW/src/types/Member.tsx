export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
  club: "CME" | "IEEE" | "Melkart" | "Microsoft" | "CPC";
  role: "Président" | "Vice-Président" | "Secrétaire Général" | "Trésorier";
  birthDate: string;
  address: string;
  link: string;
}