
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || '3000';
const app = express();

app.use(session({
    secret: 'secretsession',
    resave: true,
    saveUninitialized: true
}));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true}) );
app.set('view engine', 'pug');

const redirectLogin = (req, res) => { res.redirect('/users/login') };
const userRouters = require('./routes/users');

app.get('/', function (req, res) {
    res.render('index', { title: "Hello" });
});

app.get('/login', redirectLogin);

app.get('/logout', redirectLogin);

app.use('/users', userRouters);

app.use(function(req, res, next){
    if (req.session.auth)
        next();
    else
        res.redirect('/users/login');

    res.render('404', { title: "404. Not Found!" });
});


app.listen(PORT);
console.log(`app running at http://localhost:${PORT}`);