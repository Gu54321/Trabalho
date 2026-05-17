"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/sistema/paginas/curriculos", label: "Currículos" },
  { href: "/sistema/paginas/curriculos/novo", label: "Cadastro" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2 lg:gap-4">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
