# agent.md

## Sistema de Agendamento para Barbearias

Este arquivo orienta agentes de inteligência artificial, assistentes de código e ferramentas automatizadas que atuarem neste repositório.

O objetivo é garantir que qualquer implementação respeite o escopo do produto, a arquitetura definida e as decisões registradas no projeto.

---

## 1. Fontes de verdade do projeto

Antes de implementar qualquer alteração, consulte os seguintes documentos:

1. `PRD.md`
2. `DESIGN_DOC.md`
3. `ADR.md`
4. este arquivo `agent.md`

A ordem de prioridade é:

```text
PRD.md
   ↓
DESIGN_DOC.md
   ↓
ADR.md
   ↓
agent.md
   ↓
Código existente
```

### Regra de conflito

Quando houver conflito entre documentos:

- o PRD define o comportamento do produto;
- o Design Doc define a proposta técnica;
- o ADR define decisões arquiteturais específicas;
- o código existente não deve ser tratado como fonte de verdade quando contradizer os documentos.

Não altere uma regra de produto apenas para se adaptar ao código atual.

---

## 2. Objetivo do sistema

O sistema deve permitir que clientes:

- se identifiquem;
- escolham um profissional;
- escolham um serviço;
- consultem horários disponíveis;
- realizem agendamentos;
- consultem seus compromissos;
- cancelem agendamentos futuros.

O sistema deve permitir que gestores:

- cadastrem profissionais;
- cadastrem serviços;
- consultem a agenda;
- acompanhem o histórico de atendimentos.

---

## 3. Escopo da primeira versão

A primeira versão é um protótipo acadêmico.

### Incluído

- frontend em React;
- projeto criado com Vite;
- JavaScript;
- React Router;
- Axios;
- React Hook Form;
- date-fns;
- JSON Server;
- persistência em `db.json`;
- área do cliente;
- área administrativa;
- cálculo de horários disponíveis;
- bloqueio de conflitos;
- cancelamento lógico;
- histórico básico.

### Fora do escopo

Não implemente sem solicitação explícita:

- autenticação real;
- JWT;
- cadastro de senha;
- recuperação de senha;
- backend Express;
- PostgreSQL;
- pagamentos;
- notificações por WhatsApp;
- envio de e-mail;
- aplicativo mobile;
- múltiplas barbearias;
- controle de estoque;
- emissão fiscal;
- integração com Google Agenda;
- infraestrutura de produção.

---

## 4. Stack obrigatória

Utilize:

```text
React
Vite
JavaScript
React Router DOM
Axios
React Hook Form
date-fns
JSON Server
CSS Modules ou CSS comum
```

### Não adicionar sem necessidade

Evite adicionar:

- Redux;
- Zustand;
- Next.js;
- TypeScript;
- Tailwind CSS;
- bibliotecas de componentes completas;
- ORMs;
- bibliotecas de data adicionais;
- bibliotecas duplicadas para a mesma finalidade.

Uma nova dependência só deve ser adicionada quando:

1. resolver um problema concreto;
2. não existir solução simples com a stack atual;
3. não duplicar funcionalidade existente;
4. for compatível com o escopo do protótipo.

---

## 5. Arquitetura

O frontend deve permanecer organizado em camadas.

```text
src/
├── assets/
├── components/
├── pages/
├── routes/
├── services/
├── hooks/
├── utils/
├── constants/
├── layouts/
├── App.jsx
└── main.jsx
```

### Responsabilidades

#### `components/`

Componentes visuais reutilizáveis.

Exemplos:

- botão;
- input;
- modal;
- card de serviço;
- card de profissional;
- card de agendamento;
- loading;
- estado vazio.

Não coloque regras de negócio complexas em componentes visuais.

#### `pages/`

Páginas completas da aplicação.

As páginas podem:

- coordenar componentes;
- chamar hooks;
- controlar estados locais;
- disparar ações;
- montar a interface.

As páginas não devem acessar diretamente o JSON Server.

#### `services/`

Comunicação HTTP.

Toda chamada para a API deve passar por essa camada.

Exemplos:

```text
clientService.js
professionalService.js
serviceService.js
appointmentService.js
```

#### `hooks/`

Coordenação de estados e operações reutilizáveis.

Exemplos:

- carregamento de profissionais;
- carregamento de serviços;
- operações de agendamento;
- controle do cliente atual.

#### `utils/`

Funções puras e reutilizáveis.

Exemplos:

- formatação de telefone;
- comparação de horários;
- cálculo de disponibilidade;
- validações;
- manipulação de datas.

