# ADR — Decisões Arquiteturais

## Sistema de Agendamento para Barbearias

Este documento registra as principais decisões arquiteturais do projeto. Cada decisão segue o formato de Architecture Decision Record (ADR), permitindo compreender o contexto, a escolha realizada, as alternativas consideradas e suas consequências.

---

# ADR-001 — Utilizar React no frontend

## Status

Aceito

## Contexto

O sistema precisa oferecer uma interface web dinâmica, responsiva e organizada em componentes reutilizáveis. O projeto também deve ser simples de desenvolver, fácil de demonstrar e compatível com o escopo acadêmico.

A aplicação possuirá diferentes páginas e fluxos, como identificação do cliente, agendamento, visualização de compromissos e painel administrativo.

## Decisão

Utilizar React como biblioteca principal para construção da interface.

## Justificativa

React permite:

- criação de componentes reutilizáveis;
- gerenciamento de estado da interface;
- separação entre páginas, componentes e regras de apresentação;
- integração simples com APIs;
- amplo suporte da comunidade;
- facilidade de evolução futura.

## Alternativas consideradas

### Vue.js

Também atende ao projeto, mas não foi escolhido porque o grupo definiu React como tecnologia principal.

### HTML, CSS e JavaScript puro

Reduziria dependências, porém aumentaria a complexidade para controlar estados, componentes e navegação entre telas.

### Angular

Oferece uma estrutura completa, mas adicionaria complexidade desnecessária para um protótipo pequeno.

## Consequências positivas

- interface organizada em componentes;
- boa reutilização de código;
- facilidade para desenvolver novas páginas;
- grande disponibilidade de bibliotecas e documentação;
- possibilidade de migração futura para uma arquitetura mais robusta.

## Consequências negativas

- exige conhecimento dos conceitos de estado, propriedades e hooks;
- pode gerar componentes complexos caso a organização não seja mantida;
- depende do ecossistema Node.js.

---

# ADR-002 — Utilizar Vite como ferramenta de desenvolvimento

## Status

Aceito

## Contexto

O projeto precisa de uma ferramenta para criar, executar e gerar a versão final da aplicação React.

A solução deve oferecer inicialização rápida, configuração simples e boa experiência durante o desenvolvimento.

## Decisão

Utilizar Vite para criação e execução do frontend.

## Justificativa

Vite possui configuração inicial simples e servidor de desenvolvimento rápido, sendo adequado para protótipos e aplicações React modernas.

## Alternativas consideradas

### Create React App

Foi uma ferramenta popular para projetos React, mas atualmente possui um fluxo mais lento e menos flexível que o Vite.

### Configuração manual com Webpack

Ofereceria maior controle, porém adicionaria configuração e manutenção desnecessárias.

### Next.js

Possui recursos avançados, como renderização no servidor e rotas integradas, que não são necessários no protótipo.

## Consequências positivas

- criação rápida do projeto;
- atualização rápida durante o desenvolvimento;
- configuração reduzida;
- suporte direto ao React;
- processo de build simples.

## Consequências negativas

- algumas configurações avançadas podem exigir conhecimento adicional;
- o projeto fica dependente da estrutura e dos plugins do Vite.

---

# ADR-003 — Desenvolver a primeira versão em JavaScript

## Status

Aceito

## Contexto

O sistema será desenvolvido como protótipo acadêmico e deve priorizar velocidade de implementação e simplicidade.

O uso de TypeScript aumentaria a segurança de tipos, mas também exigiria definições adicionais e maior familiaridade da equipe.

## Decisão

Utilizar JavaScript na primeira versão da aplicação.

## Justificativa

JavaScript reduz a configuração inicial e permite que o grupo concentre seus esforços nas funcionalidades e nos fluxos do produto.

## Alternativas consideradas

### TypeScript

Melhoraria a segurança e a documentação do código, mas aumentaria a curva de aprendizado e o volume inicial de implementação.

