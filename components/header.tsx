"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
            CurrículoLab
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/sistema/paginas/curriculos/novo">
              <Button size="sm">Cadastrar</Button>
            </Link>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
}
