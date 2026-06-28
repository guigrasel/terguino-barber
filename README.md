# Sistema de Agendamento para Barbearias

Protótipo acadêmico de uma aplicação web para centralizar os agendamentos de uma barbearia. O cliente pode se identificar, escolher profissional, serviço, data e horário, consultar seus compromissos e cancelar agendamentos futuros. O gestor pode manter profissionais e serviços, acompanhar a agenda por data/profissional e consultar histórico de atendimentos e cancelamentos.

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

Se a porta `5173` já estiver em uso, o Vite informará a próxima porta disponível.

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

Use antes da demonstração:

```bash
npm run lint
npm run build
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

## Funcionalidades entregues no MVP

- identificação simples do cliente por nome e telefone;
- cadastro, edição, ativação e inativação de profissionais;
- cadastro, edição, ativação e inativação de serviços;
- criação de agendamento considerando duração do serviço e agenda do profissional;
- bloqueio de conflitos de horário;
- consulta de agendamentos do cliente;
- cancelamento lógico de agendamentos futuros com `status: canceled` e `canceledAt`;
- liberação automática de horários cancelados para novos agendamentos;
- agenda administrativa por data e profissional;
- histórico administrativo de atendimentos passados e cancelamentos;
- estados de loading, erro e vazio nas telas principais.

## Credenciais administrativas

A área administrativa usa apenas uma identificação local para demonstração:

```text
Usuário: admin
Senha: admin
```

Essa identificação não substitui autenticação real e não deve ser usada como segurança de produção.

## Dados de demonstração

O arquivo `db.json` já possui dados para apresentar os fluxos principais:

- profissionais ativos: Carlos Oliveira, Bruno Almeida e Diego Martins;
- profissional inativo: Miguel Rocha;
- serviços ativos: Corte de cabelo, Barba, Corte e barba e Acabamento;
- serviço inativo: Sobrancelha;
- clientes de exemplo, incluindo Guilherme Mattiazzi Grasel;
- agendamentos futuros, atendimento concluído e cancelamentos preservados no histórico.

Datas úteis para demonstração:

- `2026-07-01`: agenda com horários agendados e cancelados;
- `2026-07-03`: cancelamento de demonstração com horário liberado;
- `2026-06-18`: atendimento concluído no histórico.

## Roteiro de demonstração

1. Inicie a API com `npm run server`.
2. Inicie a aplicação com `npm run dev`.
3. Acesse a área do cliente e identifique-se com nome e telefone.
4. Crie um agendamento escolhendo profissional, serviço, data e horário disponível.
5. Use uma data/profissional com agendamento existente e observe que horários ocupados não aparecem para seleção.
6. Acesse "Meus horários" e cancele um agendamento futuro.
7. Volte ao agendamento e confirme que o horário cancelado aparece disponível.
8. Acesse `/admin`, entre com `admin` / `admin` e abra a gestão.
9. Acesse `/admin/profissionais` e cadastre ou altere um profissional.
10. Acesse `/admin/servicos` e cadastre ou altere um serviço.
11. Acesse `/admin/agenda` para consultar agendamentos por data e profissional.
12. Acesse `/admin/historico` para consultar atendimentos passados e cancelamentos por período, profissional e status.

## Documentação

- [`PRD.md`](./docs/PRD.md): necessidades e comportamentos do produto;
- [`DESIGN_DOC.md`](./docs/DESIGN_DOC.md): especificação técnica;
- [`ADR.md`](./docs/ADR.md): decisões arquiteturais;
- [`agent.md`](./docs/agent.md): instruções para agentes de IA;
- [`Plan.md`](./docs/Plan.md): plano de implementação.
