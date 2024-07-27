// Criando a conexão do nosso Model com o Banco de Dados

import Sequelize from 'sequelize'

import User from '../app/models/User'
import configDataBase from '../config/database'

const models = [User]
class Database {
    constructor() {
        this.init()
    }

    // Quando a aplicação inicia, precisamos dizer que existe conexões e relacionamentos antes da aplicação iniciar
    init() {
        this.connection = new Sequelize(configDataBase)
        models.map((model) => model.init(this.connection))
    }
}

export default new Database()