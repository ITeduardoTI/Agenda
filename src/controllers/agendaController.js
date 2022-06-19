exports.novoItem = async (req, res) => {
    const databaseModel = require('../models/databaseModel');
    const telefone = req.params.id
    let register;
    if (telefone) {

        register = await databaseModel.getData({ dbName: 'agenda', docName: telefone })
        res.render('novoItem', { register: { ...register } })
    } else {
        res.render('novoItem', { register: {} })

    }
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
        if (errors[1]) {
            req.flash('success', errors[1]);
            req.flash('errors', '');
            req.session.save(function () {
                res.redirect('/')
            })
        } else {
            req.flash('success', 'registro incluido com sucesso');
            req.flash('error', '');
            req.session.save(function () {
                res.redirect('/')
            })
        }

    } else {
        req.flash('errors', errors[1]);
        req.session.save(function () {
            res.redirect('/novoItem')
        })
    }

}

exports.deleteItem = async (req, res) => {
    const databaseModel = require('../models/databaseModel');
    const telefone = req.params.id
    if (telefone) {
        await databaseModel.deleteItem('agenda', telefone)
        req.flash('success', 'Registro deletado com sucesso');
        req.session.save(function () {
            res.redirect('/')
        })
    } else {
        res.redirect('/error404')
    }
}