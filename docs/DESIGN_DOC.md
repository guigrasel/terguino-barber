# Design Doc — Sistema de Agendamento para Barbearias

## 1. Visão Geral

Este documento apresenta as principais decisões técnicas para o desenvolvimento do Sistema de Agendamento para Barbearias.

O objetivo é complementar o PRD, traduzindo as necessidades do produto em uma proposta técnica inicial. O sistema permitirá que clientes consultem horários disponíveis, realizem agendamentos e cancelem compromissos futuros. Também contará com uma área administrativa para gerenciamento de profissionais, serviços e agenda.

A primeira versão será desenvolvida como um protótipo acadêmico, priorizando simplicidade, organização do código e facilidade de demonstração.

---

## 2. Objetivos Técnicos

A solução deve:

- possuir uma interface web responsiva;
- separar as responsabilidades entre interface, regras de negócio e acesso aos dados;
- permitir navegação entre área do cliente e área administrativa;
- simular uma API para cadastro e consulta dos dados;
- impedir conflitos de agendamento;
- considerar a duração dos serviços no cálculo de disponibilidade;
- manter o código organizado para permitir evolução futura;
- facilitar o desenvolvimento com apoio de ferramentas de inteligência artificial.

---

## 3. Escopo Técnico

### 3.1 Incluído no protótipo

- aplicação web em React;
- navegação entre páginas;
- cadastro e consulta de clientes;
- cadastro de profissionais;
- cadastro de serviços;
- criação de agendamentos;
- cancelamento de agendamentos;
- visualização da agenda;
- histórico básico de atendimentos;
- persistência simulada em arquivo JSON;
- validações básicas de formulário;
- controle de disponibilidade dos horários.

### 3.2 Fora do escopo inicial

- autenticação real com senha;
- recuperação de senha;
- envio de mensagens por WhatsApp;
- envio de e-mails;
- pagamentos online;
- aplicativo mobile;
- banco de dados relacional;
- deploy em ambiente de produção;
- controle de múltiplas barbearias;
- integração com calendários externos;
- controle de estoque;
- emissão de nota fiscal.

---

## 4. Arquitetura da Solução

A aplicação seguirá uma arquitetura em camadas no frontend.

```text
Usuário
   ↓
Interface React
   ↓
Componentes e Páginas
   ↓
Hooks e Serviços
   ↓
API simulada
   ↓
Arquivo JSON
```

### 4.1 Camada de apresentação

Responsável pela interface visual e interação com o usuário.

Contém:

- páginas;
- componentes;
- formulários;
- tabelas;
- mensagens de erro;
- navegação;
- estados de carregamento.

### 4.2 Camada de regras de negócio

Responsável por comportamentos específicos do sistema.

Exemplos:

- validar dados obrigatórios;
- calcular horários disponíveis;
- impedir conflito de horários;
- verificar se um agendamento pode ser cancelado;
- filtrar profissionais e serviços ativos;
- organizar agendamentos por data e horário.

### 4.3 Camada de serviços

Responsável pela comunicação com a API simulada.

Exemplos:

- buscar profissionais;
- buscar serviços;
- buscar agendamentos;
- cadastrar clientes;
- criar agendamentos;
- cancelar agendamentos;
- atualizar registros.

### 4.4 Camada de persistência

No protótipo, os dados serão armazenados em um arquivo JSON, acessado por meio de uma API simulada.

Essa escolha reduz a complexidade inicial e permite demonstrar operações de consulta, criação e atualização de registros.

---

## 5. Stack Tecnológica

### 5.1 Frontend

- **React**: construção da interface;
- **Vite**: criação e execução do projeto;
- **JavaScript**: linguagem principal;
- **React Router DOM**: navegação entre páginas;
- **CSS Modules** ou CSS comum: estilização;
- **Axios**: comunicação com a API;
- **React Hook Form**: gerenciamento de formulários;
- **date-fns**: manipulação de datas e horários.

### 5.2 Backend simulado

