export interface Guide {
  _id: string;
  title: string;
  description: string;
  club?: "CME" | "MICROSOFT" | "MELKART" | "IEEE" | "CPC";
  link: string;
}
