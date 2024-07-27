# Dev Donald

# 1º - Iniciamos o projeto Dev Donald
- Criamos a base 
    npm init -y

- Instalamos o express com yarn
    yarn add express

# 2º - Instalando Nodemon e Sucrase
- Instalar nodemon como desenvolvimento
    yarn add nodemon -D

- Trocamos no pack.json o "main" para : 
    - "main": "src/server.js"

- Trocamos o "script" de "test" para "dev"
    - "dev": "nodemon"

- Instalar o Sucrase para o node entender o "import" e "export"
    - yarn add sucrase -D

- Depois damos o comando:
    yarn sucrase-node src/server.js

# 3º - Eslint + Prettier
- Instalar o eslint como desenvolvimento
    yarn add eslint -D

- Configurar o eslint
    yarn eslint --init

# 4º - Padrão de Arquitetura MVC - Model , View , Controller

# 5º - Docker + PostgresSQL = Banco de dados para persistir nossos dados
- Criar nosso primeiro Container
    docker run --name devdonald-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
    para verificar se deu tudo certo damos o comando : docker ps

- Para visualizarmos a interface usando o Beekeper Studio
    user: postgres
    password: postgres

- Dentro do Beekeper criamos o primeiro banco
    - devdonald

# 6º - SQL/Sequelize = linguagem utilizada para lider com o banco de dados relacional (baseado em tabelas)
- Instalar o Sequelize:
    yarn add sequelize pg pg-hstore

- Instalar o Sequelize-cli para ajudar usar o sequelize, como desenvolvimento:
    yarn add -D sequelize-cli

- Criar na raiz do projeto o arquivo '.sequelizerc' e configurar...

- e no arquivo 'database.js' em 'config' configuramos tambem...

# 7º - Primeira Migration - Usuários
- Criando a primeira Migration
    yarn sequelize migration:create --name create-users-table
    e configuramos...

- Rodando a Migration
    yarn sequelize db:migrate

- Caso dê algum erro, para desfazer a migration usamos o ' ':undo' desfaz a ultima migrate criada, e o ':undo:all' desfaz tudo
    yarn sequelize db:migrate:undo
                //
    yarn sequelize db:migrate:undo:all

# 8º - Primeiro Model - Usuários
- Criando o primeiro Model
    criamos o arquivo 'User.js' na pasta 'model' e configuramos...

# 9º - Configuração do Model de Usuário e Instalando o UUID
- Configurar a conexão do model com o banco de dados
    no arquivo 'index.js' da pasta 'database' vamos configurar a conexão

- Configurado a conexão com o banco, importamos ela no nosso 'app.js'
    import './database'

- Instalar o UUID
    yarn add uuid

- Usar nas nossas rotas pra testar a conexão, mandando um id aleatório com o UUID
    id: v4(),
    name: 'Brendon',
    email: "brendon@email.com",
    password_hash: '123456'

# 10º - Criando Controller de Usuário
- Criar nosso primeiro Controller
    na pasta 'controllers' criamos o arquivo 'UserController.js'

- Para simular nosso 'Frontend' vou utilizar o HTTPie

# 11º - Validando dados com o Yup - Biblioteca pra validar dados
- Instalar o Yup
    yarn add yup

- Vamos utiliza-lo no 'UserController'
    import * as Yup from 'yup'

- E criar uma validação de erros pra não quebrar o código

# 12º - Validando email Duplicado
- Configurar no nosos 'UserController' se já existe um usuário criado com o mesmo email, não permitindo quebrar a aplicação

# 13º - Criando Hash de senha usando a Biblioteca Bcrypt = Criptografia
- Estamos até o momento salvando os dados de senha como : password_hash, e não é a melhor forma segura pro o usuário,
Então vamos crirar um Hash de senha.

- Vamos instalar o Bcrypt
    yarn add bcrypt

- E fazemos essa criptografia no 'models' / 'User.js'

- E alteramos na aplicação o 'password_hash' para apenas 'password'

# 14ª - Controller login de usuário
- Criamos o arquivo SessionController

- Criar a nossa rota de login
    routes.post('/session', SessionController.store)

- Testamos a rota usando o HTTPIE
    com o GET no caso

# 15º - Migration de Produtos
- Criar nossa migration de produtos
    yarn sequelize migration:create --name create-products-table

- E rodamos a migrate
    yarn sequelize db:migrate

# 16º - Criando Controller de Produtos
- Criamos o arquivo 'ProductController.js'

- Depois criamos nossa rota de criação de produto
    routes.post('/products', ProductController.store)

- E testamos no HTTPIE
    no método POST