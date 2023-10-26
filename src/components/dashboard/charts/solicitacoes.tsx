"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  Colors,
} from "chart.js";

import { Bar, Line, Scatter, Bubble, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors
);

import { useEffect, useState } from "react";
import Axios from "axios";

export default function SolicitacoesDash() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/solicitacoes").then((response) => {
      setDados(response.data);
      setLoading(false);
    });
  }, []);

  const colunas = dados.map((item: any) => item.solicitacao);
  const valores = dados.map((item: any) => item.qtd);

  const data = {
    labels: colunas,
    datasets: [
      {
        backgroundColor: ["#0284C7", "#EA580C"],
        borderColor: "#0C0A09",
        data: valores,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Impede que o gráfico mantenha a proporção
    responsive: true, // Torna o gráfico responsivo
    width: 400, // Largura do gráfico
    height: 600, // Altura do gráfico
    layout: {
      padding: 0.5,
      //margin: 15,
    },

    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 10,
          },
          color: "#A8A29E",

          usePointStyle: true,
        },
        reverse: true,
      },
      colors: {
        forceOverride: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <p className="text-xs text-muted-foreground font-semibold">
        Solicitações
      </p>
      <Doughnut options={options} data={data} />
      {/* {loading ? (
        <span className="w-3 h-3 bg-white rounded-full animate-ping" />
      ) : (
        <Doughnut options={options} data={data} />
      )} */}
    </div>
  );
}
