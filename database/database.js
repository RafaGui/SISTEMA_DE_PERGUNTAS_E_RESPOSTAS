const Sequelize = require('sequelize');
const connection = new Sequelize('usuariosasks', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;