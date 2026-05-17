import { Curriculo } from "@/types/curriculo";

export const mockCurriculos: Curriculo[] = [
  {
    id: "1",
    nome: "Mariana Silva",
    cargo: "Analista de UX/UI",
    email: "mariana.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-10",
    resumoProfissional:
      "Experiência em design de interface e pesquisa de usuário para produtos digitais.",
    experienciaProfissional: [
      {
        cargo: "Designer de Produto",
        empresa: "Studio Flow",
        periodo: "2022 - 2024",
        descricao: "Liderança no redesign de dashboards corporativos com foco em acessibilidade.",
      },
    ],
    formacaoAcademica: [
      {
        curso: "Design Gráfico",
        instituicao: "Universidade Paulista",
        periodo: "2018 - 2021",
      },
    ],
    habilidades: ["Figma", "Pesquisa de UX", "Prototipação", "Tailwind CSS"],
    foto: "/avatar-placeholder.svg",
  },
  {
    id: "2",
    nome: "Gustavo Pereira",
    cargo: "Desenvolvedor Front-end",
    email: "gustavo.pereira@email.com",
    telefone: "(21) 99876-5432",
    cpf: "987.654.321-00",
    resumoProfissional:
      "Especialista em aplicações React com foco em performance e experiência do usuário.",
    experienciaProfissional: [
      {
        cargo: "Front-end Engineer",
        empresa: "AlphaTech",
        periodo: "2021 - 2024",
        descricao: "Criação de interfaces responsivas e componentes reutilizáveis em React.",
      },
    ],
    formacaoAcademica: [
      {
        curso: "Ciência da Computação",
        instituicao: "UFPR",
        periodo: "2017 - 2021",
      },
    ],
    habilidades: ["React", "Next.js", "JavaScript", "Acessibilidade"],
    foto: "/avatar-placeholder.svg",
  },
];
