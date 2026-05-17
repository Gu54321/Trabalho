export type ExperienciaProfissional = {
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
};

export type FormacaoAcademica = {
  curso: string;
  instituicao: string;
  periodo: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumoProfissional: string;
  experienciaProfissional: ExperienciaProfissional[];
  formacaoAcademica: FormacaoAcademica[];
  habilidades: string[];
  foto: string;
};
