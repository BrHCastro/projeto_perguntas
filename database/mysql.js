const Sequelize = require('sequelize');

const connection = new Sequelize('whats_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;