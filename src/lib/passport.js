const passport = require('passport');
// En este caso vamos a hacer la autenticacion local 
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    // Comprobar el usuario
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    // Encontro el usuario
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome' + user.username));
        } else {
            // Contraseña incorrecta
            done(null, false, req.flash('message', 'Invalid Password'));
        }
        // No encontro nada
    } else {
        return done(null, false, req.flash('message', 'User does not exist'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const newUser = {
        username,
        password,
        fullname: req.body.fullname
    };
    newUser.password = await helpers.encryptPassword((password));
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

// Cuando serializo, guardo el id del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Cuando deserializo tomo el id para obtener los datos
// Es async porque hago la consulta a la db
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});