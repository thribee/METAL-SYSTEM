# METAL SYSTEM — Projeto Integrador

Sistema web de gerenciamento de uma serralheria, com frontend em **HTML, CSS e JavaScript** e backend em **Java 21, Spring Boot 3.5.7 e Maven**.

## Componentes

- `MetalSystem/`: interfaces e JavaScript; cliente HTTP em `js/api.js`.
- `backend/`: aplicação Spring Boot REST, com controllers, services, repositories, entities e DTOs.
- Banco de desenvolvimento: **H2 persistente**, perfil `demo` (não requer MySQL).
- Banco definitivo: **MySQL**, modelagem e migrações a alinhar com o integrante responsável pelo banco.
- `db/init/`: SQL legado de referência; **não é um esquema completo** do backend atual.

## Executar localmente

1. Instale Java 21 e abra `backend/` como projeto Maven no IntelliJ IDEA.
2. Em Run > Edit Configurations > BackendApplication, adicione **Program arguments**: `--spring.profiles.active=demo`.
3. Inicie `BackendApplication`; confira `http://localhost:8080/api/status`.
4. Abra `MetalSystem/inicio.html` via Live Server (VS Code). As telas acessam `http://localhost:8080/api`.
5. Cadastre dados de teste. No perfil `demo`, o H2 guarda dados no diretório `backend/data/`.

## Módulos

- Clientes: CRUD via `/api/clientes`.
- Orçamentos: CRUD via `/api/orcamentos`; orçamento aprovado pode gerar **uma** conta a receber.
- Financeiro: contas a pagar/receber, vencimentos, pagamentos parciais, estornos e cancelamento com restrições.
- Telas **Entradas e Saídas** e **Despesas**: usam `/api/financeiro/contas` e `/api/financeiro/contas/{id}/pagamentos`.
- Tela **Relatórios**: usa `/api/financeiro/relatorio` e permite exportação CSV.
- Início: exibe resumo do fluxo de caixa via API financeira e contagem de clientes.
- Documentos: CRUD inicial via `/api/documentos`.
- Estoque: API inicial em `/api/estoque/produtos`, interface específica pendente.

**Atenção:** as rotas legadas `/api/despesas`, `/api/movimentacoes` e `/api/dashboard` continuam disponíveis para compatibilidade, mas **não são agregadas** às contas financeiras V5/V6. Evite lançamentos duplicados em ambos os conjuntos.

## Regras financeiras

- Conta `RECEBER` ou `PAGAR`, com descrição, valor positivo, categoria e vencimento.
- Pagamentos/recebimentos podem ser parciais, com data, valor e forma; não podem exceder o saldo.
- Situação calculada: `PENDENTE`, `PARCIAL`, `ATRASADA`, `PAGA` ou `CANCELADA`.
- Não é possível cancelar conta com pagamentos, nem alterar diretamente conta vinculada a orçamento.
- Orçamento aprovado gera conta a receber por ação explícita; o backend impede geração duplicada.
- Relatórios consideram pagamentos pela **data do pagamento**, previsões e pendências pelo **vencimento**. Saldo de caixa **não é lucro contábil**.
- Estorno exclui pagamento no protótipo acadêmico; um sistema de produção precisa de auditoria imutável.

## Banco MySQL definitivo

O perfil padrão usa variáveis `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`, com `ddl-auto=validate`. Não execute contra o banco definitivo antes de alinhar as tabelas e migrations com o responsável. Nunca inclua senhas no repositório ou ZIP.

## Limitações e validação

O projeto ainda precisa de autenticação e autorização reais, auditoria, conciliação bancária, impostos e regras de lucro por competência. As integrações precisam ser compiladas e testadas no ambiente da equipe. Este pacote não representa um sistema validado para produção.

Consulte `FINANCEIRO_V5.md`, `INTEGRACAO_FINANCEIRO_V6.md` e `backend/README.md` para detalhes técnicos.


## Atualização V7
Consulte [IMPLEMENTACAO_V7.md](IMPLEMENTACAO_V7.md) para autenticação Spring Security, estoque e itens de orçamento com H2.


## Frontend V8 — Telas de gestão

O frontend usa HTML, CSS e JavaScript e consome as APIs REST do **Java 21 + Spring Boot**, sem Python/Flask.

- `MetalSystem/estoque.html`: materiais, alterações, entradas e saídas, histórico e alerta de quantidade baixa.
- `MetalSystem/orcamentos-detalhes.html`: consulta de orçamentos, inclusão e remoção de itens com total calculado pelo backend.
- `MetalSystem/usuarios.html`: listagem, cadastro e edição de usuários, com acesso restrito a ADMIN.
- As demais páginas mantêm suas integrações anteriores.

**Execução:** iniciar `backend` com `--spring.profiles.active=demo` e `APP_DEMO_ADMIN_PASSWORD` definido, depois abrir `MetalSystem/index.html` pelo Live Server na porta 5500 e entrar com `admin`. Banco H2 temporário; o MySQL definitivo será integrado posteriormente.

**Atenção:** esta atualização modifica somente o frontend e a documentação; não muda contratos do backend V7. Autenticação HTTP Basic com `sessionStorage` é adequada somente para demonstração local, não para produção.


## Correção do login — V8.1

As páginas `MetalSystem/index.html` e `MetalSystem/inicio.html` foram atualizadas.
O login agora utiliza `POST`? **Não**: a autenticação implementada no backend V7 é HTTP Basic, validada por `GET /api/auth/me`.
Abra o backend com `--spring.profiles.active=demo` e defina `APP_DEMO_ADMIN_PASSWORD` (mínimo de oito caracteres) na configuração de execução.
Abra `MetalSystem/index.html` pelo Live Server (porta 5500) e entre com `admin` e a senha definida.
Se o navegador mantiver uma versão antiga da página, use Ctrl+Shift+R.
O token Basic fica em `sessionStorage` somente para a sessão do navegador; este mecanismo é **apenas para desenvolvimento local**. Antes da publicação, substitua por autenticação segura com HTTPS, sessão ou tokens adequados e proteção contra ataques.


## V9 — Interface e funcionalidades finais (H2)

- Páginas **Usuários**, **Estoque** e **Itens de Orçamento** removidas do frontend e dos menus, a pedido da equipe. As APIs e entidades correspondentes permanecem no Spring Boot para compatibilidade.
- Documentos permitem anexar e baixar PDF, JPG ou PNG (até 5 MB). Arquivos são armazenados em `backend/data/anexos` quando o backend é iniciado a partir da pasta `backend`; faça backup dessa pasta e do arquivo H2 juntos.
- Relatórios: botão **Exportar PDF (imprimir)** utiliza o recurso de impressão do navegador (selecione *Salvar como PDF*). Não é uma geração de PDF pelo servidor.
- Executar `BackendApplication` com `--spring.profiles.active=demo` e variável `APP_DEMO_ADMIN_PASSWORD` configurada.
- Login atual utiliza HTTP Basic e `sessionStorage`, **apenas para desenvolvimento local**; não publicar na internet sem revisar autenticação, CORS, CSRF, TLS e controle de permissões.
- O MySQL definitivo ainda depende do modelo de banco do outro integrante.
- Esta versão requer compilação e testes integrados no ambiente local antes da entrega.