## Consequências positivas

- desenvolvimento inicial mais rápido;
- menor quantidade de configuração;
- maior familiaridade para integrantes iniciantes;
- integração direta com o ecossistema React.

## Consequências negativas

- menor segurança durante refatorações;
- erros de tipo podem aparecer apenas em execução;
- contratos de dados ficam menos explícitos;
- pode ser necessário migrar para TypeScript em versões futuras.

---

# ADR-004 — Adotar arquitetura frontend em camadas

## Status

Aceito

## Contexto

O sistema terá páginas, componentes reutilizáveis, comunicação com API, regras de disponibilidade e funções de manipulação de datas.

Colocar todas essas responsabilidades diretamente nos componentes tornaria o código difícil de manter e testar.

## Decisão

Organizar o frontend em camadas e diretórios de responsabilidade:

- páginas;
- componentes;
- hooks;
- serviços;
- utilitários;
- layouts;
- rotas;
- constantes.

## Estrutura adotada

```text
src/
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── layouts/
├── routes/
└── constants/
```

## Justificativa

A separação facilita a leitura, manutenção, reutilização e evolução do sistema.

## Alternativas consideradas

### Estrutura baseada apenas em páginas

Seria mais simples inicialmente, mas causaria duplicação e mistura de responsabilidades.

### Arquitetura por funcionalidade

Poderia agrupar todos os arquivos de uma funcionalidade no mesmo diretório. É uma boa alternativa para sistemas maiores, mas a estrutura em camadas foi considerada mais fácil para o protótipo.

## Consequências positivas

- responsabilidades mais claras;
- componentes menores;
- regras reutilizáveis;
- comunicação com a API centralizada;
- facilidade para localizar arquivos.

## Consequências negativas

- aumenta o número de arquivos e pastas;
- pode gerar dúvidas sobre onde colocar determinada lógica;
- exige disciplina para evitar que regras de negócio voltem para os componentes.

---

# ADR-005 — Utilizar React Router para navegação

## Status

Aceito

## Contexto

A aplicação terá diferentes áreas e páginas, incluindo:

- página inicial;
- identificação do cliente;
- novo agendamento;
- meus agendamentos;
- painel administrativo;
- gestão de profissionais;
- gestão de serviços;
- agenda;
- histórico.

A navegação precisa ocorrer sem recarregar completamente a página.

## Decisão

Utilizar React Router DOM para gerenciamento das rotas no frontend.

## Justificativa

React Router é amplamente utilizado em aplicações React e permite configurar rotas, layouts e páginas de forma declarativa.

## Alternativas consideradas

### Navegação controlada apenas por estados

Funcionaria em um protótipo muito pequeno, mas dificultaria URLs diretas, histórico de navegação e crescimento da aplicação.

### Next.js Router

Exigiria adoção do framework Next.js, que não faz parte da arquitetura escolhida.

## Consequências positivas

- URLs específicas para cada página;
- navegação sem recarregamento completo;
- suporte ao histórico do navegador;
- possibilidade de separar área do cliente e administrativa.

## Consequências negativas

- adiciona uma dependência ao projeto;
- exige configuração de rotas e tratamento de páginas não encontradas;
- rotas administrativas não estarão realmente protegidas sem autenticação.

---

# ADR-006 — Utilizar JSON Server como API simulada

## Status

Aceito para o protótipo

## Contexto

O projeto precisa realizar operações de criação, leitura e atualização de dados, mas o desenvolvimento de um backend completo e de um banco de dados real aumentaria significativamente o escopo.

É necessário simular uma API para que o frontend possa trabalhar com requisições HTTP.

## Decisão

Utilizar JSON Server como backend simulado, com persistência no arquivo `db.json`.

## Justificativa

JSON Server permite criar rapidamente endpoints REST para as entidades do sistema sem desenvolver um servidor próprio.

## Alternativas consideradas

