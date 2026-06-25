# Plan.md

## Sistema de Agendamento para Barbearias

Este documento organiza a execução do projeto em fases, tarefas e entregáveis.

Ele deve ser utilizado em conjunto com:

- `PRD.md`
- `DESIGN_DOC.md`
- `ADR.md`
- `agent.md`

O objetivo é orientar a implementação do protótipo de forma incremental, evitando retrabalho e garantindo que cada etapa dependa de uma base já validada.

---

# 1. Objetivo do plano

Construir um protótipo funcional de sistema de agendamento para barbearias com:

- React;
- Vite;
- JavaScript;
- React Router;
- Axios;
- React Hook Form;
- date-fns;
- JSON Server;
- persistência em `db.json`.

O sistema deverá atender dois perfis:

- cliente;
- gestor da barbearia.

---

# 2. Estratégia de execução

A implementação seguirá esta ordem:

```text
1. Configuração
2. Estrutura base
3. Persistência simulada
4. Cadastros administrativos
5. Identificação do cliente
6. Agendamento
7. Consulta e cancelamento
8. Agenda administrativa
9. Histórico
10. Validação final
```

Cada fase deve ser concluída e validada antes do início da próxima.

---

# 3. Definição de pronto

Uma tarefa será considerada concluída quando:

- atender ao requisito solicitado;
- respeitar o PRD;
- respeitar o Design Doc;
- respeitar os ADRs;
- seguir as regras do `agent.md`;
- possuir tratamento de erro;
- possuir estado de carregamento quando necessário;
- funcionar no fluxo principal;
- não introduzir dependência desnecessária;
- não quebrar funcionalidades já implementadas.

---

# 4. Fase 0 — Preparação do repositório

## Objetivo

Preparar a base documental e garantir que todos os arquivos de orientação estejam versionados.

## Tarefas

- [x] adicionar `PRD.md`;
- [x] adicionar `DESIGN_DOC.md`;
- [x] adicionar `ADR.md`;
- [x] adicionar `agent.md`;
- [x] adicionar `Plan.md`;
- [ ] criar ou revisar `README.md`;
- [ ] confirmar que os documentos não possuem regras contraditórias;
- [ ] definir a branch principal do projeto;

# 5. Fase 1 — Configuração inicial

## Objetivo

Criar e executar a aplicação React e a API simulada.

## Tarefas

### 5.1 Criar o projeto

- [ ] criar o projeto React com Vite;
- [ ] entrar no diretório;
- [ ] instalar as dependências iniciais;
- [ ] executar a aplicação;
- [ ] remover os exemplos padrão do Vite.

### 5.2 Instalar dependências

- [ ] instalar `react-router-dom`;
- [ ] instalar `axios`;
- [ ] instalar `react-hook-form`;
- [ ] instalar `date-fns`;
- [ ] instalar `json-server` como dependência de desenvolvimento.

### 5.3 Configurar scripts

- [ ] manter o script `dev`;
- [ ] adicionar o script `server`;
- [ ] validar o script `build`;
- [ ] validar o script `lint`.

### 5.4 Criar arquivos principais

- [ ] criar `db.json`;
- [ ] criar `.gitignore`;
- [ ] criar `.env.example`, caso a URL da API seja configurável;
- [ ] configurar a URL base da API.

## Comandos esperados

```bash
npm create vite@latest sistema-barbearia -- --template react
cd sistema-barbearia
npm install
npm install react-router-dom axios react-hook-form date-fns
npm install json-server --save-dev
```

## Script esperado

```json
{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001",
    "build": "vite build",
    "lint": "eslint ."
  }
}
```

## Entregável

Frontend e JSON Server executando localmente.

## Critérios de aceite

- `npm run dev` inicia o frontend;
- `npm run server` inicia a API;
- o navegador acessa a aplicação;
- a API responde em `http://localhost:3001`;
- não existem erros bloqueadores no console.

---

# 6. Fase 2 — Estrutura base da aplicação

## Objetivo

Criar a organização arquitetural do frontend.

## Tarefas

### 6.1 Criar diretórios