- **JSON Server**: criação de uma API REST simulada;
- **db.json**: arquivo utilizado para persistência dos dados.

### 5.3 Desenvolvimento

- **Node.js**: ambiente de execução;
- **npm**: gerenciamento de dependências;
- **ESLint**: padronização e análise do código;
- **Prettier**: formatação automática;
- **Git e GitHub**: versionamento do projeto.

---

## 6. Estrutura Inicial do Projeto

```text
sistema-barbearia/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── ServiceCard/
│   │   ├── ProfessionalCard/
│   │   └── AppointmentCard/
│   ├── pages/
│   │   ├── client/
│   │   │   ├── ClientLogin/
│   │   │   ├── NewAppointment/
│   │   │   ├── MyAppointments/
│   │   │   └── AppointmentConfirmation/
│   │   ├── admin/
│   │   │   ├── Dashboard/
│   │   │   ├── Professionals/
│   │   │   ├── Services/
│   │   │   ├── Schedule/
│   │   │   └── AppointmentHistory/
│   │   └── NotFound/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── clientService.js
│   │   ├── professionalService.js
│   │   ├── serviceService.js
│   │   └── appointmentService.js
│   ├── hooks/
│   │   ├── useClients.js
│   │   ├── useProfessionals.js
│   │   ├── useServices.js
│   │   └── useAppointments.js
│   ├── utils/
│   │   ├── date.js
│   │   ├── phone.js
│   │   ├── validation.js
│   │   └── availability.js
│   ├── constants/
│   │   ├── appointmentStatus.js
│   │   └── routes.js
│   ├── layouts/
│   │   ├── ClientLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 7. Entidades do Domínio

### 7.1 Cliente

Representa a pessoa que utiliza o sistema para realizar agendamentos.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | número | sim | Identificador único |
| name | texto | sim | Nome do cliente |
| phone | texto | sim | Telefone do cliente |
| createdAt | data/hora | sim | Data de cadastro |

Regras:

- o nome não pode estar vazio;
- o telefone não pode estar vazio;
- o telefone deve ser armazenado apenas com números;
- clientes com o mesmo telefone podem ser reaproveitados em novos agendamentos.

### 7.2 Profissional

Representa um barbeiro disponível para realizar atendimentos.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | número | sim | Identificador único |
| name | texto | sim | Nome do profissional |
| active | booleano | sim | Indica se está disponível no sistema |
| workStart | horário | sim | Início do expediente |
| workEnd | horário | sim | Final do expediente |
| createdAt | data/hora | sim | Data de cadastro |

Regras:

- profissionais inativos não aparecem para novos agendamentos;
- o horário final deve ser posterior ao horário inicial;
- cada profissional possui sua própria agenda.

### 7.3 Serviço

Representa um serviço oferecido pela barbearia.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | número | sim | Identificador único |
| name | texto | sim | Nome do serviço |
| price | número | sim | Preço do serviço |
| durationMinutes | número | sim | Duração em minutos |
| active | booleano | sim | Indica se está disponível |
| createdAt | data/hora | sim | Data de cadastro |

Regras:

- o nome não pode estar vazio;
- o preço deve ser maior ou igual a zero;
- a duração deve ser maior que zero;
- serviços inativos não aparecem em novos agendamentos.

### 7.4 Agendamento

Representa um horário reservado por um cliente.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | número | sim | Identificador único |
| clientId | número | sim | Cliente responsável |
| professionalId | número | sim | Profissional escolhido |
| serviceId | número | sim | Serviço escolhido |
| date | data | sim | Data do atendimento |
| startTime | horário | sim | Horário de início |
| endTime | horário | sim | Horário de término |
| status | texto | sim | Estado do agendamento |
| totalPrice | número | sim | Valor do serviço no momento da reserva |
| createdAt | data/hora | sim | Data de criação |
| canceledAt | data/hora | não | Data do cancelamento |

Status possíveis:

```text
scheduled
completed
canceled
```

Regras:

- um profissional não pode ter dois agendamentos sobrepostos;
- o horário final é calculado usando a duração do serviço;
- agendamentos cancelados deixam de bloquear a agenda;
- apenas agendamentos futuros podem ser cancelados;
- o valor do serviço deve ser copiado para o agendamento;
- alterações futuras no preço do serviço não devem modificar agendamentos antigos.

---

## 8. Relacionamento entre Entidades

```text
Cliente 1 ─── N Agendamento
Profissional 1 ─── N Agendamento
Serviço 1 ─── N Agendamento
```

Cada agendamento pertence a um cliente, um profissional e um serviço.

---

## 9. Modelo Inicial do Arquivo JSON

```json
{
  "clients": [
    {
      "id": 1,
      "name": "João da Silva",
      "phone": "55999999999",
      "createdAt": "2026-06-15T10:00:00.000Z"
    }
  ],
  "professionals": [
    {
      "id": 1,
      "name": "Carlos",
      "active": true,
      "workStart": "08:00",
      "workEnd": "18:00",
      "createdAt": "2026-06-15T10:00:00.000Z"
    }
  ],
  "services": [
    {
      "id": 1,
      "name": "Corte de cabelo",
      "price": 45,
      "durationMinutes": 30,
      "active": true,
      "createdAt": "2026-06-15T10:00:00.000Z"
    }
  ],
  "appointments": [
    {
      "id": 1,
      "clientId": 1,
      "professionalId": 1,
      "serviceId": 1,
      "date": "2026-06-20",
      "startTime": "14:00",
      "endTime": "14:30",
      "status": "scheduled",
      "totalPrice": 45,
      "createdAt": "2026-06-15T10:00:00.000Z",
      "canceledAt": null
    }
  ]
}
```

---

## 10. Rotas da Aplicação

### 10.1 Área do cliente

| Rota | Página | Descrição |
|---|---|---|
| `/` | Página inicial | Apresentação do sistema |
| `/cliente/entrar` | Identificação do cliente | Entrada com nome e telefone |
| `/agendar` | Novo agendamento | Seleção de profissional, serviço e horário |
| `/agendamentos` | Meus agendamentos | Consulta de horários marcados |
| `/agendamento/confirmado` | Confirmação | Resultado do agendamento |

### 10.2 Área administrativa

| Rota | Página | Descrição |
|---|---|---|
| `/admin` | Dashboard | Visão geral |
| `/admin/profissionais` | Profissionais | Cadastro e manutenção |
| `/admin/servicos` | Serviços | Cadastro e manutenção |
| `/admin/agenda` | Agenda | Visualização dos horários |
| `/admin/historico` | Histórico | Consulta de atendimentos |

---

## 11. Endpoints da API Simulada

### Clientes

```http
GET /clients
GET /clients/:id
POST /clients
PATCH /clients/:id
DELETE /clients/:id
```

### Profissionais

```http
GET /professionals
GET /professionals/:id
POST /professionals
PATCH /professionals/:id
DELETE /professionals/:id
```

### Serviços

```http
GET /services
GET /services/:id
POST /services
PATCH /services/:id
DELETE /services/:id
```

### Agendamentos

```http
GET /appointments
GET /appointments/:id
POST /appointments
PATCH /appointments/:id
DELETE /appointments/:id
```

Exemplos de consultas:

```http
GET /professionals?active=true
GET /services?active=true
GET /appointments?professionalId=1&date=2026-06-20
GET /appointments?clientId=1&status=scheduled
```

---

## 12. Fluxo Técnico de Agendamento

```text
Cliente informa seus dados
        ↓