### Dados estáticos no frontend

Seria mais simples, mas não permitiria simular corretamente criação, edição e persistência.

### LocalStorage

Permitiria persistência local, porém acoplaria o acesso aos dados ao navegador e não simularia uma API REST.

### Backend Node.js com Express

Seria mais próximo de uma solução real, mas aumentaria o tempo e a complexidade do protótipo.

### Banco de dados PostgreSQL

Ofereceria persistência robusta, mas exigiria backend, configuração de ambiente e modelagem física.

## Consequências positivas

- API REST disponível rapidamente;
- suporte a operações GET, POST, PATCH e DELETE;
- facilidade para demonstrar persistência;
- separação entre frontend e fonte de dados;
- possibilidade de substituição futura por um backend real.

## Consequências negativas

- não oferece regras de negócio seguras no servidor;
- não possui autenticação;
- não controla concorrência adequadamente;
- não é indicado para produção;
- o arquivo JSON pode sofrer inconsistências;
- validações ficam concentradas no frontend.

---

# ADR-007 — Utilizar Axios para comunicação HTTP

## Status

Aceito

## Contexto

O frontend precisa consumir os endpoints disponibilizados pelo JSON Server.

A comunicação deve ficar centralizada para evitar URLs e tratamentos duplicados em diferentes componentes.

## Decisão

Utilizar Axios e criar uma instância central da API.

## Exemplo

```javascript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});
```

## Justificativa

Axios oferece uma API simples para requisições HTTP e facilita configuração de URL base, parâmetros, interceptadores e tratamento de erros.

## Alternativas consideradas

### Fetch API

Já está disponível no navegador e eliminaria uma dependência. Porém, o Axios foi escolhido pela simplicidade no tratamento de respostas e erros.

## Consequências positivas

- comunicação centralizada;
- código de requisição mais legível;
- configuração única de URL base;
- facilidade para migrar para um backend real.

## Consequências negativas

- adiciona uma dependência;
- alguns recursos utilizados já existem na Fetch API;
- erros precisam ser tratados de forma padronizada.

---

# ADR-008 — Utilizar React Hook Form nos formulários

## Status

Aceito

## Contexto

A aplicação terá diversos formulários, incluindo:

- identificação do cliente;
- cadastro de profissionais;
- cadastro de serviços;
- confirmação de agendamento.

Os formulários precisam de validações, mensagens de erro e controle de submissão.

## Decisão

Utilizar React Hook Form para gerenciamento dos formulários.

## Justificativa

A biblioteca reduz a quantidade de estado manual e facilita validação e integração com os componentes.

## Alternativas consideradas

### useState em cada campo

Funcionaria, mas geraria mais código repetitivo e maior quantidade de renderizações.

### Formik

Também é uma solução válida, mas o React Hook Form possui uma abordagem mais leve e direta para o escopo do projeto.

## Consequências positivas

- menos código repetitivo;
- validações centralizadas;
- mensagens de erro organizadas;
- boa integração com React.

## Consequências negativas

- adiciona uma dependência;
- exige aprendizado da API da biblioteca;
- componentes personalizados precisam ser integrados corretamente.

---

# ADR-009 — Utilizar date-fns para datas e horários

## Status

Aceito

## Contexto

O sistema precisa manipular datas e horários para:

- formatar datas;
- comparar agendamentos;
- validar datas futuras;
- calcular horários de término;
- verificar sobreposição;
- ordenar compromissos.

O uso direto do objeto `Date` do JavaScript pode gerar código repetitivo e erros de interpretação.

## Decisão

Utilizar date-fns para operações de data e hora.

## Justificativa

date-fns fornece funções pequenas e específicas, permitindo importar apenas os recursos utilizados.

## Alternativas consideradas

### JavaScript Date

Não adicionaria dependências, mas aumentaria a complexidade das operações.

### Moment.js

