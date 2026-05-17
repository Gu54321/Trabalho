import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Curriculo } from "@/types/curriculo";

export default function CurriculoCard({ curriculo }: { curriculo: Curriculo }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{curriculo.cargo}</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-950">{curriculo.nome}</h3>
          </div>
          <Badge>{curriculo.habilidades.slice(0, 2).join(" • ")}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-700">{curriculo.resumoProfissional}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-slate-500">{curriculo.email}</span>
        <Link
          href={`/sistema/paginas/curriculos/${curriculo.id}`}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Ver detalhes
        </Link>
      </CardFooter>
    </Card>
  );
}
