const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');

//server set-up
const app = express();
const PORT = process.env.PORT || 3001;

//helpers importing
const helpers = require('./utils/helpers');

//importing handlebars templating engine
const exphbs = require('express-handlebars')
const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting stylesheets
app.use(express.static(path.join(__dirname, 'public')));

//user sessions set-up
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//turn on routes
app.use(require('./controllers'));

//turn on connection to db and server
//force:true re-creates tables. Drops and re-establish 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});