- [ ] `src/assets`;
- [ ] `src/components`;
- [ ] `src/pages`;
- [ ] `src/routes`;
- [ ] `src/services`;
- [ ] `src/hooks`;
- [ ] `src/utils`;
- [ ] `src/constants`;
- [ ] `src/layouts`;
- [ ] `src/contexts`.

### 6.2 Criar layouts

- [ ] criar `ClientLayout`;
- [ ] criar `AdminLayout`;
- [ ] criar cabeçalho do cliente;
- [ ] criar navegação administrativa;
- [ ] garantir responsividade básica.

### 6.3 Configurar rotas

- [ ] criar `AppRoutes.jsx`;
- [ ] configurar as rotas do cliente;
- [ ] configurar as rotas administrativas;
- [ ] criar página `NotFound`;
- [ ] validar navegação sem recarregamento.

### 6.4 Criar componentes básicos

- [ ] `Button`;
- [ ] `Input`;
- [ ] `Modal`;
- [ ] `Loading`;
- [ ] `EmptyState`;
- [ ] componente de mensagem de erro;
- [ ] componente de mensagem de sucesso.

## Entregável

Aplicação navegável com estrutura de diretórios definida.

## Critérios de aceite

- todas as rotas básicas carregam;
- layouts do cliente e administrador são diferentes;
- componentes básicos são reutilizáveis;
- nenhuma página acessa diretamente a API;
- não existem regras de negócio dentro dos layouts.

---

# 7. Fase 3 — Persistência simulada e serviços

## Objetivo

Criar a estrutura de dados e a camada responsável pelas requisições.

## Tarefas

### 7.1 Criar modelo inicial do `db.json`

- [ ] criar coleção `clients`;
- [ ] criar coleção `professionals`;
- [ ] criar coleção `services`;
- [ ] criar coleção `appointments`;
- [ ] adicionar dados iniciais para desenvolvimento.

### 7.2 Criar instância da API

- [ ] criar `src/services/api.js`;
- [ ] configurar `baseURL`;
- [ ] centralizar configuração do Axios.

### 7.3 Criar serviços de domínio

- [ ] criar `clientService.js`;
- [ ] criar `professionalService.js`;
- [ ] criar `serviceService.js`;
- [ ] criar `appointmentService.js`.

### 7.4 Operações mínimas

#### Clientes

- [ ] buscar por telefone;
- [ ] criar cliente;
- [ ] buscar por ID.

#### Profissionais

- [ ] listar;
- [ ] listar ativos;
- [ ] criar;
- [ ] editar;
- [ ] ativar ou inativar.

#### Serviços

- [ ] listar;
- [ ] listar ativos;
- [ ] criar;
- [ ] editar;
- [ ] ativar ou inativar.

#### Agendamentos

- [ ] listar;
- [ ] listar por cliente;
- [ ] listar por profissional e data;
- [ ] criar;
- [ ] atualizar status;
- [ ] cancelar.

## Entregável

Camada de serviços funcionando sem dependência da interface.

## Critérios de aceite

- os services retornam somente `response.data`;
- componentes não importam Axios;
- URLs não ficam espalhadas nas páginas;
- erros são propagados para tratamento na interface;
- operações básicas funcionam no JSON Server.

---

# 8. Fase 4 — Cadastros administrativos

## Objetivo

Permitir que o gestor mantenha profissionais e serviços.

---

## 8.1 Profissionais

### Tarefas

- [ ] criar página de listagem;
- [ ] criar formulário de cadastro;
- [ ] criar formulário de edição;
- [ ] validar nome;
- [ ] validar início do expediente;
- [ ] validar final do expediente;
- [ ] impedir horário final anterior ao inicial;
- [ ] implementar ativação;
- [ ] implementar inativação;
- [ ] exibir loading;
- [ ] exibir estado vazio;
- [ ] exibir mensagens de erro;
- [ ] exibir feedback de sucesso.

### Critérios de aceite

- um profissional pode ser cadastrado;
- um profissional pode ser editado;
- um profissional pode ser inativado;
- profissionais inativos permanecem no histórico;
- profissionais inativos não aparecem em novos agendamentos.

---

## 8.2 Serviços

### Tarefas