#### `constants/`

Valores fixos.

Exemplos:

- status do agendamento;
- nomes de rotas;
- mensagens padronizadas.

#### `layouts/`

Estruturas de navegação.

Devem existir layouts separados para:

- cliente;
- administração.

---

## 6. Regras de implementação

### 6.1 Componentes

Prefira componentes:

- pequenos;
- reutilizáveis;
- com responsabilidade única;
- com nomes claros;
- sem chamadas HTTP diretas;
- sem regras complexas de disponibilidade.

Evite componentes com muitas responsabilidades.

### 6.2 Funções

Prefira funções:

- pequenas;
- puras quando possível;
- com nomes descritivos;
- sem efeitos colaterais ocultos.

Exemplo adequado:

```javascript
export function hasScheduleConflict(
  newStart,
  newEnd,
  existingAppointments
) {
  return existingAppointments.some((appointment) => {
    if (appointment.status === 'canceled') {
      return false;
    }

    return (
      newStart < appointment.endTime &&
      newEnd > appointment.startTime
    );
  });
}
```

### 6.3 Nomenclatura

Utilize nomes em inglês no código.

Exemplos:

```text
clients
professionals
services
appointments
startTime
endTime
durationMinutes
totalPrice
createdAt
canceledAt
```

Utilize textos em português na interface.

### 6.4 Estilo de código

- utilize `const` por padrão;
- utilize `let` apenas quando houver reatribuição;
- não utilize `var`;
- prefira funções legíveis a expressões excessivamente compactas;
- evite ternários aninhados;
- evite números mágicos;
- extraia valores fixos para constantes;
- mantenha tratamento de erro visível;
- remova logs temporários antes de finalizar.

---

## 7. Modelo de dados

O arquivo `db.json` deve conter:

```json
{
  "clients": [],
  "professionals": [],
  "services": [],
  "appointments": []
}
```

---

## 8. Entidade Cliente

```javascript
{
  id: 1,
  name: "João da Silva",
  phone: "55999999999",
  createdAt: "2026-06-15T10:00:00.000Z"
}
```

### Regras

- `name` é obrigatório;
- `phone` é obrigatório;
- telefone deve conter apenas números;
- um cliente existente pode ser localizado pelo telefone;
- evitar criar clientes duplicados com o mesmo telefone.

---

## 9. Entidade Profissional

```javascript
{
  id: 1,
  name: "Carlos",
  active: true,
  workStart: "08:00",
  workEnd: "18:00",
  createdAt: "2026-06-15T10:00:00.000Z"
}
```

### Regras

- `name` é obrigatório;
- `workStart` é obrigatório;
- `workEnd` é obrigatório;
- `workEnd` deve ser posterior a `workStart`;
- profissionais inativos não aparecem em novos agendamentos.

---

## 10. Entidade Serviço

```javascript
{
  id: 1,
  name: "Corte de cabelo",
  price: 45,
  durationMinutes: 30,
  active: true,
  createdAt: "2026-06-15T10:00:00.000Z"
}
```

### Regras

- `name` é obrigatório;
- `price` deve ser maior ou igual a zero;
- `durationMinutes` deve ser maior que zero;
- serviços inativos não aparecem em novos agendamentos.

---

## 11. Entidade Agendamento

```javascript
{
  id: 1,
  clientId: 1,
  professionalId: 1,
  serviceId: 1,
  date: "2026-06-20",
  startTime: "14:00",
  endTime: "14:30",
  status: "scheduled",
  totalPrice: 45,
  createdAt: "2026-06-15T10:00:00.000Z",
  canceledAt: null
}
```

### Status permitidos

```javascript
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
};
```

Não criar novos status sem atualizar:

- Design Doc;
- ADR;
- regras de interface;
- filtros;
- testes.

---

## 12. Regras de agendamento

### 12.1 Disponibilidade

Considere:

- expediente do profissional;
- duração do serviço;
- horários existentes;
- status do agendamento;
- data escolhida;
- intervalo padrão de 30 minutos.

### 12.2 Sobreposição

Existe conflito quando:

```text
novoInicio < fimExistente
e
novoFim > inicioExistente
```

Agendamentos cancelados devem ser ignorados.

### 12.3 Validação dupla

A disponibilidade deve ser verificada:

1. ao listar os horários;
2. antes de salvar o agendamento.

### 12.4 Preço

Copie o preço do serviço para `totalPrice` no momento do agendamento.

Não busque o preço atual do serviço para representar o histórico.

### 12.5 Horário final

Calcule `endTime` usando:

