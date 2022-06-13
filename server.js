const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

//importing handlebars templating engine
const exphbs = require('express-handlebars')
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting stylesheets
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(require('./controllers'));


//turn on connection to db and server
//force:true re-creates tables. Drops and re-establish 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});