- [ ] criar página de listagem;
- [ ] criar formulário de cadastro;
- [ ] criar formulário de edição;
- [ ] validar nome;
- [ ] validar preço;
- [ ] validar duração;
- [ ] impedir preço negativo;
- [ ] impedir duração igual ou inferior a zero;
- [ ] implementar ativação;
- [ ] implementar inativação;
- [ ] exibir loading;
- [ ] exibir estado vazio;
- [ ] exibir mensagens de erro;
- [ ] exibir feedback de sucesso.

### Critérios de aceite

- um serviço pode ser cadastrado;
- um serviço pode ser editado;
- um serviço pode ser inativado;
- serviços inativos permanecem no histórico;
- serviços inativos não aparecem em novos agendamentos.

## Entregável da fase

Painel administrativo com manutenção de profissionais e serviços.

---

# 9. Fase 5 — Identificação do cliente

## Objetivo

Permitir que o cliente se identifique antes de realizar agendamentos.

## Tarefas

### 9.1 Criar contexto

- [ ] criar `ClientContext`;
- [ ] armazenar cliente atual;
- [ ] implementar `setClient`;
- [ ] implementar `logout`;
- [ ] implementar `isAuthenticated`.

### 9.2 Criar página de entrada

- [ ] criar formulário de nome;
- [ ] criar formulário de telefone;
- [ ] validar nome;
- [ ] validar telefone;
- [ ] normalizar telefone;
- [ ] buscar cliente pelo telefone;
- [ ] reutilizar cliente existente;
- [ ] criar cliente quando não existir;
- [ ] armazenar cliente no contexto;
- [ ] redirecionar para o agendamento.

### 9.3 Tratamentos

- [ ] estado de carregamento;
- [ ] erro de conexão;
- [ ] cliente duplicado;
- [ ] feedback visual.

## Entregável

Cliente identificado e disponível durante a navegação.

## Critérios de aceite

- cliente existente é localizado pelo telefone;
- cliente novo é criado corretamente;
- não há criação duplicada no fluxo normal;
- nome e telefone são obrigatórios;
- o fluxo segue para a tela de agendamento.

---

# 10. Fase 6 — Regras de disponibilidade

## Objetivo

Implementar o núcleo das regras de agendamento.

## Tarefas

### 10.1 Criar utilitários

- [ ] converter horário em minutos;
- [ ] converter minutos em horário;
- [ ] somar duração ao horário inicial;
- [ ] comparar datas;
- [ ] validar data futura;
- [ ] gerar intervalos de 30 minutos;
- [ ] verificar sobreposição;
- [ ] filtrar agendamentos cancelados.

### 10.2 Implementar conflito

A regra deve considerar conflito quando:

```text
novoInicio < fimExistente
e
novoFim > inicioExistente
```

### 10.3 Gerar horários

- [ ] começar em `workStart`;
- [ ] terminar antes ou em `workEnd`;
- [ ] considerar `durationMinutes`;
- [ ] ignorar agendamentos cancelados;
- [ ] remover horários com conflito;
- [ ] ordenar horários.

### 10.4 Criar testes manuais

- [ ] serviço de 30 minutos;
- [ ] serviço de 60 minutos;
- [ ] conflito parcial;
- [ ] conflito total;
- [ ] horário encostado no anterior;
- [ ] horário no final do expediente;
- [ ] agendamento cancelado;
- [ ] agenda sem compromissos.

## Entregável

Funções reutilizáveis para cálculo de disponibilidade.

## Critérios de aceite

- horários ocupados não aparecem;
- a duração do serviço é considerada;
- agendamentos cancelados não bloqueiam horários;
- horários fora do expediente não aparecem;
- a regra não depende de componentes visuais.

---

# 11. Fase 7 — Fluxo de novo agendamento

## Objetivo

Permitir que o cliente conclua um agendamento.

## Etapas da interface

```text
1. Profissional
2. Serviço
3. Data
4. Horário
5. Revisão
6. Confirmação
```

## Tarefas

### 11.1 Seleção de profissional

- [ ] carregar profissionais ativos;
- [ ] exibir loading;
- [ ] exibir estado vazio;
- [ ] permitir seleção única.

### 11.2 Seleção de serviço

- [ ] carregar serviços ativos;
- [ ] exibir nome;
- [ ] exibir preço;
- [ ] exibir duração;
- [ ] permitir seleção única.