```text
startTime + durationMinutes
```

Armazene o resultado no agendamento.

---

## 13. Cancelamento

Não exclua agendamentos cancelados.

Atualize:

```javascript
{
  status: 'canceled',
  canceledAt: new Date().toISOString()
}
```

### Regras

- apenas agendamentos futuros podem ser cancelados;
- agendamentos cancelados não bloqueiam horários;
- registros cancelados permanecem no histórico;
- use `PATCH`, não `DELETE`.

---

## 14. Serviços HTTP

A instância do Axios deve ficar centralizada.

```javascript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});
```

### Exemplo de service

```javascript
import { api } from './api';

export async function getActiveProfessionals() {
  const response = await api.get('/professionals', {
    params: {
      active: true,
    },
  });

  return response.data;
}
```

### Regras

- componentes não devem importar `axios`;
- páginas não devem montar URLs manualmente;
- services devem retornar os dados necessários;
- erros podem ser tratados no hook ou na página;
- mensagens técnicas não devem aparecer para o usuário.

---

## 15. Formulários

Utilize React Hook Form.

### Validações mínimas

#### Cliente

- nome obrigatório;
- mínimo de 3 caracteres;
- telefone obrigatório;
- telefone válido.

#### Profissional

- nome obrigatório;
- início do expediente obrigatório;
- final do expediente obrigatório;
- final posterior ao início.

#### Serviço

- nome obrigatório;
- preço obrigatório;
- preço não negativo;
- duração maior que zero.

#### Agendamento

- cliente selecionado;
- profissional selecionado;
- serviço selecionado;
- data válida;
- horário disponível;
- data não passada.

---

## 16. Gerenciamento de estado

Utilize:

- `useState`;
- `useEffect`;
- hooks personalizados;
- Context API apenas para o cliente atual.

Não introduza Redux ou outra biblioteca global sem necessidade explícita.

### Contexto do cliente

O contexto pode fornecer:

```text
client
setClient
logout
isAuthenticated
```

A identificação é simplificada e não deve ser apresentada como autenticação segura.

---

## 17. Rotas esperadas

### Cliente

```text
/
/cliente/entrar
/agendar
/agendamentos
/agendamento/confirmado
```

### Administração

```text
/admin
/admin/profissionais
/admin/servicos
/admin/agenda
/admin/historico
```

Utilize uma página de erro para rotas inexistentes.

---

## 18. Interface e experiência do usuário

A interface deve ser:

- simples;
- responsiva;
- legível;
- consistente;
- adequada para usuários leigos.

### Estados obrigatórios

Toda tela que carrega dados deve prever:

- carregamento;
- sucesso;
- lista vazia;
- erro.

### Mensagens

Utilize mensagens claras.

Exemplos:

```text
Não foi possível carregar os profissionais.
Este horário não está mais disponível.
Preencha os campos obrigatórios.
Agendamento realizado com sucesso.
Agendamento cancelado com sucesso.
```

Não exiba:

- stack traces;
- mensagens brutas do Axios;
- URLs internas;
- objetos técnicos.

---

## 19. Tratamento de erros

Use `try/catch` em operações assíncronas quando necessário.

Exemplo:

```javascript
try {
  setIsLoading(true);
  const professionals = await getActiveProfessionals();
  setProfessionals(professionals);
} catch (error) {
  console.error(error);
  setError('Não foi possível carregar os profissionais.');
} finally {
  setIsLoading(false);
}
```

### Regra

O usuário recebe uma mensagem compreensível.

O desenvolvedor pode receber detalhes no console durante o desenvolvimento.

---

## 20. Testes mínimos

Antes de considerar uma funcionalidade concluída, valide:

### Profissionais

- criar;
- editar;
- ativar;
- inativar;
- ocultar inativos do agendamento.

### Serviços

- criar;
- editar;
- validar preço;
- validar duração;
- ocultar inativos.

### Clientes

- criar cliente;
- localizar por telefone;
- evitar duplicidade simples.

### Agendamentos

- criar em horário livre;
- impedir conflito;
- considerar duração;
- armazenar preço;
- armazenar horário final;
- listar por cliente;
- listar por profissional;
- cancelar horário futuro;
- impedir cancelamento passado;
- liberar horário cancelado.

---

## 21. Processo de implementação para agentes

Ao receber uma tarefa:

1. leia o PRD relacionado;
2. consulte o Design Doc;
3. consulte os ADRs;
4. inspecione o código existente;
5. identifique arquivos afetados;
6. implemente a menor mudança possível;
7. preserve compatibilidade com o restante do sistema;
8. valide regras de negócio;
9. teste o fluxo principal;
10. atualize documentação quando houver mudança arquitetural.

