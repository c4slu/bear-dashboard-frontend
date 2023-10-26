"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const checkAuthentication = () => {
  const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
  return !!authToken; // Retorna true se o token existir, ou false se não existir
};

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <main className="flex h-screen justify-center items-center">
      <span className="w-3 h-3 bg-white rounded-full animate-ping" />
    </main>
  );
}