### 11.3 Seleção de data

- [ ] impedir data passada;
- [ ] armazenar data selecionada;
- [ ] limpar horário quando a data mudar.

### 11.4 Seleção de horário

- [ ] buscar agendamentos do profissional na data;
- [ ] gerar horários disponíveis;
- [ ] exibir estado vazio quando não houver horário;
- [ ] permitir seleção única.

### 11.5 Revisão

- [ ] exibir cliente;
- [ ] exibir profissional;
- [ ] exibir serviço;
- [ ] exibir preço;
- [ ] exibir data;
- [ ] exibir início;
- [ ] exibir fim.

### 11.6 Confirmação

- [ ] validar novamente a disponibilidade;
- [ ] recalcular `endTime`;
- [ ] copiar preço para `totalPrice`;
- [ ] criar com status `scheduled`;
- [ ] salvar `createdAt`;
- [ ] redirecionar para confirmação;
- [ ] tratar horário que deixou de estar disponível.

## Entregável

Fluxo completo de criação de agendamento.

## Critérios de aceite

- somente profissionais ativos aparecem;
- somente serviços ativos aparecem;
- data passada não pode ser escolhida;
- apenas horários disponíveis aparecem;
- conflito é validado antes de salvar;
- `totalPrice` é armazenado;
- `endTime` é armazenado;
- o agendamento aparece no `db.json`.

---

# 12. Fase 8 — Meus agendamentos e cancelamento

## Objetivo

Permitir que o cliente consulte e cancele compromissos futuros.

## Tarefas

### 12.1 Listagem

- [ ] buscar agendamentos pelo cliente;
- [ ] carregar dados relacionados;
- [ ] ordenar por data e horário;
- [ ] separar futuros e passados;
- [ ] exibir status;
- [ ] exibir profissional;
- [ ] exibir serviço;
- [ ] exibir preço.

### 12.2 Cancelamento

- [ ] exibir botão apenas quando permitido;
- [ ] abrir modal de confirmação;
- [ ] validar se ainda é futuro;
- [ ] atualizar status para `canceled`;
- [ ] preencher `canceledAt`;
- [ ] não usar `DELETE`;
- [ ] atualizar a lista;
- [ ] exibir mensagem de sucesso.

### 12.3 Disponibilidade após cancelamento

- [ ] confirmar que o horário cancelado volta a aparecer;
- [ ] confirmar que o registro permanece no histórico.

## Entregável

Área de compromissos do cliente.

## Critérios de aceite

- cliente visualiza seus agendamentos;
- apenas agendamentos futuros podem ser cancelados;
- cancelamento é lógico;
- o horário é liberado;
- o registro permanece armazenado.

---

# 13. Fase 9 — Agenda administrativa

## Objetivo

Permitir que o gestor acompanhe os horários da barbearia.

## Tarefas

- [ ] criar página da agenda;
- [ ] permitir seleção de data;
- [ ] permitir filtro por profissional;
- [ ] listar agendamentos do dia;
- [ ] exibir cliente;
- [ ] exibir serviço;
- [ ] exibir início e fim;
- [ ] exibir status;
- [ ] ordenar por profissional e horário;
- [ ] exibir estado vazio;
- [ ] exibir loading;
- [ ] tratar erro.

## Visualização mínima

Pode ser implementada inicialmente como:

- lista;
- tabela;
- agrupamento por profissional.

Uma visualização de calendário completo não é obrigatória no protótipo.

## Entregável

Agenda administrativa consultável.

## Critérios de aceite

- gestor consulta os compromissos de uma data;
- filtro por profissional funciona;
- registros cancelados são identificados;
- horários são exibidos em ordem;
- os dados do cliente e serviço são apresentados.

---

# 14. Fase 10 — Histórico de atendimentos

## Objetivo

Permitir consulta a registros passados e cancelados.

## Tarefas

- [ ] criar página de histórico;
- [ ] listar agendamentos passados;
- [ ] listar cancelamentos;
- [ ] exibir cliente;
- [ ] exibir profissional;
- [ ] exibir serviço;
- [ ] exibir valor histórico;
- [ ] filtrar por período;
- [ ] filtrar por profissional;
- [ ] filtrar por status;
- [ ] ordenar do mais recente para o mais antigo;
- [ ] exibir estado vazio.