---

## 22. Regras para geração de código por IA

O agente deve:

- gerar código funcional;
- respeitar a estrutura existente;
- evitar reescrever arquivos sem necessidade;
- preservar nomes e contratos públicos;
- explicar alterações arquiteturais relevantes;
- adicionar validações;
- tratar estados de carregamento e erro;
- utilizar dados e nomes coerentes com o domínio;
- manter o escopo do protótipo.

O agente não deve:

- inventar requisitos;
- adicionar funcionalidades fora do PRD;
- trocar a stack;
- substituir JSON Server por backend real;
- adicionar autenticação sem solicitação;
- alterar regras de agendamento sem justificativa;
- usar `DELETE` para cancelamento;
- colocar chamadas HTTP dentro de componentes;
- duplicar funções de disponibilidade;
- adicionar dependências desnecessárias;
- esconder erros silenciosamente.

---

## 23. Alterações arquiteturais

Antes de implementar uma alteração arquitetural relevante, crie ou atualize um ADR.

Exemplos:

- trocar JavaScript por TypeScript;
- trocar JSON Server por backend;
- adicionar banco de dados;
- adicionar biblioteca global de estado;
- adicionar autenticação;
- alterar o modelo de agendamento;
- mudar a estratégia de horários;
- adicionar múltiplas barbearias.

Uma alteração arquitetural não deve ser feita apenas porque a IA considera outra solução “melhor”.

A arquitetura atual foi escolhida para o escopo do protótipo.

---

## 24. Critérios de conclusão de uma tarefa

Uma tarefa só pode ser considerada concluída quando:

- atende ao requisito solicitado;
- não quebra fluxos existentes;
- respeita os documentos;
- possui tratamento de erro;
- contempla carregamento quando necessário;
- mantém a interface consistente;
- evita duplicação;
- utiliza a camada correta;
- não adiciona dependência sem justificativa;
- foi validada no fluxo principal.

---

## 25. Convenções de commit

Utilize mensagens curtas e objetivas.

Exemplos:

```text
feat: adiciona cadastro de serviços
feat: implementa fluxo de agendamento
fix: impede conflito entre horários
fix: libera horário após cancelamento
refactor: extrai cálculo de disponibilidade
docs: atualiza decisões arquiteturais
```

Evite mensagens genéricas:

```text
ajustes
alterações
correções
teste
commit final
```

---

## 26. Comandos do projeto

### Instalar dependências

```bash
npm install
```

### Executar frontend

```bash
npm run dev
```

### Executar API simulada

```bash
npm run server
```

### Gerar build

```bash
npm run build
```

### Executar lint

```bash
npm run lint
```

---

## 27. Checklist para revisão de pull request

### Produto

- [ ] A alteração atende ao PRD?
- [ ] Não adiciona requisito não solicitado?
- [ ] O comportamento está claro para o usuário?

### Arquitetura

- [ ] Respeita os ADRs?
- [ ] Usa a camada correta?
- [ ] As chamadas HTTP estão em `services/`?
- [ ] As regras de negócio estão fora da interface?

### Código

- [ ] Os nomes são claros?
- [ ] Não há duplicação evidente?
- [ ] Não há logs temporários?
- [ ] Os erros são tratados?
- [ ] Os estados de carregamento foram considerados?

### Domínio

- [ ] Serviços e profissionais inativos foram filtrados?
- [ ] A duração do serviço foi considerada?
- [ ] Conflitos foram validados?
- [ ] Cancelamentos usam exclusão lógica?
- [ ] O preço foi salvo no agendamento?

### Interface

- [ ] A tela funciona em dispositivos menores?
- [ ] Existem mensagens de erro claras?
- [ ] Existe estado vazio?
- [ ] Existe feedback de sucesso?

---

## 28. Direção futura

Quando o protótipo evoluir, a arquitetura prevista é:

```text
React
  ↓
API REST em Node.js
  ↓
PostgreSQL
```

Essa evolução só deve acontecer após decisão explícita e atualização dos documentos técnicos.

Até lá, mantenha:

```text
React + JSON Server + db.json
```

---

## 29. Regra final

Antes de gerar código, responda mentalmente:

```text
Esta alteração resolve um requisito do PRD?
Respeita o Design Doc?
Respeita os ADRs?
Está dentro do escopo do protótipo?
Foi implementada na camada correta?
```

Se alguma resposta for negativa, revise a abordagem antes de continuar.