É conhecido, porém possui tamanho maior e não é a opção recomendada para novos projetos.

### Luxon

Também é uma boa biblioteca, mas date-fns foi considerada suficiente para o protótipo.

## Consequências positivas

- funções de data mais legíveis;
- facilidade para comparação e formatação;
- menor risco de lógica duplicada.

## Consequências negativas

- adiciona uma dependência;
- exige cuidado com fusos horários;
- horários armazenados como texto ainda precisarão de conversão.

---

# ADR-010 — Utilizar Context API apenas para a sessão simplificada do cliente

## Status

Aceito

## Contexto

O cliente precisa ser identificado durante a navegação entre as páginas de agendamento e consulta de compromissos.

O sistema não possui autenticação real, mas precisa manter os dados do cliente atual enquanto a aplicação estiver aberta.

## Decisão

Utilizar Context API para armazenar os dados do cliente identificado.

## Contexto previsto

```text
ClientContext
├── client
├── setClient
├── logout
└── isAuthenticated
```

## Justificativa

A Context API já faz parte do React e atende ao pequeno volume de estado global necessário.

## Alternativas consideradas

### Redux

Oferece recursos avançados de estado global, mas seria excessivo para o protótipo.

### Zustand

É uma alternativa leve, mas ainda adicionaria uma biblioteca para uma necessidade pequena.

### Passagem de propriedades entre páginas

Criaria acoplamento e dificultaria a navegação.

## Consequências positivas

- elimina dependência de uma biblioteca de estado global;
- acesso simples ao cliente atual;
- solução adequada ao escopo.

## Consequências negativas

- os dados podem ser perdidos ao atualizar a página;
- não substitui autenticação;
- contextos muito grandes podem causar renderizações desnecessárias;
- pode ser necessário usar `sessionStorage` ou `localStorage` futuramente.

---

# ADR-011 — Manter regras de negócio fora dos componentes visuais

## Status

Aceito

## Contexto

O sistema possui regras importantes, principalmente relacionadas à disponibilidade e aos conflitos de agenda.

Se essas regras forem implementadas diretamente dentro das páginas ou componentes visuais, o código ficará difícil de reutilizar e testar.

## Decisão

Implementar regras de negócio em funções utilitárias, hooks ou serviços específicos.

## Exemplos

```text
utils/availability.js
utils/date.js
utils/validation.js
hooks/useAppointments.js
```

## Justificativa

A interface deve ser responsável principalmente pela exibição e interação. Regras de disponibilidade devem permanecer independentes da camada visual.

## Alternativas consideradas

### Implementar tudo diretamente nas páginas

Seria mais rápido no início, porém aumentaria o acoplamento e dificultaria alterações.

## Consequências positivas

- regras reutilizáveis;
- componentes menores;
- maior facilidade de teste;
- redução de duplicação;
- manutenção mais segura.

## Consequências negativas

- exige organização inicial;
- pode haver dúvida entre colocar uma regra em `utils`, `hooks` ou `services`;
- regras críticas ainda estarão no frontend enquanto não houver backend real.

---

# ADR-012 — Utilizar exclusão lógica para agendamentos cancelados

## Status

Aceito

## Contexto

Quando um cliente cancela um agendamento, o sistema precisa liberar o horário, mas também manter o registro para histórico e análise futura.

Excluir definitivamente o registro faria com que informações importantes fossem perdidas.

## Decisão

Não excluir o agendamento cancelado. Alterar seu status para `canceled` e registrar `canceledAt`.

## Exemplo

```json
{
  "status": "canceled",
  "canceledAt": "2026-06-15T15:30:00.000Z"
}
```

## Justificativa

A manutenção do registro permite construir histórico, contabilizar cancelamentos e preservar a rastreabilidade.

## Alternativas consideradas

### Excluir fisicamente o registro

Simplificaria a listagem de agendamentos ativos, mas eliminaria o histórico.

