# CHECKPOINT — METAL SYSTEM
Data do registro: 01/11/2026
Objetivo: permitir retomar o trabalho e repassar o progresso ao Felipe.

## 1. Estado atual (confirmado por capturas)
[OK] Docker instalado e MySQL 8.4 em contêiner metalsystem-db, status healthy.
[OK] docker-compose.yml criado e validado anteriormente.
[OK] Banco metalsystem e tabela clientes existentes.
[OK] Estrutura da tabela clientes conferida.
[OK] INSERT de cliente fictício e SELECT * FROM clientes executados com sucesso.
[OK] Python 3.14.2 e pip disponíveis no Codespaces.
[OK] Ambiente virtual backend/.venv criado e ativado.
[OK] Dependências Flask, mysql-connector-python e python-dotenv instaladas.
[OK] backend/app.py criado com rota GET /api/status.
[OK] API respondeu HTTP 200 com status online no navegador e via curl.
[OK] backend/database.py criado; conexão Python–MySQL testada com sucesso.
[OK] .gitignore configurado; .env e backend/.venv ignorados no teste git check-ignore.
[EM ABERTO] Commit e push dos cinco arquivos preparados ainda não comprovados.
[EM ABERTO] README e checkpoint não estavam versionados nas capturas.
[EM ABERTO] Integração HTML–API e CRUD de clientes ainda não demonstrados.

## 2. Arquivos preparados no Git
.gitignore
backend/app.py
backend/database.py
db/init/01-schema.sql
docker-compose.yml

## 3. Banco de dados
Banco: metalsystem
Contêiner: metalsystem-db
MySQL: 8.4
Porta local do host: 127.0.0.1:3306 (mapeada à 3306 do contêiner)
Tabela clientes:
- id: INT, chave primária, auto_increment
- nome: VARCHAR(100), obrigatório
- email: VARCHAR(150), opcional
- telefone: VARCHAR(20), opcional
- idade: INT, opcional
- endereco: VARCHAR(255), opcional
- criado_em: TIMESTAMP, valor padrão CURRENT_TIMESTAMP

Um registro fictício foi inserido para teste. Não assumir que o banco está vazio.

## 4. API e Python
Arquivo: backend/app.py
Rota: GET /api/status
Resposta observada: {"mensagem":"API Flask funcionando!","sistema":"METAL SYSTEM","status":"online"}
Porta Flask: 5000
Arquivo de conexão: backend/database.py
Conexão via mysql.connector, variáveis DB_NAME, DB_USER, DB_PASSWORD carregadas de .env.
Teste de conexão executado com sucesso.
A rota / não foi implementada na versão observada: HTTP 404 na raiz era esperado. A rota /api/status funcionou.

## 5. Comandos úteis (na raiz do repositório)
Ver contêiner:
  docker compose ps

Ver arquivos preparados:
  git status --short
  git diff --cached

Confirmar que arquivos sensíveis estão ignorados:
  git check-ignore .env backend/.venv/

Ativar ambiente Python:
  source backend/.venv/bin/activate

Executar API de desenvolvimento:
  python backend/app.py

Testar API em outro terminal:
  curl -i http://127.0.0.1:5000/api/status

Testar conexão com o banco (sem colocar senha no comando):
  python -c 'from backend.database import conectar; c = conectar(); print("Conexao MySQL OK"); c.close()'

Depois de revisar o diff e confirmar ausência de segredos:
  git commit -m "Configura MySQL Docker e backend Flask inicial"
  git push origin main

## 6. Segurança
- Nunca colar ou enviar senhas do .env.
- Verificar arquivos staged antes de commit/push.
- As portas 3306 e 5000 estavam encaminhadas como privadas no Codespaces.
- O Flask usa debug=True no desenvolvimento; desativar antes de produção.
- Se uma senha já foi exposta em imagem, histórico ou commit, trocá-la.

## 7. Divisão de trabalho a combinar com Felipe
Sugestão, ainda não confirmada:
- Responsável pela infraestrutura: Docker, configuração MySQL, conexão e rota de status.
- Felipe: finalizar modelagem das tabelas e implementação de endpoints do backend, conforme combinado entre vocês.
- Trabalho conjunto: integrar telas HTML, testar CRUD, corrigir bugs e revisar segurança.

Mensagem de passagem: "A infraestrutura básica já está funcional: MySQL healthy, tabela clientes testada, API Flask /api/status respondendo 200 e conexão Python–MySQL funcionando. Precisamos alinhar as próximas tabelas, os endpoints e a integração das telas. Consulte este checkpoint antes de alterar a estrutura do banco."

## 8. Próxima sessão — ordem sugerida
1. Confirmar git status e se commit/push foram concluídos.
2. Adicionar README e CHECKPOINT ao repositório.
3. Revisar modelagem com Felipe antes de ampliar 01-schema.sql.
4. Definir contratos da API (rotas, campos, códigos HTTP).
5. Implementar e testar CRUD de clientes.
6. Integrar clientes.html à API.
7. Repetir o processo por módulo.
8. Preparar testes, autenticação e implantação privada.

## 9. Observação sobre inicialização SQL
O diretório db/init/ do MySQL normalmente executa scripts de inicialização apenas quando o volume de dados está vazio. Editar 01-schema.sql depois da primeira inicialização não altera automaticamente tabelas existentes. Para evoluir o banco, usar migrações SQL planejadas; não apagar o volume sem backup.
