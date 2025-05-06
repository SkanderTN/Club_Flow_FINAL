import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen w-full px-4">
      <>
        <Sidebar />
        <div className="flex sm:hidden h-28" />
      </>
      <div className="w-full min-h-fit rounded-3xl sm:border border-primary my-2 ">
        {children}
      </div>
    </div>
  );
}
