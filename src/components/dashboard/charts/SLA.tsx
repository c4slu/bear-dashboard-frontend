"use client";

import { useEffect, useState } from "react";
import Axios from "axios";

const backendIP = process.env.IP;

export default function SlaDash() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:3001/SLA`).then((response) => {
      setDados(response.data);
      setLoading(false);
      console.log(dados);
    });
    console.log(backendIP);
  }, []);
  const SLA = dados.map((item: any) => item.SLA);

  return (
    <div className="flex h-full w-full flex-col items-center  ">
      <p className="text-xs text-center text-muted-foreground font-semibold">
        Tempo de Resposta <br /> (Chamados Fechados)
      </p>
      <div className="flex items-center gap-2 mt-16">
        <span
          className={`w-3 h-3 rounded-full
          bg-yellow-500 animate-bounce`}></span>
        <h1 className="text-3xl text-center font-semibold ">{SLA}</h1>
      </div>
    </div>
  );
}
