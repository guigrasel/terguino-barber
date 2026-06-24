# Sistema de Agendamento para Barbearias

Protótipo acadêmico de uma aplicação web para centralizar os agendamentos de uma barbearia. O cliente poderá escolher profissional, serviço, data e horário; o gestor poderá manter os cadastros e consultar a agenda.

## Requisitos

- Node.js `20.19+` ou `22.12+`;
- npm `10+`.

## Tecnologias

- React;
- Vite;
- JavaScript;
- React Router DOM;
- Axios;
- React Hook Form;
- date-fns;
- JSON Server.

## Instalação

```bash
npm install
```

## Variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Valor padrão:

```env
VITE_API_URL=http://localhost:3001
```

## Executar o frontend

```bash
npm run dev
```

A aplicação será disponibilizada, por padrão, em:

```text
http://localhost:5173
```

## Executar a API simulada

Em outro terminal:

```bash
npm run server
```

A API será disponibilizada em:

```text
http://localhost:3001
```

Recursos iniciais:

```text
GET /clients
GET /professionals
GET /services
GET /appointments
```

## Outros comandos

```bash
npm run lint
npm run build
npm run preview
```

## Persistência do protótipo

O JSON Server utiliza o arquivo `db.json` com as coleções:

```json
{
  "clients": [],
  "professionals": [],
  "services": [],
  "appointments": []
}
```

O projeto fixa o JSON Server na versão estável `0.17.4`, compatível com o modelo de IDs numéricos e com o comando `--watch` definido na documentação do projeto.

## Documentação

- [`PRD.md`](./PRD.md): necessidades e comportamentos do produto;
- [`DESIGN_DOC.md`](./DESIGN_DOC.md): especificação técnica;
- [`ADR.md`](./ADR.md): decisões arquiteturais;
- [`agent.md`](./agent.md): instruções para agentes de IA;
- [`Plan.md`](./Plan.md): plano de implementação;
