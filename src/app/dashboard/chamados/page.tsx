"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <main className="bg-customTrans h-full">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className=" flex flex-col justify-center items-center">
        {isLoading ? (
          <span className="w-3 h-3 bg-white rounded-full animate-ping" />
        ) : (
          <div className="w-3/4">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Solicitação</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teste.map((data: any) => (
                  <TableRow key={data.id}>
                    <TableCell className="font-medium">{data.id}</TableCell>
                    <TableCell>{data.motivo}</TableCell>
                    <TableCell>{data.solicitacao}</TableCell>
                    <TableCell className="text-right">{data.status}</TableCell>
                    <TableCell className="text-right">
                      {data.data_criacao}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
