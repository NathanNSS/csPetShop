const Sequelize = require('sequelize');
const instanciaSeque = require('../../dataBase/index');

const colunas = {
    empresa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria:{
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}
const opcoes ={
    freezeTableName: true,
    tableName: 'fornecedores',
    timesTamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}
module.exports = instanciaSeque.define('fornecedor', colunas, opcoes);