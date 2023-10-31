import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  CheckSquare,
  MoreVertical,
  Text,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export type Payment = {
  data: string;
  hora: number;
  status: "Aberto" | "Em tratativa" | "fechado";
  assunto: string;
  informe: string;
  responsavel: string;
  protocolo: string;
  matricula: string;
  textarea: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "data",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "hora",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assunto",
    header: "Assunto",
  },
  {
    accessorKey: "nome_usuario",
    header: "Cliente",
  },
  {
    accessorKey: "protocolo",
    header: "Protocolo",
  },
  {
    header: "Ação",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const [copy, setcopy] = useState(false);

      const copiarTexto = async () => {
        await navigator.clipboard.writeText(payment.textarea);
        setcopy(true);
      };

      return (
        <Dialog>
          <DialogTrigger>
            <MoreVertical />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informações sobre o chamado</DialogTitle>
              <Label className="pt-5">Data do Chamado:</Label>
              <Separator className="w-1/2" />
              <DialogDescription>{payment.data}</DialogDescription>
              <Label className="pt-5">Horário de Abertura:</Label>
              <Separator className="w-1/2" />
              <DialogDescription>{payment.hora}</DialogDescription>
              <Label className="pt-5">Conteúdo:</Label>
              <DialogDescription>
                <ScrollArea className="h-full">
                  <Textarea className="text-sm h-[300px] resize-none">
                    {payment.textarea}
                  </Textarea>
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={copiarTexto}
                className={
                  copy ? `bg-green-600 hover:bg-green-800` : `bg-primary`
                }>
                {!copy ? (
                  <Copy className="w-4 h-4" />
                ) : (
                  <CheckSquare className="w-4 h-4" />
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