## Entregável

Histórico básico operacional.

## Critérios de aceite

- o valor exibido vem de `totalPrice`;
- alterações no preço atual não alteram o histórico;
- cancelamentos permanecem disponíveis;
- filtros básicos funcionam.

---

# 15. Fase 11 — Interface e responsividade

## Objetivo

Padronizar a experiência de uso.

## Tarefas

### 15.1 Consistência visual

- [ ] padronizar botões;
- [ ] padronizar inputs;
- [ ] padronizar títulos;
- [ ] padronizar espaçamentos;
- [ ] padronizar mensagens;
- [ ] padronizar cartões;
- [ ] padronizar modais.

### 15.2 Responsividade

- [ ] testar em largura de celular;
- [ ] testar em tablet;
- [ ] testar em desktop;
- [ ] evitar rolagem horizontal;
- [ ] adaptar tabelas;
- [ ] adaptar navegação administrativa;
- [ ] garantir tamanho adequado para toque.

### 15.3 Acessibilidade básica

- [ ] associar labels aos campos;
- [ ] permitir navegação por teclado;
- [ ] usar botões reais para ações;
- [ ] incluir textos alternativos em imagens;
- [ ] garantir contraste suficiente;
- [ ] exibir foco visível.

## Entregável

Interface consistente e utilizável em diferentes tamanhos.

## Critérios de aceite

- fluxo principal funciona em celular e desktop;
- formulários são legíveis;
- botões possuem feedback;
- mensagens de erro ficam próximas aos campos;
- não existem elementos cortados.

---

# 16. Fase 12 — Validação e qualidade

## Objetivo

Revisar o sistema completo antes da entrega.

## Tarefas

### 16.1 Validação funcional

- [ ] cadastrar profissional;
- [ ] editar profissional;
- [ ] inativar profissional;
- [ ] cadastrar serviço;
- [ ] editar serviço;
- [ ] inativar serviço;
- [ ] identificar cliente;
- [ ] criar agendamento;
- [ ] impedir conflito;
- [ ] listar agendamentos;
- [ ] cancelar agendamento;
- [ ] liberar horário;
- [ ] consultar agenda;
- [ ] consultar histórico.

### 16.2 Validação técnica

- [ ] executar lint;
- [ ] gerar build;
- [ ] remover logs temporários;
- [ ] remover código comentado;
- [ ] remover imports não utilizados;
- [ ] verificar nomes;
- [ ] revisar duplicações;
- [ ] revisar tratamento de erros;
- [ ] revisar estados de carregamento;
- [ ] revisar estados vazios.

### 16.3 Validação documental

- [ ] atualizar README;
- [ ] revisar comandos de execução;
- [ ] confirmar estrutura de pastas;
- [ ] atualizar ADR em caso de mudança;
- [ ] atualizar Design Doc em caso de mudança técnica;
- [ ] atualizar PRD somente em caso de mudança de produto.

## Entregável

Versão final do protótipo.

## Critérios de aceite

- build final é gerado;
- fluxos essenciais funcionam;
- não existem erros bloqueadores;
- documentação corresponde ao código;
- o sistema pode ser demonstrado do início ao fim.

---

# 17. Backlog priorizado

## Prioridade P0 — Obrigatório

- [ ] configuração do projeto;
- [ ] JSON Server;
- [ ] cadastro de profissionais;
- [ ] cadastro de serviços;
- [ ] identificação do cliente;
- [ ] cálculo de disponibilidade;
- [ ] criação de agendamento;
- [ ] bloqueio de conflitos;
- [ ] consulta dos agendamentos;
- [ ] cancelamento lógico;
- [ ] agenda administrativa.

## Prioridade P1 — Importante

- [ ] histórico;
- [ ] filtros;
- [ ] responsividade;
- [ ] estados vazios;
- [ ] mensagens de sucesso;
- [ ] tratamento completo de erros;
- [ ] melhoria visual.

## Prioridade P2 — Opcional no protótipo

