# METAL SYSTEM — checkpoint atual (Spring Boot)

- Backend: Java 21, Spring Boot 3.5.7, Maven, APIs REST na porta 8080.
- Desenvolvimento independente do MySQL: perfil `demo` com H2 persistente.
- Frontend: HTML, CSS e JavaScript; telas de clientes, orçamentos, documentos e financeiro conectadas às APIs respectivas.
- Financeiro: contas a pagar/receber, pagamentos parciais, status, relatórios e integração das telas de entradas/saídas, despesas e relatórios.
- Orçamentos aprovados: ação de geração de conta a receber (uma por orçamento).
- Banco definitivo MySQL sob responsabilidade de outro integrante; integração requer alinhamento do esquema.
- Próximas validações: Maven, execução local, CRUD, pagamentos parciais, estorno, filtros, exportação CSV e integração MySQL.
- Pendências de produção: autenticação/autorização, auditoria financeira, conciliação e fechamento contábil.

Para executar, consulte `README.md`. Não há backend em Python no projeto atual.