Sistema procura cliente pelo telefone
        ↓
Cliente existente?
   ├── Sim: reutiliza o cadastro
   └── Não: cria um novo cliente
        ↓
Cliente seleciona profissional
        ↓
Cliente seleciona serviço
        ↓
Sistema busca agendamentos do profissional na data
        ↓
Sistema calcula horários disponíveis
        ↓
Cliente seleciona um horário
        ↓
Sistema valida novamente a disponibilidade
        ↓
Sistema cria o agendamento
        ↓
Sistema exibe a confirmação
```

A disponibilidade deve ser validada quando os horários forem exibidos e imediatamente antes da criação do agendamento.

---

## 13. Regra de Cálculo de Disponibilidade

O sistema deve considerar:

- início do expediente;
- final do expediente;
- duração do serviço;
- agendamentos existentes;
- agendamentos cancelados;
- intervalo padrão de 30 minutos.

Existe conflito quando:

```text
novoInicio < agendamentoExistenteFim
e
novoFim > agendamentoExistenteInicio
```

Agendamentos com status `canceled` devem ser ignorados.

---

## 14. Fluxo Técnico de Cancelamento

```text
Cliente acessa seus agendamentos
        ↓
Cliente escolhe um agendamento
        ↓
Sistema verifica o status
        ↓
