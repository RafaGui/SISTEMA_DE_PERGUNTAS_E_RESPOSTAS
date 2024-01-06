const Sequelize = require("sequelize");
const connection = require("./database"); // AQUI FOI FEITA A CONEXÃO COM O BANCO DE DADOS

const Pergunta = connection.define('perguntas', {
    title:{
        type: Sequelize.STRING,
        allowNull: false // IMPOSSIBILITA QUE OS CAMPOS FIQUEM VAZIOS NO BANCO DE DADOS
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;