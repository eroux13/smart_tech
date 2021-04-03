// Import Dependencies
// Path Module
const path = require('path');
// Express.js Server
const express = require('express');
// Session to hadnle cookies
const session = require('express-session');
// Express Handlebars
const exphbs = require('express-handlebars');
// Routes
const routes = require('./controllers');
// Custom helpers for Handlebars.js
const helpers = require('./utils/helpers');
// Chalk for console formatting
const chalk = require('chalk');

// Sequelize Connection
const sequelize = require('./config/connection');
// Save session so the user can stay logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// INitialize Server
const app = express();
// Port set to listen on localhost:3001 oe Heroku
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Intialize Session
const sess = {
  secret: 'Something super secret',
// Cookies set to expire in 
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// App will use Express Session for handling session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// App will parse JSON data as strings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path for static files
app.use(express.static(path.join(__dirname, 'public')));

// Express.js will use routes directory
app.use(routes);

// Connection to DB and Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(chalk.green.bold(`App now listening on ${PORT}`)));
});