Sistema verifica se a data ainda é futura
        ↓
Cliente confirma o cancelamento
        ↓
Sistema altera o status para canceled
        ↓
Sistema registra canceledAt
        ↓
Horário volta a ficar disponível
```

O registro não deve ser excluído, pois poderá ser utilizado no histórico.

---

## 15. Gerenciamento de Estado

A primeira versão pode utilizar estados locais do React e hooks personalizados.

A Context API poderá manter os dados do cliente identificado durante a navegação.

```text
ClientContext
├── client
├── setClient
├── logout
└── isAuthenticated
```

Não é necessário utilizar Redux na primeira versão.

---

## 16. Validações

### Cliente

- nome obrigatório;
- nome com no mínimo 3 caracteres;
- telefone obrigatório;
- telefone contendo apenas números;
- telefone com tamanho válido.

### Profissional

- nome obrigatório;
- horário inicial obrigatório;
- horário final obrigatório;
- horário final posterior ao inicial.

### Serviço

- nome obrigatório;
- preço obrigatório;
- preço maior ou igual a zero;
- duração obrigatória;
- duração maior que zero.

### Agendamento

- cliente obrigatório;
- profissional obrigatório;
- serviço obrigatório;
- data obrigatória;
- horário obrigatório;
- data não pode estar no passado;
- horário deve estar disponível;
- serviço e profissional devem estar ativos.

---

## 17. Tratamento de Erros

A interface deve apresentar mensagens claras, como:

```text
Não foi possível carregar os profissionais.
Não foi possível carregar os serviços.
Este horário não está mais disponível.
Preencha todos os campos obrigatórios.
O agendamento não pode mais ser cancelado.
Não foi possível salvar as alterações.
```

Erros técnicos não devem ser exibidos diretamente ao usuário.

---

## 18. Componentes Principais

- `Button`;
- `Input`;
- `Modal`;
- `ProfessionalCard`;
- `ServiceCard`;
- `AppointmentCard`;
- `ScheduleGrid`;
- `EmptyState`;
- `Loading`.

---

## 19. Páginas Principais

### Identificação do cliente

Coleta nome e telefone e localiza ou cadastra o cliente.

### Novo agendamento

Fluxo em etapas:

1. escolher profissional;
2. escolher serviço;
3. escolher data;
4. escolher horário;
5. revisar dados;
6. confirmar.

### Meus agendamentos

Lista horários futuros e permite cancelamento.

### Gestão de profissionais

Permite listar, cadastrar, editar, ativar e inativar profissionais.

### Gestão de serviços

Permite listar, cadastrar, editar, ativar e inativar serviços.

### Agenda administrativa

Permite visualizar agendamentos por data e profissional.

### Histórico

Permite consultar atendimentos concluídos e cancelados.

---

## 20. Segurança e Limitações

Como se trata de um protótipo:

- não haverá autenticação segura;
- os dados não devem conter informações sensíveis;
- o acesso administrativo será demonstrativo;
- o JSON Server não é uma solução de produção;
- não haverá controle real de concorrência;
- não haverá criptografia de dados.

Em uma versão real, seriam necessários backend próprio, autenticação, autorização, banco de dados e validação no servidor.

---

## 21. Estratégia de Testes

Casos essenciais:

1. criar um agendamento válido;
2. impedir conflito de agenda;
3. ocultar serviço inativo;
4. cancelar agendamento futuro;
5. impedir cancelamento de atendimento passado;
6. liberar horário após cancelamento.

---

## 22. Plano de Implementação

### Etapa 1 — Configuração

- criar projeto React com Vite;
- instalar dependências;
- configurar rotas;
- configurar Axios;
- configurar JSON Server;
- criar estrutura de pastas.

### Etapa 2 — Cadastros administrativos

- profissionais;
- serviços;
- formulários;
- integração com API simulada;
- ativação e inativação.

### Etapa 3 — Área do cliente

- identificação;
- cadastro ou localização do cliente;
- contexto do cliente;
- fluxo de agendamento.

### Etapa 4 — Disponibilidade

- cálculo de horários;
- busca da agenda;
- validação de sobreposição;
- bloqueio de conflitos.

### Etapa 5 — Agendamentos

- confirmação;
- listagem;
- cancelamento;
- liberação de horários.

### Etapa 6 — Agenda e histórico

- agenda administrativa;
- filtros;
- histórico;
- detalhes dos atendimentos.

### Etapa 7 — Qualidade

- revisar validações;
- revisar mensagens;
- testar fluxos;
- corrigir erros;
- melhorar responsividade;
- documentar execução.

---

## 23. Comandos Iniciais

```bash
npm create vite@latest sistema-barbearia -- --template react
cd sistema-barbearia
npm install
npm install react-router-dom axios react-hook-form date-fns
npm install json-server --save-dev
```

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001"
  }
}
```

