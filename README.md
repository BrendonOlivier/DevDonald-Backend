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

# 7º - Primeira Migration
- Criando a primeira Migration
    yarn sequelize migration:create --name create-users-table
    e configuramos...

- Rodando a Migration
    yarn sequelize db:migrate

- Caso dê algum erro, para desfazer a migration usamos o ' ':undo' desfaz a ultima migrate criada, e o ':undo:all' desfaz tudo
    yarn sequelize db:migrate:undo
                //
    yarn sequelize db:migrate:undo:all

# 