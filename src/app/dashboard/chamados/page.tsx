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
import Navbar from "@/components/navbar";

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
    <main className="bg-customTrans flex h-full">
      <div className="fixed">
        <Navbar />
      </div>
      <div className="flex w-[calc(100vw-10rem)] flex-col justify-center items-center">
        {isLoading ? (
          <div className="h-screen w-[100vw]  flex justify-center items-center">
            <span className="w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
        ) : (
          <div className="ml-64 mt-12 flex justify-center items-center ">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[500px]">Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Assunto</TableHead>
                  <TableHead className="text-right">Informe</TableHead>
                  <TableHead className="text-right">Responsavel</TableHead>
                  <TableHead className="text-right">Protocolo</TableHead>
                  <TableHead className="text-right">Matricula</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teste.map((data: any) => (
                  <TableRow key={data.protocolo}>
                    <TableCell className="font-bold " align="center">
                      {data.data.slice(0, 10)}
                    </TableCell>
                    <TableCell className="font-medium">{data.hora}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.assunto}</TableCell>
                    <TableCell className="text-right">{data.informe}</TableCell>
                    <TableCell className="text-right">
                      {data.nome_usuario}
                    </TableCell>
                    <TableCell className="text-right">
                      {data.protocolo}
                    </TableCell>
                    <TableCell className="text-right">
                      {data.matricula_usuario}
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