### Criar uma coleção separada de cancelamentos

Aumentaria a complexidade e duplicaria a estrutura dos dados.

## Consequências positivas

- preserva o histórico;
- permite métricas futuras;
- evita perda de informações;
- simplifica auditoria.

## Consequências negativas

- consultas precisam filtrar o status;
- o arquivo JSON crescerá com o tempo;
- agendamentos cancelados precisam ser ignorados no cálculo de disponibilidade.

---

# ADR-013 — Armazenar preço e horário final no agendamento

## Status

Aceito

## Contexto

O preço e a duração de um serviço podem mudar com o tempo.

Se o histórico buscar sempre os dados atuais do serviço, agendamentos antigos poderão apresentar valores diferentes dos praticados na data do atendimento.

## Decisão

Armazenar no agendamento:

- `totalPrice`;
- `startTime`;
- `endTime`.

## Justificativa

Esses dados representam uma fotografia do momento em que o agendamento foi criado.

## Alternativas consideradas

### Consultar sempre o serviço atual

Reduziria a duplicação de dados, mas causaria inconsistências históricas.

### Criar uma tabela de versões de serviços

Seria mais robusto, mas excessivo para o protótipo.

## Consequências positivas

- histórico consistente;
- alterações de preço não afetam registros antigos;
- cálculo de conflitos simplificado;
- menor dependência do serviço durante consultas.

## Consequências negativas

- existe duplicação controlada de dados;
- alterações no serviço não atualizam agendamentos já criados;
- é necessário garantir que os valores sejam copiados corretamente.

---

# ADR-014 — Gerar horários em intervalos fixos de 30 minutos

## Status

Aceito para o protótipo

## Contexto

O sistema precisa apresentar horários disponíveis para o cliente.

Uma agenda totalmente flexível exigiria configurações mais complexas de intervalos, folgas e horários personalizados.

## Decisão

Gerar opções de início de atendimento em intervalos de 30 minutos.

## Exemplo

```text
08:00
08:30
09:00
09:30
10:00
```

A duração do serviço continuará sendo considerada para determinar o horário final e verificar conflitos.

## Justificativa

O intervalo fixo simplifica o cálculo e é suficiente para demonstrar o funcionamento do protótipo.

## Alternativas consideradas

### Intervalos configuráveis por profissional

Ofereceria maior flexibilidade, mas aumentaria a modelagem e a interface administrativa.

### Intervalos baseados na duração de cada serviço

Poderia gerar grades diferentes para cada serviço, tornando o comportamento menos previsível.

## Consequências positivas

- cálculo simples;
- interface previsível;
- menor complexidade;
- facilidade de demonstração.

## Consequências negativas

- limita horários como 08:15 ou 09:45;
- pode não atender todas as barbearias;
- será necessário tornar o intervalo configurável em uma versão futura.

---

# ADR-015 — Validar disponibilidade duas vezes

## Status

Aceito

## Contexto

O horário pode estar disponível quando a tela é carregada, mas deixar de estar disponível antes da confirmação.

Mesmo em um protótipo, é importante reduzir a possibilidade de conflito.

## Decisão

Validar a disponibilidade:

1. ao gerar a lista de horários;
2. imediatamente antes de criar o agendamento.

## Justificativa

A segunda validação reduz o risco de utilizar informações desatualizadas.

## Alternativas consideradas

### Validar apenas ao listar horários

Seria mais simples, porém permitiria que dois usuários escolhessem o mesmo horário em momentos próximos.

### Bloqueio transacional no backend

Seria a solução correta para produção, mas não está disponível no JSON Server.

## Consequências positivas

- reduz conflitos no fluxo normal;
- melhora a experiência do usuário;
- prepara a lógica para futura validação no backend.

## Consequências negativas

- não elimina totalmente condições de corrida;
- a regra ainda é executada no frontend;
- não substitui transações ou restrições de banco de dados.

---

