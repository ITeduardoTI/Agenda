exports.novoItem = (req, res) => {
    res.render('novoItem')
}

exports.novoItemPost = async (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const telefone = req.body.telefone

    const agendaModel = require('../models/agendaModel');
    const registerItem = new agendaModel.agendaModel(nome, sobrenome, email, telefone);
    const errors = await registerItem.newItem()

    if (!errors[0]) {
        req.flash('success', 'registro incluido com sucesso');
        req.flash('error', '');
        req.session.save(function () {
            res.redirect('/')
        })
    } else {
        req.flash('errors', errors[1]);
        req.session.save(function () {
            res.redirect('/novoItem')
        })
    }

}