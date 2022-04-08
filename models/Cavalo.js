//caminho da conexão com o banco
const db = require('../db/db');

//nome da tabela dentro do banco de dados = alunos e dentro das chaves coloco as colunas ou cadastros
//sequelize = conexão com o banco, Sequelize = sequelize mesmo
//Sequelize é um ORM(Object-Relational Mapper) para NodeJs: serve para relacionar o banco e o NodeJS
const Cavalo = db.sequelize.define('cavalos', {
    baia: {
        type: db.Sequelize.STRING, //orm faz a criação do campo nome
    }, 
    nome: {
        type: db.Sequelize.STRING, //orm faz a criação do campo nome
    },
    nroRegistro: {
        type: db.Sequelize.STRING,
    },
    pelagem: {
        type: db.Sequelize.STRING,
    },
    raca: {
        type: db.Sequelize.STRING,
    },
    sexo: {
        type: db.Sequelize.STRING,
    },
    dataNasc: {
        type: db.Sequelize.STRING,
    },
    raca: {
        type: db.Sequelize.STRING,
    },
    nomePai: {
        type: db.Sequelize.STRING,
    },
    nomeMae: {
        type: db.Sequelize.STRING,
    },
    proprietario: {
        type: db.Sequelize.STRING,
    },
    cpf: {
        type: db.Sequelize.STRING,
    },
    contato: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
    },
});

//cria a tabela se ela não existir
//Cavalo.sync({force: true}); //Comentar depois de criar a tabela

module.exports = Cavalo; //exporta o model