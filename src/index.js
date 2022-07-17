const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const appRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const linksRoute = require('./routes/links');
const { database } = require('./keys');

// Initialization
const app = express();
require('./lib/passport');

// Settings
const Port = process.env.PORT || 4000
app.set('views', path.join(__dirname, 'views'))  // __dirname devuelve la direccion del archivo que se esta ejecutando (src) - Aca le digo a node que la carpeta views esta en src/views
app.engine('hbs', engine({
    defaultlayout: 'main',
    layoutDir: path.join(app.get('views'), 'layout'),  // views/layout
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middleware
app.use(session({
    secret: 'jedolceweb',
    resave: false,
    saveUninitialized: false,
    store: MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));     // Para aceptar datos de formualrio del usuario - extended: false porque son datos sencillos
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(appRoute);
app.use('/auth', authRoute);
app.use('/links', linksRoute);

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Server Start
app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
});
