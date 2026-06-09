# PRD — Sistema de Agendamento para Barbearias

## 1. Problema

Muitas barbearias e profissionais autônomos ainda realizam o controle de horários de forma manual, principalmente por meio de aplicativos de mensagens, ligações ou anotações informais. Esse processo exige que o barbeiro interrompa o atendimento para responder clientes, verificar horários disponíveis e confirmar agendamentos.

Essa forma de trabalho gera gargalos operacionais, como demora nas respostas, conflitos de agenda, esquecimentos, dificuldade para consultar horários futuros e falta de organização no histórico de atendimentos.

O problema afeta diretamente dois grupos principais: os profissionais da barbearia, que perdem tempo com tarefas administrativas, e os clientes, que precisam aguardar uma confirmação manual para conseguir marcar um horário.

A ausência de uma solução centralizada torna o processo de agendamento menos eficiente, mais sujeito a erros e dependente da disponibilidade do profissional para responder mensagens. Por isso, o sistema é necessário para organizar a agenda, reduzir falhas e permitir que os clientes realizem seus próprios agendamentos de forma simples e autônoma.

## 2. Público-alvo

O sistema é destinado a barbearias, barbeiros autônomos e clientes que desejam realizar agendamentos de forma prática.

### 2.1 Barbeiros e gestores

São os profissionais responsáveis por administrar os horários, serviços e atendimentos da barbearia. Esse público precisa de uma forma simples de visualizar a agenda, cadastrar serviços, acompanhar os agendamentos e consultar o histórico de atendimentos.

Principais necessidades:

- organizar horários disponíveis;
- evitar conflitos de agenda;
- reduzir o tempo gasto respondendo mensagens;
- visualizar os agendamentos de forma centralizada;
- acompanhar o histórico de atendimentos realizados.

### 2.2 Clientes

São as pessoas que desejam agendar serviços na barbearia sem depender de contato direto com o profissional. Esse público busca rapidez, clareza e autonomia para escolher o serviço, o profissional e o horário desejado.

Principais necessidades:

- visualizar horários disponíveis;
- escolher o profissional desejado;
- escolher o serviço desejado;
- confirmar um agendamento;
- consultar seus horários marcados;
- cancelar agendamentos futuros quando necessário.

## 3. Funcionalidades

As funcionalidades abaixo descrevem o que o sistema deve permitir que os usuários façam, sem definir detalhes técnicos de implementação.

### 3.1 Cadastro e identificação de clientes

O sistema deve permitir que o cliente se identifique de forma simples para realizar agendamentos.

#### Comportamentos esperados

- informar nome;
- informar telefone;
- acessar a área de agendamento;
- consultar seus agendamentos ativos.

### 3.2 Cadastro de profissionais

O sistema deve permitir que o gestor cadastre os profissionais que realizam atendimentos na barbearia.

#### Comportamentos esperados

- cadastrar um novo profissional;
- visualizar profissionais cadastrados;
- disponibilizar profissionais para seleção no agendamento;
- permitir que profissionais inativos não apareçam para novos agendamentos.

### 3.3 Cadastro de serviços

O sistema deve permitir que o gestor cadastre os serviços oferecidos pela barbearia.

#### Comportamentos esperados

- cadastrar o nome do serviço;
- informar o preço do serviço;
- informar a duração do serviço;
- disponibilizar serviços para seleção pelo cliente;
- impedir que serviços inativos sejam escolhidos em novos agendamentos.

### 3.4 Consulta de horários disponíveis

O sistema deve permitir que o cliente visualize apenas horários realmente disponíveis para o profissional e serviço selecionados.

#### Comportamentos esperados

- considerar o profissional escolhido;
- considerar a duração do serviço escolhido;
- ocultar horários já ocupados;
- evitar que dois clientes escolham o mesmo horário para o mesmo profissional.

### 3.5 Realização de agendamento

O sistema deve permitir que o cliente realize um novo agendamento.

#### Comportamentos esperados

- escolher profissional;
- escolher serviço;
- escolher data e horário disponíveis;
- confirmar o agendamento;
- bloquear o horário confirmado na agenda do profissional.

### 3.6 Visualização de agendamentos do cliente

O sistema deve permitir que o cliente consulte seus agendamentos ativos.

#### Comportamentos esperados

