"use client";

import { useState } from "react";
import { Curriculo } from "@/types/curriculo";
import { mockCurriculos } from "@/lib/curriculos-data";

const STORAGE_KEY = "trabalho-curriculos";

function getSavedCurriculos(): Curriculo[] {
  if (typeof window === "undefined") {
    return mockCurriculos;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return mockCurriculos;
  }

  try {
    return JSON.parse(stored) as Curriculo[];
  } catch {
    return mockCurriculos;
  }
}

function saveCurriculosToStorage(curriculos: Curriculo[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculos));
}

export function useCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>(() => getSavedCurriculos());

  const refresh = () => setCurriculos(getSavedCurriculos());
  const save = (next: Curriculo[]) => {
    setCurriculos(next);
    saveCurriculosToStorage(next);
  };

  return { curriculos, refresh, save };
}
