"use client";

import { useRouter } from "next/navigation";
import { type Resolver, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MaskedInput } from "@/components/ui/masked-input";
import { useCurriculos } from "@/lib/curriculos-storage";
import { Curriculo } from "@/types/curriculo";
import { maskPhone, maskCPF } from "@/lib/masks";

const schema = yup.object({
  nome: yup.string().required("Nome obrigatório").min(3, "Mínimo de 3 caracteres"),
  cargo: yup.string().required("Cargo desejado obrigatório").min(3, "Mínimo de 3 caracteres"),
  email: yup.string().required("E-mail obrigatório").email("Formato de e-mail inválido"),
  telefone: yup.string().required("Telefone obrigatório").matches(/\(\d{2}\) \d{5}-\d{4}/, "Formato de telefone inválido"),
  cpf: yup.string().required("CPF obrigatório").matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/, "Formato de CPF inválido"),
  resumoProfissional: yup.string().required("Resumo profissional obrigatório").min(20, "Mínimo de 20 caracteres"),
  habilidades: yup.string().required("Habilidades obrigatórias").min(5, "Liste pelo menos uma habilidade"),
  experienciaProfissional: yup
    .array()
    .of(
      yup.object({
        cargo: yup.string().required("Cargo obrigatório").min(3, "Mínimo de 3 caracteres"),
        empresa: yup.string().required("Empresa obrigatória").min(3, "Mínimo de 3 caracteres"),
        periodo: yup.string().required("Período obrigatório"),
        descricao: yup.string().required("Descrição obrigatória").min(10, "Mínimo de 10 caracteres"),
      }),
    )
    .min(1, "Inclua ao menos uma experiência"),
  formacaoAcademica: yup
    .array()
    .of(
      yup.object({
        curso: yup.string().required("Curso obrigatório").min(3, "Mínimo de 3 caracteres"),
        instituicao: yup.string().required("Instituição obrigatória").min(3, "Mínimo de 3 caracteres"),
        periodo: yup.string().required("Período obrigatório"),
      }),
    )
    .min(1, "Inclua ao menos uma formação"),
});

const defaultValues = {
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
  cpf: "",
  resumoProfissional: "",
  habilidades: "",
  experienciaProfissional: [
    {
      cargo: "",
      empresa: "",
      periodo: "",
      descricao: "",
    },
  ],
  formacaoAcademica: [
    {
      curso: "",
      instituicao: "",
      periodo: "",
    },
  ],
};

type FormValues = yup.InferType<typeof schema>;