- [ ] filtros avançados;
- [ ] dashboard com indicadores;
- [ ] persistência do cliente no navegador;
- [ ] paginação;
- [ ] testes automatizados;
- [ ] animações;
- [ ] modo escuro.

---

# 18. Dependências entre tarefas

```text
Configuração
   ↓
Estrutura base
   ↓
Services + db.json
   ↓
Profissionais e serviços
   ↓
Cliente
   ↓
Disponibilidade
   ↓
Novo agendamento
   ↓
Meus agendamentos
   ↓
Agenda administrativa
   ↓
Histórico
   ↓
Validação final
```

### Regras

- não implementar agendamento antes dos cadastros;
- não implementar horários antes das regras de disponibilidade;
- não implementar histórico antes do modelo de agendamento;
- não aplicar melhorias visuais antes dos fluxos essenciais funcionarem;
- não adicionar funcionalidades futuras antes da conclusão dos itens P0.

---

# 19. Sugestão de divisão do trabalho

## Pessoa 1 — Base e arquitetura

- configuração do projeto;
- rotas;
- layouts;
- componentes básicos;
- API;
- services.

## Pessoa 2 — Administração

- profissionais;
- serviços;
- agenda administrativa;
- histórico.

## Pessoa 3 — Cliente

- identificação;
- contexto;
- novo agendamento;
- meus agendamentos;
- cancelamento.

## Responsabilidade compartilhada

- regras de disponibilidade;
- revisão;
- responsividade;
- documentação;
- testes.

Caso o projeto seja individual, mantenha a mesma ordem e implemente uma fase por vez.

---

# 20. Sequência sugerida de commits

```text
docs: adiciona documentação inicial
chore: cria projeto react com vite
chore: configura json server
feat: adiciona estrutura de rotas e layouts
feat: adiciona componentes básicos
feat: cria services da aplicação
feat: implementa cadastro de profissionais
feat: implementa cadastro de serviços
feat: implementa identificação do cliente
feat: adiciona cálculo de disponibilidade
feat: implementa fluxo de agendamento
feat: lista agendamentos do cliente
feat: implementa cancelamento de agendamento
feat: adiciona agenda administrativa
feat: adiciona histórico de atendimentos
style: melhora responsividade da aplicação
fix: corrige conflitos de agendamento
docs: atualiza instruções de execução
```

---

# 21. Checklist de demonstração

Antes da apresentação:

- [ ] iniciar JSON Server;
- [ ] iniciar frontend;
- [ ] limpar erros do console;
- [ ] garantir dados iniciais;
- [ ] cadastrar um profissional;
- [ ] cadastrar um serviço;
- [ ] criar um cliente;
- [ ] realizar um agendamento;
- [ ] mostrar o bloqueio do horário;
- [ ] mostrar a agenda administrativa;
- [ ] cancelar o agendamento;
- [ ] mostrar a liberação do horário;
- [ ] mostrar o histórico;
- [ ] preparar dados de exemplo para evitar improviso.

---

# 22. Riscos do plano

## JSON Server não controla concorrência

### Mitigação

Validar disponibilidade duas vezes e deixar claro que a solução é um protótipo.

## Crescimento do escopo

### Mitigação

Concluir todos os itens P0 antes de iniciar funcionalidades opcionais.

## Regras de data incorretas

### Mitigação

Centralizar cálculos em utilitários e testar cenários de conflito.

## Mistura entre interface e regras

### Mitigação

Seguir o `agent.md` e revisar arquivos antes do merge.

## Documentação ficar desatualizada

### Mitigação

Incluir revisão documental no critério de conclusão de tarefas relevantes.

---

# 23. Resultado esperado

Ao final deste plano, o projeto deve permitir a seguinte demonstração:

```text
Gestor cadastra profissionais e serviços
        ↓
Cliente informa nome e telefone
        ↓
Cliente escolhe profissional e serviço
        ↓
Sistema calcula horários livres
        ↓
Cliente confirma o agendamento
        ↓
Horário fica bloqueado
        ↓
Gestor consulta a agenda
        ↓
Cliente consulta seus compromissos
        ↓
Cliente cancela um horário futuro
        ↓
Horário volta a ficar disponível
        ↓
Registro permanece no histórico
```

Esse fluxo representa o produto mínimo viável definido para o protótipo.
