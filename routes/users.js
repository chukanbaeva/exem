
const express = require('express');
const router = express.Router();

const usersObj = require('../users/index');

const authentication = (req, res, next) => {
    if (req.session.auth) return next();

    res.redirect('/users/login');
};

router.get('/', (req, res) => {
    res.render('users', { title: 'You are at List of all users!', usersList: usersObj });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login/process', (req, res) => {
    if (req.body.login in usersObj){
        if (usersObj[req.body.login] === req.body.pass){
            req.session.auth = true;
            req.session.login = req.body.login;
            res.redirect('/users/profile');
        }else{
            res.redirect('/users/login');
        }
    }else{
        res.redirect('/users/login');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
});

router.get('/profile', authentication, (req, res) => {
    res.render('profile', { title: 'Welcome to your profile' });
});

module.exports = router;
