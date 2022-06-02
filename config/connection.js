//import the sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to our database,
const sequelize = new Sequelize('just_tech_news_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize