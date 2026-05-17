"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CurriculoCard from "@/components/curriculo-card";
import { useCurriculos } from "@/lib/curriculos-storage";

export default function CurriculosPage() {
  const { curriculos } = useCurriculos();
  const [search, setSearch] = useState("");

  const filteredCurriculos = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    if (!normalized) {
      return curriculos;
    }

    return curriculos.filter((item) => {
      return (
        item.nome.toLowerCase().includes(normalized) ||
        item.cargo.toLowerCase().includes(normalized)
      );
    });
  }, [curriculos, search]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 rounded-4xl bg-white p-8 shadow-lg shadow-slate-200/60">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Lista de Currículos</p>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Explore os candidatos disponíveis</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Use a pesquisa em tempo real para filtrar por nome ou cargo e acesse detalhes de cada currículo.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou cargo"
              className="pl-11"
            />
          </div>
          <Card className="rounded-3xl border-slate-200 bg-slate-50 p-6">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{filteredCurriculos.length}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">
                Currículos carregados localmente e filtrados automaticamente enquanto você digita.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredCurriculos.length > 0 ? (
          filteredCurriculos.map((curriculo) => (
            <CurriculoCard key={curriculo.id} curriculo={curriculo} />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            <p className="text-lg font-semibold">Nenhum currículo encontrado</p>
            <p className="mt-2 text-sm">Tente ajustar os termos de busca ou cadastre um novo candidato.</p>
          </div>
        )}
      </div>
    </section>
  );
}
