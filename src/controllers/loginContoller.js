exports.loginPage = (req, res) => {
    if (!req.session.user) {
        res.render('login')
    } else {
        res.locals.success = "Você já está logado"
        res.render('ja-logado')
    }
}

exports.login = (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const model = require('../models/loginModel');
    const validation = new model.login(nome, senha);
    const errors = validation.login(res);
    errors.then(response => {
        if (!response[0]) {
            req.session.user = { user: nome }
            req.flash('success', "Login efetuado com sucesso!");
            req.flash('errors', '');
            req.session.save(function () {
                res.redirect('/')
            })
        } else {
            req.flash('errors', response[1]);
            req.session.save(function () {
                res.redirect('/login')
            })
        }

    })

}

exports.signUp = (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const model = require('../models/loginModel');
    const validation = new model.login(nome, senha);
    const errors = validation.register(res)
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

exports.logOut = (req, res) => {
    const model = require('../models/loginModel');
    req.session.destroy(() => {
        res.redirect('/')
    })
}