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

# 17º - Upload de imagens com Multer
- Para fazer upload de imagens iremos utilizar a biblioteca Multer, instalmos
    yarn add multer

- Criamos na pasta 'config' o arquivo
    'multer.js'

- Na raiz do projeto criar, uma pasta 
    'uploads'

- E vamos configurar o Multer

- Depois nas nossas rotas, importamos o multer
    import multer from 'multer'

- E tambem a nossa configuração do Multer
    import multerConfig from './config/multer'

- Montamos a variavel do multer
    const upload = multer(multerConfig)

- E passamos para as rotas que queremos fazer upload, exemplo na rota de criar um produto : 
    routes.post('/products', upload.single('file'), ProductController.store)

- Para testar, no HTTPIE usamos a opção 'form' e ativamos o 'Multipart' e mandamos os dados, exemplo :
    Dados     -     Value
    name            X-Bacon
    price           32
    category        Hambúrgueres
    file            hamburguer.jpg  

- E se tudo der certo, a imagem vai ser criado na pasta 'uploads'

# 18º - Model de Products - Pra conseguirmos visualizar no banco de dados
- Criamos o arquivo 'Product.js'
    e configuramos o model

- Importamos nosso model de product no 'index.js' dentro do 'database'
    import Product from '../app/models/Product'

- E passamos junto ao array de mapeamento :
    const models = [User, Product]

- Vamos agora salvar os dados no banco de dados no nosso controller de products

- Após criar o produto no banco de dados, precisamos expor tambem a imagem, por isso vamos criar um campo virtual
    no model de 'Product.js' criamos o campo virtual de url:
    url: { type: Sequelize.VIRTUAL,}

- Depois vamos criar um método 'get' para ver esses dados:
    routes.get('/products', ProductController.index)

- No ProductController criamos esse método index :

- No HTTPIE testamos essa rota de GET

- Para conseguirmos visualizar a URL direto no navegador, precisamos usar o middleware
    configuramos um novo middleware no nosso 'app.js'
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')))
    feito isso podemos visualizar url direto no navegador.

# 19º - JWT - Biblioteca de Autenticação de Token
- Primeiro instalamos o web token
    yarn add jsonwebtoken

- Usaremos ele no nosso 'SessionController' que é o nosso LOGIN onde realmente precisamos autenticar o usuário

- Usaremos o site 'MD5 Hash generator' para gerar uma senha aleatória pra por no token
    estou colocando um tempo de 5 dias de expiração pro token

- Testamos no HTTPIE fazer o login ver se vai gerar o token

- Criamos um arquivo na pasta 'config'
    auth.js

- Importamos o auth.js na nossa Session
    import authConfig from '../../config/auth'
    e passamos a config pros token

- Vamos agora passar o token de autenticação no HTTPIE :
    criamos um campo em Headers (get-list all products) Authorization
    e no 'Value' passamos   -   Bearer (o token)

- Após feito isso no HTTPIE, vamos criar uma pasta no 'src' 
    'middlewares' e o arquivo 'auth.js'
    e configuramos...

- Depois importamos ele nas nossas rotas :
    import authMiddleware from './middlewares/auth'

- Passamos nas rotas que queremos utilizar, no caso :
    routes.get('/products', authMiddleware, ProductController.index)

- Para facilitar de um novo token ser atualizado, vamos passar no HTTPIE o token no campo 'Auth' na opção 'Bearer token'

- Após configurar o auth de middlewares, vamos deixar todas nossas rotas Autenticadas :
    routes.use(authMiddleware)
    assim todas as rotas que estiverem abaixo, estarão sendo autenticadas

# 20º - Criando tabela de categorias
- Vamos criar a tabela de categorias 
    yarn sequelize migration:create --name create-categories-table

- Rodamos a migration
    yarn sequelize db:migrate

- Criar e configurar a Model de produtos
    'models' + 'Category.js'

- Importar a model de categoria no nosso index
    'database' + 'index.js'
        import Category from '../app/models/Category'
    e passar pros nosso models
        const models = [User, Product, Category]

- Criar e configurar nosso controller de categorias
    'controllers' + 'CategoryController.js'

