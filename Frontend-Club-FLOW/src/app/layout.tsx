import { Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "ClubFLOW",
  description:
    "A comprehensive dashboard for Melkart Junior Entreprise, helping HR manage member-related activities and providing members with access to profiles, workshops, news, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.className} bg-light`}>
        <div className="min-h-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
