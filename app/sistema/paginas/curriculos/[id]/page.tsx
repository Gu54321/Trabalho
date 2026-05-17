import Image from "next/image";
import Link from "next/link";
import { mockCurriculos } from "@/lib/curriculos-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return mockCurriculos.map((c) => ({ id: c.id }));
}

export default function CurriculoDetailPage({ params }: PageProps) {
  const curriculo = mockCurriculos.find((item) => item.id === params.id);

  if (!curriculo) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-200/60">
          <p className="text-xl font-semibold text-slate-950">Currículo não encontrado</p>
          <p className="mt-3 text-sm text-slate-600">Verifique se o currículo existe ou volte para a lista.</p>
          <Link href="/sistema/paginas/curriculos" className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
            Voltar para lista
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Detalhes do currículo</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{curriculo.nome}</h1>
          <p className="mt-2 text-sm text-slate-600">{curriculo.cargo}</p>
        </div>
        <Link href="/sistema/paginas/curriculos" className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          Voltar à lista
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_0.6fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Resumo profissional</p>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-7">{curriculo.resumoProfissional}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Experiência profissional</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {curriculo.experienciaProfissional.map((item, index) => (
                <div key={index} className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-slate-950">{item.cargo}</h3>
                    <span className="text-sm text-slate-500">{item.periodo}</span>
                  </div>
                  <p className="text-sm text-slate-600">{item.empresa}</p>
                  <p className="text-sm leading-6 text-slate-700">{item.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Formação acadêmica</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {curriculo.formacaoAcademica.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-950">{item.curso}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.instituicao}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.periodo}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="flex flex-col items-center gap-6 p-6 text-center">
            <Image src={curriculo.foto} alt={curriculo.nome} width={140} height={140} className="mx-auto rounded-3xl bg-slate-100" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contato</p>
              <p className="mt-3 text-sm text-slate-700">{curriculo.email}</p>
              <p className="text-sm text-slate-700">{curriculo.telefone}</p>
            </div>
            <div className="grid gap-3">
              <Badge className="bg-slate-900 text-white">CPF: {curriculo.cpf}</Badge>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Habilidades</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {curriculo.habilidades.map((skill) => (
                <Badge key={skill} className="bg-slate-900 text-white">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full" variant="outline">
            Ações de gestão (simulado)
          </Button>
        </div>
      </div>
    </section>
  );
}
