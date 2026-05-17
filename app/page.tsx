import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.3em] text-slate-200">
              Plataforma de currículos
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Cadastro e busca de currículos com foco em UX e desempenho.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200/90">
              A aplicação foi construída com Next.js, Tailwind CSS e formulários dinâmicos com validação rigorosa. Explore currículos, veja detalhes e cadastre novos candidatos com experiência simulada.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/sistema/paginas/curriculos">
                <Button size="lg">Ver currículos</Button>
              </Link>
              <Link href="/sistema/paginas/curriculos/novo">
                <Button variant="secondary" size="lg">
                  Cadastrar novo
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Veja o sistema</p>
                <div className="rounded-3xl bg-slate-950/90 p-6 text-slate-50 shadow-xl shadow-slate-950/20">
                  <p className="text-base font-semibold">Benefícios principais</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    <li>• Gestão de currículos com busca e filtragem.</li>
                    <li>• Cadastro com validação e campos dinâmicos.</li>
                    <li>• Feedback instantâneo por toast e layout responsivo.</li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-3xl font-semibold">+2</p>
                  <p className="mt-2 text-sm text-slate-400">Currículos de exemplo já prontos</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-3xl font-semibold">100%</p>
                  <p className="mt-2 text-sm text-slate-400">Validação de formulário com Yup e React Hook Form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
