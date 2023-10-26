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
  BarElement,
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
  Colors,
  BarElement
);

import { useEffect, useState } from "react";
import Axios from "axios";

export default function criacaomes() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/criacaomes").then((response) => {
      setDados(response.data);
      setLoading(false);
    });
  }, []);

  const colunas = dados.map((item: any) => item.MES);
  const valores = dados.map((item: any) => item.qtd);

  const data = {
    labels: colunas,
    datasets: [
      {
        label: "Chamados Abertos",
        data: valores,
        backgroundColor: "#ea580c",
        borderColor: "#fff)",
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
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgb(555,555,555,0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        position: "top" as const,
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
      line: {
        backgroundColor: "#EA580C",
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <p className="text-xs text-muted-foreground font-semibold">
        Criação por Mês
      </p>
      <Bar options={options} data={data} />
      {/* {loading ? (
        <span className="w-3 h-3 bg-white rounded-full animate-ping" />
      ) : (
        <Doughnut options={options} data={data} />
      )} */}
    </div>
  );
}
