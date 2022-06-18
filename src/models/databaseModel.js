const database = require('../../database');
const users = database.collection('users');
const bcriptjs = require('bcryptjs');

exports.findName = (nome) => {
    const oneUser = users.doc(nome).get()
        .then(user => {
            if (user.data()) {
                return true
            } else {
                return false
            }
        })
    return oneUser

}

exports.getData = (name, field) => {
    const dados = users.doc(name).get(field)
    .then(response => {
        return response.data()
    })
    return dados
}

exports.query = (query) => {
    const dados = users.where(query[0], query[1], query[2]).get()
        .then(response => {
            const listaDados = []
            response.forEach(dado => {
                listaDados.push({...dado.data(), id: dado.id});
            });
            return listaDados
        })
    return dados

}

exports.registerUser = (nome, senha) => {
    const salt = bcriptjs.genSaltSync();
    const novaSenha = bcriptjs.hashSync(senha, salt);

    users.doc(nome).set({
        senha: novaSenha
    })
}