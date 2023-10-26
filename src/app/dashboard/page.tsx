"use client";

import { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import DashCard from "@/components/dashboard/card";
import { ClipboardEdit, Clock3, MailOpen, XSquare } from "lucide-react";

import RoscaDash from "@/components/dashboard/charts/motivos";
import SolicitacoesDash from "@/components/dashboard/charts/solicitacoes";
import CriacaoMes from "@/components/dashboard/charts/criacaomes";
import NotaDash from "@/components/dashboard/charts/nota";
import SlaDash from "@/components/dashboard/charts/SLA";

const checkAuthentication = () => {
  const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
  return !!authToken; // Retorna true se o token existir, ou false se não existir
};

export default function Dashboard() {
  const router = useRouter();
  const [chamadosAbertos, setChamadosAbertos] = useState([]);
  const [chamadosFechados, setchamadosFechados] = useState([]);
  const [chamadosTrativa, setchamadosTrativa] = useState([]);
  const [chamadosAvaliacao, setAvaliacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
      router.push("/login");
    }

    Axios.get("http://localhost:3001/chamadosAbertos").then((response) => {
      setChamadosAbertos(response.data);
      setIsLoading(false);
    });
    Axios.get("http://localhost:3001/chamadosFechados").then((response) => {
      setchamadosFechados(response.data);
      setIsLoading(false);
    });
    Axios.get("http://localhost:3001/chamadosTratativas").then((response) => {
      setchamadosTrativa(response.data);
      setIsLoading(false);
    });
    Axios.get("http://localhost:3001/chamadosValidacao").then((response) => {
      setAvaliacao(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="h-screen bg-customTrans flex ">
        <Navbar />
      <div className="max-w-[calc(100vw-12rem)] h-screen flex flex-col items-center ">
        <div className="grid grid-cols-4 grid-rows-1 auto-cols-max gap-10 mt-10 px-10">
          {chamadosAbertos.map((data: any) => (
            <DashCard
              value={data.qtd}
              name="Chamados em Aberto"
              ping={true}
              icon={<MailOpen />}
            />
          ))}
          {chamadosFechados.map((data: any) => (
            <DashCard
              value={data.qtd}
              name="Chamados Fechados"
              ping={false}
              icon={<XSquare />}
            />
          ))}
          {chamadosTrativa.map((data: any) => (
            <DashCard
              value={data.qtd}
              name="Chamados em Tratativa"
              ping={false}
              icon={<Clock3 />}
            />
          ))}
          {chamadosAvaliacao.map((data: any) => (
            <DashCard
              value={data.qtd}
              name="Aguardando Avaliação"
              ping={false}
              icon={<ClipboardEdit />}
            />
          ))}
        </div>
        {isLoading ? (
          <div className="flex w-[calc(100vw-12rem)] h-screen justify-center items-center">
            <span className="w-3 h-3 bg-white flex rounded-full animate-ping" />
          </div>
        ) : (
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-2/3 px-10 my-10">
            <div className="bg-background border rounded flex flex-col items-center justify-center p-5 ">
              <RoscaDash />
            </div>
            <div className="bg-background border rounded flex items-center justify-center p-5 col-span-2">
              <CriacaoMes />
            </div>
            <div className="bg-background border rounded flex items-center justify-center p-5">
              <SolicitacoesDash />
            </div>
            <div className="bg-background border rounded flex items-center justify-center p-5">
              <NotaDash />
            </div>
            <div className="bg-background border rounded flex items-center justify-center p-5">
              <SlaDash />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
