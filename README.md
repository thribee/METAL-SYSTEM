# METAL SYSTEM

Sistema web de gestão para serralheria — Projeto Integrador.

## Objetivo
Desenvolver um sistema para apoiar o controle de clientes, gastos, estoque, entradas, saídas e atividades administrativas de uma serralheria.

## Identidade visual
Paleta cinza e laranja. Interface com poucos ícones, cartões de cantos mais quadrados, dashboard centralizado e fontes legíveis, conforme orientações de revisão do protótipo.

## Tecnologias
- Frontend: HTML, CSS e JavaScript (páginas já existentes no repositório).
- Backend: Python e Flask.
- Banco de dados: MySQL 8.4.
- Infraestrutura local: Docker Compose.
- Desenvolvimento: VS Code / GitHub Codespaces e Git.

## Estrutura identificada nas capturas
METAL-SYSTEM/
  .gitignore
  .env                         (privado; NÃO enviar ao Git)
  docker-compose.yml
  README.md                    (já existe; conteúdo não revisado)
  backend/
    app.py                     (rota GET /api/status)
    database.py                (função conectar ao MySQL)
    .venv/                     (ambiente Python; NÃO enviar ao Git)
  db/init/
    01-schema.sql              (tabela clientes)
  MetalSystem/
    css/
    img/
    js/
    clientes.html
    despesas.html
    documentos.html
    entradas_saidas.html
    index.html
    inicio.html
    orcamentos.html
    relatorio.html

## Funcionalidades planejadas
- Autenticação e controle de acesso.
- Painel inicial com indicadores.
- Cadastro, consulta, edição e exclusão de clientes.
- Estoque e movimentações.
- Entradas, saídas e despesas.
- Orçamentos, pedidos e documentos/notas fiscais.
- Relatórios e acompanhamento financeiro.
- Outras telas previstas no projeto, como salários, conforme priorização da equipe.

IMPORTANTE: a existência de uma página HTML não comprova que sua funcionalidade esteja conectada ao banco.

## Progresso comprovado por testes
- Docker Compose iniciou o MySQL; o contêiner apareceu como healthy.
- Banco metalsystem acessado com usuário de aplicação.
- Tabela clientes criada e conferida com SHOW TABLES e DESCRIBE.
- INSERT e SELECT de um cliente fictício executados com sucesso.
- Ambiente virtual Python criado e ativado.
- Flask, mysql-connector-python e python-dotenv instalados no ambiente.
- GET /api/status respondeu HTTP 200 com JSON de status online.
- Teste de conexão Python com MySQL retornou mensagem de sucesso.
- .gitignore configurado para ignorar .env, .venv e arquivos temporários.

## Próximas etapas
1. Revisar e versionar a documentação.
2. Combinar com Felipe a responsabilidade pela modelagem das demais tabelas e integração do backend.
3. Definir entidades, chaves e relacionamentos antes de criar novas tabelas.
4. Criar endpoints CRUD com validação e tratamento de erros.
5. Integrar o frontend à API e substituir dados demonstrativos por consultas reais.
6. Implementar autenticação, autorização, testes e controles de segurança.
7. Validar os fluxos completos e preparar implantação privada, sem publicar sem aprovação.

## Segurança e versionamento
- Nunca compartilhar senhas nem colocar valores reais de .env no Git.
- O .gitignore evita novos arquivos ignorados, mas não apaga segredos de commits antigos.
- Revisar git diff --cached antes de cada commit.
- Não expor a porta 3306 publicamente; manter encaminhamentos privados.
- Não usar debug=True em produção.

## Estado do repositório
Nas últimas capturas, cinco arquivos estavam preparados (staged): .gitignore, backend/app.py, backend/database.py, db/init/01-schema.sql e docker-compose.yml. Não há confirmação visual de commit ou push concluído.

## Como continuar
Consultar CHECKPOINT_METAL_SYSTEM.txt para comandos de verificação, testes já feitos e próximos passos.
