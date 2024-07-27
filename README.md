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