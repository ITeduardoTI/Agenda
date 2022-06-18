const database = require('../../database');
const users = database.collection('users');

class login {
    constructor(nome, senha) {
        this.nome = nome
        this.senha = senha
    }

    register(req) {
        this.validation(req)
    }

    validation(req) {
        const errors = []

        const nomeLength = this.nome.length
        const senhaLength = this.senha.length
        if (!(nomeLength > 4 && nomeLength < 10)) {
            errors.push("Nome deve possuir entre 4 e 10 caracteres")
        }
        if (!(senhaLength > 4)) {
            errors.push("Senha deve possui mais do que 4 caracteres")
        }
        if (errors.length == 0) {
            req.flash('errors', '')
        } else {
            req.flash('errors', '')
        }
        if (errors.length == 0) {
            return false
        } else {
            return true
        }
    }
}

exports.login = login