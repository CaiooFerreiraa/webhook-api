# Contexto do Projeto: log-api

## Descrição
Serviço de API para simulação de logs de monitoramento em uma EC2/VPS. O objetivo é receber requisições HTTP (webhooks) e logar os payloads para testar ferramentas de monitoramento e observar o comportamento da aplicação.

## Stack / Tecnologias
- Bun (Runtime)
- TypeScript
- ElysiaJS (Framework de alta performance)
- Pino (Logging premium)

## Convenções e Padrões
- Arquitetura limpa em camadas (limite de 3: routes, domain/services, infra)
- Tipagem rigorosa com TypeScript
- Logs estruturados em formato JSON (para fácil ingestão por ferramentas de monitoramento)

## Notas Importantes
- O foco é a simulação de tráfego real.
- Deve ser performático para rodar com baixo consumo de recursos na EC2.

---

## Banco de Dados

### Banco
N/A (logs serão salvos em arquivo/stdout)

### ORM / Query Builder
N/A

### Convenções de Migration
N/A

### Estrutura Principal
N/A

### Notas de Banco
N/A

---

## Design

### Design System
N/A (Backend API)

---

## Histórico Visual
N/A

---

## Histórico de Decisões
- [2026-03-31] Criação do Projeto — Definição do uso de Bun + ElysiaJS para máxima performance e logs estruturados com Pino.
- [2026-03-31] Implementação do Webhook — Captura dinâmica de todas as rotas e métodos HTTP, logando body, headers e IP conforme solicitado. Dockerfile e Docker Compose sincronizados (incluindo expose: 3000) com os padrões para deploy na EC2.
