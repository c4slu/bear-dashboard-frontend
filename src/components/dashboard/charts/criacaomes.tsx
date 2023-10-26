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
import React, { useEffect, useState } from "react";
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

  // Mapeie os dados para obter os meses e quantidades
  const colunas = dados.map((item: any) => item.MES);
  const valores = dados.map((item: any) => item.qtd);

  // Defina a ordem cronológica dos meses
  const mesesEmOrdemCronologica = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Ordene os meses de acordo com a ordem cronológica
  const dadosOrdenados = colunas.map((mes, index) => ({
    mes,
    qtd: valores[index],
  }));

  dadosOrdenados.sort((a, b) => {
    return (
      mesesEmOrdemCronologica.indexOf(a.mes) -
      mesesEmOrdemCronologica.indexOf(b.mes)
    );
  });

  const colunasEmOrdemCronologica = dadosOrdenados.map((item) => item.mes);
  const valoresEmOrdemCronologica = dadosOrdenados.map((item) => item.qtd);

  const data = {
    labels: colunasEmOrdemCronologica,
    datasets: [
      {
        label: "Chamados Abertos",
        data: valoresEmOrdemCronologica,
        backgroundColor: "#ea580c",
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    width: 400,
    height: 600,
    layout: {
      padding: 0.5,
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(555,555,555,0.2)",
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
        backgroundColor: "#ea580c",
      },
    },
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-xs text-muted-foreground font-semibold">
        Criação por Mês
      </p>
      <Bar options={options} data={data} />
    </div>
  );
}
