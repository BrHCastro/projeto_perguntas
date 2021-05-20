const Sequelize = require('sequelize');
const connection = require('../database/mysql');

const Answer = connection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false})
    .then(() => {
        console.log('Created table answers');
    }).catch((err) => {
        console.log(`Erro ao criar tabela answers: ${err}`);
    });

module.exports = Answer