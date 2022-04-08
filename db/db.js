//módulo de conexão
//aqui trabalha de fato com o sequelize
const Sequelize = require('sequelize');
//passa as informações para o banco: nome do banco, usuário do banco, password
const sequelize = new Sequelize('expresshandlebars', 'postgres', '05091989', {
    host: 'localhost',
    dialect: 'postgres',
});

//conexão com o banco
sequelize.authenticate().then(() => {
    console.log("conectado ao banco de dados com sucesso.");
}).catch((error) => {
    console.log(`erro ao conectar ao banco: ${error}`);
});

//exporta as duas variáveis
module.exports = {
    Sequelize: Sequelize, //orm
    sequelize: sequelize, //conexão com o banco
}