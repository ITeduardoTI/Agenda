exports.loginPage = (req, res) => {
    res.render('login')
}

exports.login = (req, res) => {

}

exports.signUp = (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const model = require('../models/loginModel');
    const validation = new model.login(nome, senha);
    const haveNoErrors = validation.register(req)

    if (!haveNoErrors) {
        req.flash('success', 'Login efetuado com sucesso!');
    }
    req.session.save(function () {
        res.redirect('/login')
    })
}