# ADR-016 — Separar área do cliente e área administrativa por layouts

## Status

Aceito

## Contexto

Clientes e gestores possuem objetivos e interfaces diferentes.

O cliente precisa de um fluxo simples e direto de agendamento. O gestor precisa de navegação entre cadastros, agenda e histórico.

## Decisão

Criar layouts separados:

```text
ClientLayout
AdminLayout
```

## Justificativa

A separação permite menus, cabeçalhos e estilos específicos para cada perfil.

## Alternativas consideradas

### Um único layout para toda a aplicação

Reduziria arquivos, mas criaria condicionais e uma interface menos clara.

## Consequências positivas

- experiência adequada para cada perfil;
- componentes de navegação separados;
- melhor organização das rotas;
- facilidade para adicionar proteção administrativa futuramente.

## Consequências negativas

- existe alguma duplicação visual;
- exige configuração de rotas aninhadas;
- a separação é visual, não uma proteção de segurança.

---

# ADR-017 — Não implementar autenticação real no protótipo

## Status

Aceito para o protótipo

## Contexto

O objetivo atual é demonstrar os fluxos de agendamento e gestão.

Autenticação real exigiria backend, armazenamento seguro de senhas, sessões, tokens e controle de autorização.

## Decisão

Utilizar identificação simplificada para clientes e acesso demonstrativo ao painel administrativo.

## Justificativa

Essa abordagem mantém o foco nas funcionalidades centrais do produto.

## Alternativas consideradas

### Autenticação com JWT

Seria apropriada para uma aplicação real, mas depende de backend próprio.

### Serviço externo de autenticação

Reduziria parte do desenvolvimento, porém adicionaria configuração e dependência externa.

## Consequências positivas

- menor escopo;
- desenvolvimento mais rápido;
- foco nas funcionalidades principais.

## Consequências negativas

- qualquer pessoa pode acessar a área administrativa;
- a identidade do cliente não é confiável;
- o sistema não pode ser utilizado em produção;
- autenticação precisará ser implementada futuramente.

---

# ADR-018 — Preparar a arquitetura para substituição futura do JSON Server

## Status

Aceito

## Contexto

O JSON Server será utilizado apenas no protótipo. Em uma evolução, será necessário utilizar backend e banco de dados reais.

Se os componentes acessarem diretamente o JSON Server, a migração exigirá alterações em toda a aplicação.

## Decisão

Centralizar todas as chamadas HTTP na camada `services`.

## Exemplo

```text
services/
├── api.js
├── clientService.js
├── professionalService.js
├── serviceService.js
└── appointmentService.js
```

## Justificativa

A camada de serviços cria uma abstração entre a interface e a fonte de dados.

## Alternativas consideradas

### Realizar requisições diretamente nos componentes

Seria mais rápido inicialmente, mas aumentaria o acoplamento.

## Consequências positivas

- substituição mais simples do backend;
- componentes não conhecem detalhes dos endpoints;
- tratamento de erros centralizável;
- código mais reutilizável.

## Consequências negativas

- adiciona uma camada ao projeto;
- exige padronização dos retornos;
- mudanças grandes de contrato ainda exigirão ajustes.

---

# ADR-019 — Evolução futura para backend Node.js e PostgreSQL

## Status

Proposto

## Contexto

O protótipo utiliza JSON Server, que não é adequado para produção.

Uma versão real precisará de autenticação, validação no servidor, controle de concorrência, persistência robusta e segurança.

## Decisão proposta

Evoluir futuramente para a seguinte arquitetura:

```text
Frontend React
      ↓
API REST
      ↓
Backend Node.js
      ↓
PostgreSQL
```

## Justificativa

Essa arquitetura permitirá:

- validação no servidor;
- transações;
- restrições de integridade;
- autenticação e autorização;
- suporte a múltiplos usuários;
- maior segurança;
- relatórios e consultas mais robustos.

## Alternativas consideradas