Executar:

```bash
npm run dev
npm run server
```

---

## 24. Decisões Técnicas

### React com Vite

Permite rápida criação do projeto e organização em componentes.

### JSON Server

Simula uma API REST sem exigir um backend completo nesta etapa.

### JavaScript

Reduz a complexidade inicial. O projeto poderá migrar para TypeScript futuramente.

### Axios

Centraliza a comunicação com a API.

### React Hook Form

Facilita formulários e validações.

### date-fns

Auxilia na manipulação de datas e horários.

### Sem Redux

Hooks e Context API são suficientes para o escopo inicial.

---

## 25. Evolução Futura

```text
Frontend React
      ↓
API REST
      ↓
Backend Node.js
      ↓
Banco PostgreSQL
```

Possíveis melhorias:

- TypeScript;
- backend com Node.js;
- PostgreSQL;
- autenticação com JWT;
- múltiplas barbearias;
- horários personalizados por dia;
- bloqueios e folgas;
- notificações;
- pagamentos;
- relatórios;
- dashboard;
- testes automatizados;
- deploy em nuvem.

---

## 26. Critérios de Conclusão Técnica

O protótipo será considerado concluído quando:

- o cliente puder se identificar;
- profissionais puderem ser cadastrados;
- serviços puderem ser cadastrados;
- o cliente puder escolher profissional e serviço;
- o sistema exibir horários disponíveis;
- o cliente puder criar um agendamento;
- horários conflitantes forem bloqueados;
- o cliente puder visualizar seus agendamentos;
- agendamentos futuros puderem ser cancelados;
- o gestor puder consultar a agenda;
- os dados forem persistidos no arquivo JSON;
- os principais fluxos funcionarem sem erros bloqueadores.

---

## 27. Conclusão

Este Design Doc define uma proposta técnica simples e adequada para o protótipo do Sistema de Agendamento para Barbearias.

A utilização de React, Vite e JSON Server permite construir uma aplicação funcional sem adicionar complexidade desnecessária. Ao mesmo tempo, a organização em componentes, páginas, serviços, hooks e utilitários prepara o projeto para futuras evoluções.

O documento deve ser utilizado como referência durante a implementação e pode ser atualizado sempre que uma decisão técnica relevante for alterada.
