"use client";

import { useEffect, useState } from "react";
import Axios from "axios";

const backendIP = process.env.IP;

export default function NotaDash() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:3001/nota`).then((response) => {
      setDados(response.data);
      setLoading(false);
      console.log(dados);
    });
    console.log(backendIP);
  }, []);
  const notaf = dados.map((item: any) => item.nota);
  const nota = notaf.toString();
  const notf = nota.slice(0, 4);

  return (
    <div className="flex h-full w-full flex-col items-center  ">
      <p className="text-xs text-muted-foreground font-semibold">
        Nota de Satisfação
      </p>
      <div className="flex items-center gap-3 mt-12">
        <span
          className={`w-3 h-3 rounded-full
          bg-green-500 animate-bounce`}></span>
        <h1 className="text-7xl font-semibold ">{notf}</h1>
      </div>
    </div>
  );
}