### Firebase ou Supabase

Poderiam acelerar o desenvolvimento e fornecer autenticação e persistência, mas aumentariam a dependência de uma plataforma externa.

### Backend em outra linguagem

Também seria possível, mas Node.js manteria JavaScript em toda a aplicação.

## Consequências positivas

- solução adequada para produção;
- maior consistência dos dados;
- melhor controle de segurança;
- suporte a crescimento.

## Consequências negativas

- aumento significativo da complexidade;
- necessidade de deploy de backend e banco;
- maior esforço de manutenção;
- necessidade de migração dos dados do protótipo.

---

# ADR-020 — Manter os ADRs versionados junto ao código

## Status

Aceito

## Contexto

As decisões arquiteturais podem mudar durante o desenvolvimento. Sem registro, o grupo pode perder o motivo de uma escolha ou repetir discussões já realizadas.

## Decisão

Armazenar este documento no repositório do projeto e atualizá-lo sempre que uma decisão importante for criada, substituída ou rejeitada.

## Organização sugerida

Para o protótipo, os ADRs permanecerão neste arquivo único:

```text
docs/ADR.md
```

Caso o número de decisões cresça, cada ADR poderá ser separado:

```text
docs/adr/
├── 001-react.md
├── 002-vite.md
├── 003-javascript.md
└── ...
```

## Justificativa

O versionamento permite acompanhar quando e por que as decisões foram alteradas.

## Consequências positivas

- histórico arquitetural;
- maior clareza para o grupo;
- melhor contexto para ferramentas de IA;
- facilidade de revisão;
- redução de decisões contraditórias.

## Consequências negativas

- exige manutenção contínua;
- documentos desatualizados podem gerar confusão;
- alterações técnicas relevantes precisam incluir atualização do ADR.

---

# Resumo das decisões

| ADR | Decisão | Status |
|---|---|---|
| ADR-001 | Utilizar React no frontend | Aceito |
| ADR-002 | Utilizar Vite | Aceito |
| ADR-003 | Desenvolver em JavaScript | Aceito |
| ADR-004 | Adotar arquitetura frontend em camadas | Aceito |
| ADR-005 | Utilizar React Router | Aceito |
| ADR-006 | Utilizar JSON Server | Aceito para o protótipo |
| ADR-007 | Utilizar Axios | Aceito |
| ADR-008 | Utilizar React Hook Form | Aceito |
| ADR-009 | Utilizar date-fns | Aceito |
| ADR-010 | Utilizar Context API para o cliente atual | Aceito |
| ADR-011 | Manter regras fora dos componentes | Aceito |
| ADR-012 | Utilizar cancelamento lógico | Aceito |
| ADR-013 | Armazenar preço e horário final no agendamento | Aceito |
| ADR-014 | Gerar horários a cada 30 minutos | Aceito para o protótipo |
| ADR-015 | Validar disponibilidade duas vezes | Aceito |
| ADR-016 | Separar layouts do cliente e administrativo | Aceito |
| ADR-017 | Não implementar autenticação real | Aceito para o protótipo |
| ADR-018 | Abstrair acesso aos dados com services | Aceito |
| ADR-019 | Evoluir para Node.js e PostgreSQL | Proposto |
| ADR-020 | Versionar os ADRs junto ao projeto | Aceito |

---

# Critério para novos ADRs

Uma nova decisão deve ser registrada quando:

- alterar a arquitetura;
- adicionar uma dependência central;
- mudar a estratégia de persistência;
- modificar contratos entre camadas;
- introduzir autenticação ou autorização;
- alterar a organização principal do projeto;
- substituir uma decisão registrada;
- causar impacto relevante na manutenção ou evolução do sistema.

Cada nova decisão deve informar:

1. status;
2. contexto;
3. decisão;
4. justificativa;
5. alternativas consideradas;
6. consequências positivas;
7. consequências negativas.
