# CurrículoLab

Aplicação de gestão de currículos construída com Next.js, Tailwind CSS e validação de formulários.

## Tecnologias usadas

- Next.js (App Router)
- Tailwind CSS
- React Hook Form
- Yup
- Sonner
- React Icons
- React Input Mask

## Páginas principais

- `/` — Landing page com apresentação do sistema
- `/sistema/paginas/curriculos` — Lista de currículos com busca em tempo real
- `/sistema/paginas/curriculos/[id]` — Detalhes do candidato
- `/sistema/paginas/curriculos/novo` — Formulário dinâmico de cadastro

## Como executar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Observações

Os currículos são armazenados no `localStorage` do navegador e o formulário de cadastro utiliza campos dinâmicos para experiências profissionais e formações acadêmicas.
