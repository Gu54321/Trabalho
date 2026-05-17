import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} CurrículoLab. Todos os direitos reservados.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="text-slate-700 hover:text-slate-950">
            Home
          </Link>
          <Link href="/sistema/paginas/curriculos" className="text-slate-700 hover:text-slate-950">
            Currículos
          </Link>
          <Link href="/sistema/paginas/curriculos/novo" className="text-slate-700 hover:text-slate-950">
            Cadastro
          </Link>
        </div>
      </div>
    </footer>
  );
}