export default function NovoCurriculoPage() {
  const router = useRouter();
  const { curriculos, save } = useCurriculos();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues,
  });

  const experienceFieldArray = useFieldArray({ control, name: "experienciaProfissional" });
  const educationFieldArray = useFieldArray({ control, name: "formacaoAcademica" });

  const onSubmit = async (data: FormValues) => {
    try {
      const novoCurriculo: Curriculo = {
        id: crypto.randomUUID(),
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        resumoProfissional: data.resumoProfissional,
        habilidades: data.habilidades
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        experienciaProfissional: data.experienciaProfissional || [],
        formacaoAcademica: data.formacaoAcademica || [],
        foto: "/avatar-placeholder.svg",
      };

      save([...curriculos, novoCurriculo]);
      toast.success("Currículo cadastrado com sucesso!");
      reset(defaultValues);
      router.push("/sistema/paginas/curriculos");
    } catch {
      toast.error("Falha ao salvar o currículo. Verifique os campos e tente novamente.");
    }
  };

  const experienceItems = experienceFieldArray.fields;
  const educationItems = educationFieldArray.fields;

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-4xl bg-white p-8 shadow-lg shadow-slate-200/60">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cadastro de currículo</p>
          <h1 className="text-3xl font-semibold text-slate-950">Adicione um novo candidato ao sistema</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Use o formulário para inserir dados do candidato, adicionar experiências e formações de forma dinâmica, e receber feedback imediato.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dados gerais</p>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome completo" {...register("nome")} />
                {errors.nome ? <p className="mt-2 text-sm text-red-600">{errors.nome.message}</p> : null}
              </div>
              <div>
                <Label htmlFor="cargo">Cargo desejado</Label>
                <Input id="cargo" placeholder="Cargo" {...register("cargo")} />
                {errors.cargo ? <p className="mt-2 text-sm text-red-600">{errors.cargo.message}</p> : null}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="nome@provedor.com" {...register("email")} />
                {errors.email ? <p className="mt-2 text-sm text-red-600">{errors.email.message}</p> : null}
              </div>
              <div>
                <MaskedInput
                  id="telefone"
                  label="Telefone"
                  placeholder="(99) 99999-9999"
                  mask={maskPhone}
                  error={errors.telefone?.message}
                  {...register("telefone")}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <MaskedInput
                  id="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  mask={maskCPF}
                  error={errors.cpf?.message}
                  {...register("cpf")}
                />
              </div>
              <div>
                <Label htmlFor="habilidades">Habilidades</Label>
                <Input id="habilidades" placeholder="React, UX, Typescript" {...register("habilidades")} />
                {errors.habilidades ? <p className="mt-2 text-sm text-red-600">{errors.habilidades.message}</p> : null}
              </div>
            </div>

            <div>
              <Label htmlFor="resumoProfissional">Resumo profissional</Label>
              <Textarea id="resumoProfissional" placeholder="Resumo das habilidades e experiência" {...register("resumoProfissional")} />
              {errors.resumoProfissional ? <p className="mt-2 text-sm text-red-600">{errors.resumoProfissional.message}</p> : null}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Experiência profissional</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {experienceItems.map((field, index) => (
              <div key={field.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`experienciaProfissional.${index}.cargo`}>Cargo</Label>
                    <Input id={`experienciaProfissional.${index}.cargo`} placeholder="Ex: Product Designer" {...register(`experienciaProfissional.${index}.cargo` as const)} />
                    {errors.experienciaProfissional?.[index]?.cargo ? (
                      <p className="mt-2 text-sm text-red-600">{errors.experienciaProfissional?.[index]?.cargo?.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor={`experienciaProfissional.${index}.empresa`}>Empresa</Label>
                    <Input id={`experienciaProfissional.${index}.empresa`} placeholder="Empresa" {...register(`experienciaProfissional.${index}.empresa` as const)} />
                    {errors.experienciaProfissional?.[index]?.empresa ? (
                      <p className="mt-2 text-sm text-red-600">{errors.experienciaProfissional?.[index]?.empresa?.message}</p>
                    ) : null}
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 mt-6">
                  <div>
                    <Label htmlFor={`experienciaProfissional.${index}.periodo`}>Período</Label>
                    <Input id={`experienciaProfissional.${index}.periodo`} placeholder="Ex: 2022 - 2024" {...register(`experienciaProfissional.${index}.periodo` as const)} />
                    {errors.experienciaProfissional?.[index]?.periodo ? (
                      <p className="mt-2 text-sm text-red-600">{errors.experienciaProfissional?.[index]?.periodo?.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor={`experienciaProfissional.${index}.descricao`}>Descrição</Label>
                    <Textarea id={`experienciaProfissional.${index}.descricao`} placeholder="Responsabilidades e resultados" {...register(`experienciaProfissional.${index}.descricao` as const)} />
                    {errors.experienciaProfissional?.[index]?.descricao ? (
                      <p className="mt-2 text-sm text-red-600">{errors.experienciaProfissional?.[index]?.descricao?.message}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => experienceFieldArray.remove(index)}
                    disabled={experienceItems.length === 1}
                  >
                    Remover experiência
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => experienceFieldArray.append({ cargo: "", empresa: "", periodo: "", descricao: "" })}>
              Adicionar experiência
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Formação acadêmica</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {educationItems.map((field, index) => (
              <div key={field.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.curso`}>Curso</Label>
                    <Input id={`formacaoAcademica.${index}.curso`} placeholder="Nome do curso" {...register(`formacaoAcademica.${index}.curso` as const)} />
                    {errors.formacaoAcademica?.[index]?.curso ? (
                      <p className="mt-2 text-sm text-red-600">{errors.formacaoAcademica?.[index]?.curso?.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor={`formacaoAcademica.${index}.instituicao`}>Instituição</Label>
                    <Input id={`formacaoAcademica.${index}.instituicao`} placeholder="Instituição" {...register(`formacaoAcademica.${index}.instituicao` as const)} />
                    {errors.formacaoAcademica?.[index]?.instituicao ? (
                      <p className="mt-2 text-sm text-red-600">{errors.formacaoAcademica?.[index]?.instituicao?.message}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6">
                  <Label htmlFor={`formacaoAcademica.${index}.periodo`}>Período</Label>
                  <Input id={`formacaoAcademica.${index}.periodo`} placeholder="Ex: 2018 - 2021" {...register(`formacaoAcademica.${index}.periodo` as const)} />
                  {errors.formacaoAcademica?.[index]?.periodo ? (
                    <p className="mt-2 text-sm text-red-600">{errors.formacaoAcademica?.[index]?.periodo?.message}</p>
                  ) : null}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => educationFieldArray.remove(index)}
                    disabled={educationItems.length === 1}
                  >
                    Remover formação
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => educationFieldArray.append({ curso: "", instituicao: "", periodo: "" })}>
              Adicionar formação
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? "Salvando..." : "Salvar currículo"}
          </Button>
          <Button type="button" variant="outline" onClick={() => reset(defaultValues)}>
            Limpar formulário
          </Button>
        </div>
      </form>
    </section>
  );
}
