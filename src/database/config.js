const {Sequelize} = require("sequelize");

const db = new Sequelize({
    dialect: "postgres",
    database: "motosdbgen26",
    username: "postgres",
    password: "password",
    port: 5432,
    host: "localhost",
    logging: false
})

module.exports = {db}