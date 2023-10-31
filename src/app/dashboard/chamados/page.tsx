"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Axios from "axios";

import Navbar from "@/components/navbar";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const checkAuthentication = () => {
  const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
  return !!authToken; // Retorna true se o token existir, ou false se não existir
};

export default function Dashboard() {
  const router = useRouter();
  const [teste, setteste] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/login");
    }

    Axios.get("http://localhost:3001/getdata").then((response) => {
      setteste(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="bg-customTrans flex h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex w-[calc(100vw-12rem)] my-5 flex-col items-center">
        {isLoading ? (
          <div className=" flex justify-center items-center">
            <span className="w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
        ) : (
          //<ScrollArea className="max-w-[calc(100vw-12rem)] h-screen pb-16 flex justify-center items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Chamados</h1>
            <Separator />
            <Label className="text-sm text-muted-foreground">
              Campos de filtragrem:
            </Label>
            <DataTable columns={columns} data={teste} />
          </div>
          //</ScrollArea>
        )}
      </div>
    </main>
  );
}