- visualizar data do agendamento;
- visualizar horário;
- visualizar serviço escolhido;
- visualizar profissional escolhido;
- diferenciar agendamentos futuros de atendimentos já realizados.

### 3.7 Cancelamento de agendamento

O sistema deve permitir que o cliente cancele agendamentos futuros.

#### Comportamentos esperados

- cancelar apenas horários futuros;
- liberar o horário cancelado para novos agendamentos;
- manter o registro do cancelamento para controle.

### 3.8 Painel administrativo da agenda

O sistema deve permitir que o barbeiro ou gestor visualize a agenda dos profissionais.

#### Comportamentos esperados

- visualizar agendamentos por profissional;
- consultar data, horário, cliente e serviço;
- acompanhar a agenda completa da barbearia;
- identificar horários livres e ocupados.

### 3.9 Histórico de atendimentos

O sistema deve permitir que o gestor consulte os atendimentos realizados.

#### Comportamentos esperados

- visualizar atendimentos passados;
- consultar cliente atendido;
- consultar profissional responsável;
- consultar serviço realizado;
- consultar valor do serviço;
- auxiliar no controle operacional e financeiro.

## 4. Fluxos

### 4.1 Fluxo de agendamento do cliente

Este fluxo descreve como o cliente realiza um novo agendamento.

1. O cliente acessa o sistema.
2. O cliente informa nome e telefone.
3. O cliente escolhe o profissional desejado.
4. O cliente escolhe o serviço desejado.
5. O sistema apresenta os horários disponíveis.
6. O cliente escolhe uma data e um horário.
7. O cliente confirma o agendamento.
8. O sistema registra o agendamento.
9. O horário escolhido deixa de aparecer como disponível para novos agendamentos.

### Resultado esperado

O cliente consegue marcar um horário sem precisar conversar diretamente com o barbeiro, e a agenda do profissional é atualizada automaticamente.

---

### 4.2 Fluxo de cancelamento de agendamento

Este fluxo descreve como o cliente cancela um agendamento futuro.

1. O cliente acessa seus agendamentos ativos.
2. O cliente seleciona o agendamento que deseja cancelar.
3. O sistema verifica se o agendamento ainda é futuro.
4. O cliente confirma o cancelamento.
5. O sistema altera o status do agendamento.
6. O horário cancelado volta a ficar disponível.

### Resultado esperado

O cliente consegue cancelar um horário futuro, e o sistema libera novamente aquele período na agenda do profissional.

---

### 4.3 Fluxo de cadastro de serviço

Este fluxo descreve como o gestor cadastra um serviço da barbearia.

1. O gestor acessa o painel administrativo.
2. O gestor escolhe a opção de cadastrar serviço.
3. O gestor informa o nome do serviço.
4. O gestor informa o preço.
5. O gestor informa a duração.
6. O gestor confirma o cadastro.
7. O serviço passa a estar disponível para novos agendamentos.

### Resultado esperado

O serviço cadastrado fica disponível para que os clientes possam selecioná-lo no momento do agendamento.

---

### 4.4 Fluxo de cadastro de profissional

Este fluxo descreve como o gestor cadastra um profissional.

1. O gestor acessa o painel administrativo.
2. O gestor escolhe a opção de cadastrar profissional.
3. O gestor informa os dados do profissional.
4. O gestor confirma o cadastro.
5. O profissional passa a aparecer como opção para agendamento.

### Resultado esperado

O profissional cadastrado fica disponível para seleção no fluxo de agendamento dos clientes.

---

### 4.5 Fluxo de consulta da agenda pelo gestor

Este fluxo descreve como o gestor acompanha os agendamentos.

1. O gestor acessa o painel administrativo.
2. O gestor abre a agenda da barbearia.
3. O sistema exibe os profissionais cadastrados.
4. O gestor seleciona um profissional ou visualiza a agenda geral.
5. O sistema apresenta os horários livres e ocupados.
6. O gestor consulta cliente, serviço, data e horário dos agendamentos.

### Resultado esperado

O gestor consegue acompanhar a agenda da barbearia de forma organizada e centralizada.

## 5. Observações do PRD

Este documento descreve apenas o produto, o problema, o público-alvo, as funcionalidades e os fluxos principais.

Não fazem parte deste PRD decisões sobre linguagem de programação, banco de dados, frameworks, infraestrutura, arquitetura ou APIs. Essas decisões devem ser tratadas em etapas posteriores, como a especificação e o plano técnico.
