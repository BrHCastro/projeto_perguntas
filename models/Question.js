const Sequelize = require('sequelize');
const connection = require('../database/mysql');

const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false})
    .then(() => {
        console.log('Created table');
    }).catch((err) => {
        console.log(`Erro ao criar tabela: ${err}`);
    })