- Criar nossa rota de categorias
    routes.post('/categories', CategoryController.store)
    routes.get('/categories', CategoryController.index)

- Agora testar se tudo deu certo no HTTPIE...

# 21º - Validando categoria repetida
- Por uma validação no nosso controller de categorias para não criar categorias repetidas
    
# 22º - Criando e excluindo campos de uma tabela
- Iremos excluir o campo 'category' da tabela de 'products' para substituir pelo campo 'category_id'
    para isso precisamos criar uma outra migartion que faça a função desejada

- Primeiro vamos criar a migration de remover o campo da tabela
    yarn sequelize migration:create --name remove-categories-column

- E rodamos a migrate
    yarn sequelize db:migrate
        com isso o campo de 'category' foi removido do banco de dados a tabela de products

- Agora criar a migration de crirar um campo em uma tabela
    yarn sequelize migration:create --name add-category-id-column

- E rodamos a migrate
    yarn sequelize db:migrate
        com isso o campo de 'category_id' foi criado no banco de dados da tabela de products

- E feito isso testamos se deu certo no banco de dados (Beekeeper)

# 23º - Criando relacionamento entre tabelas
- No nosso 'model' de Products, vamos criar esse relacionamento de Products com Category
    Apagamos a linha 'category: Sequelize.STRING,' pois não existe mais no nosso banco
    e criamos o método static...

- Vamos iniciar essa conexão de relacionamento no nosso 
    'database' + 'index.js'

# 24º - Alterando Controller de produtos
- Fazendo a alteração no código, de 'category' para 'category_id'

- E vamos testar no HTTPIE
    para testar criamos um produto novo colocando a referência, exemplo:
        criar 'Coka cola' colocando o 'category_id' e o 'id' da categoria no caso '2'

- E quando a gente for listar todos os produtos, precisamos de todas as informações do relacionamento entre as tabelas
    no caso saber da onde se trata aquela categoria (Bebidas) e não só o número da categoria '2'
    
- Para isso vamos no 'ProductController' por essa referência :
    include: [ { model: Category, as: 'category', attributes: ['id', 'name'] }]
        desse jeito vamos ter a qual Categoria é daquele produto.

# 25º - MongoDB - Bancos NoSQL - Banco não relacional
- Vamos criar a conexão com o MongoDB, irei utilizer o docker para isso

- Primeiro criamos o container
    docker run --name devdonald-mongo -p 27017:27017 -d -t mongo

- Para verificar se está rodando podemos usar o :
    docker ps
        ou 
    ir no próprio docker-desktop

- O Sequelize não conecta no MongoDB, por isso vamos criar outra conexão no nosso
    'database' + 'index.js'

- E quem vai ajudar a trabalhar com o MongoDB é o Mongoose
    primeiro instalamos :
        yarn add mongoose

- Importamos o mongoose no 'index.js'
    import mongoose from 'mongoose';

- E fazemos a conexão com o banco :
    mongo() { this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devdonald') }

# 26º - Criando Scheme de pedidos
- Criar a estrutura do nosso pedido, na pasta 'app' criamos a pasta
    'schemas'
    e o arquivo
        'Order.js'

- E configuramos...

# 27º - Controller de pedidos (Order)
- Criar nosso arquivo 
    'OrderController.js'

- Criar nossa rota de pedidos
    routes.post('/orders', OrderController.store)

- No HTTPIE igual fizemos com a variavel de rota ( {{BASE_URL}} ) podemos fazer tambem com o token
    pra cada vez que eu fizer um novo login e criar outro token, eu atualizo em todas chamadas automático

- E testamos a chamada na nossa rota pra ver se vem o name.

- Com tudo funcionando, vamos configurar no nosso controller de order para buscar os dados do Banco de dados

# 28º - Gravando pedidos no MongoDB
- Pegando todos os dados necessário do pedido do usuário no nosso controller, vamos então salvar os dados no Mongo
    const createdOrder = await Order.create(order);

- Para conseguir visualizar os dados gravados no banco do MongoDB vamos usar o 'MongoDB Compass' Desktop
    Se a url da aplicação for a padrão do Mongo : mongodb://localhost:27017
    só clicarmos em connect

# 