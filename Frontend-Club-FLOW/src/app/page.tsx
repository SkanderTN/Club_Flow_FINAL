import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "ClubFLOW | Login",
  description:
    "Access your ClubFLOW account. Log in to manage your profile, view workshops, news, and more.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-row  ">
      <div className="hidden sm:flex w-full bg-primary items-center justify-center ">
        <Image
          src="/logos/light.png"
          width={280}
          height={280}
          alt="logo"
          className=" w-full px-4 md:px-8 lg:px-24 gap-8 "
        />
      </div>
      <LoginForm />
    </main>
  );
}
