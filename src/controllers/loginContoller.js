exports.loginPage = (req, res) => {
    res.render('login')
}

exports.login = (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const model = require('../models/loginModel');
    const validation = new model.login(nome, senha);
    const errors = validation.login();
    errors.then(response => {
        if(!response[0]) {
            req.flash('success', "Login efetuado com sucesso!");
            req.flash('errors', '');
        } else {
            req.flash('errors', response[1]);
        }
        req.session.save(function () {
            res.redirect('/login')
        })
    })
}

exports.signUp = (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const model = require('../models/loginModel');
    const validation = new model.login(nome, senha);
    const errors = validation.register(req)
    errors.then(response => {
        if (!response[0]) {
            req.flash('success', 'Registro efetuado com sucesso!');
            req.flash('errors', '');
        } else {
            req.flash('errors', response[1]);
        }
        req.session.save(function () {
            res.redirect('/login')
        })
    })


}