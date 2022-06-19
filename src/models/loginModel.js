const databaseModel = require('../models/databaseModel');
const bcryptjs = require('bcryptjs');

class login {
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
        this.errors = [];
    }

    async register(res) {
        await this.validation(res)
        if (this.errors.length == 0) {
            databaseModel.registerUser('users', this.nome, this.senha)
            return [false]
        } else {
            return [true, this.errors]
        }
    }

    async login(res) {
        const credenciaisValidas = this.validLoginCredentials()
        if (credenciaisValidas) {
            await this.loginValidation(res);
        }
        if (this.errors.length == 0) {
            return [false]
        } else {
            return [true, this.errors]
        }
    }

    async loginValidation(res) {
        try {
            const nomeExiste = await databaseModel.findName('users', this.nome)
            if (nomeExiste) {
                await this.senhaValida(res)
            } else {
                this.errors.push("Usuário não existe");
            }
        } catch (error) {
            console.log(error)
            res.redirect('error404')
        }

    }

    validLoginCredentials() {
        if (!this.nome) this.errors.push("nome não informado");
        if (!this.senha) this.errors.push("senha não informada");
        if (this.errors.length == 0) {
            return true
        } else {
            return false
        }
    }

    async senhaValida(res) {
        try {
            const senhadb = await databaseModel.getData({dbName: 'users', docName: this.nome, field: "senha"});
            console.log(senhadb.senha);
            console.log(this.senha)
            if (!bcryptjs.compareSync(this.senha, senhadb.senha)) {
                this.errors.push("Senha inválida");
                return
            } 
        } catch (error) {
            console.log(error)
            res.redirect('/error404')
        }
    }

    async validation(res) {
        this.credentialsValidation()
        try {
            if (this.errors.length == 0) {
                await this.nameAlreadyExist(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    credentialsValidation() {

        const nomeLength = this.nome.length
        const senhaLength = this.senha.length
        if (!(nomeLength > 4 && nomeLength < 30)) {
            this.errors.push("Nome deve possuir entre 4 e 30 caracteres")
        }
        if (!(senhaLength > 4)) {
            this.errors.push("Senha deve possui mais do que 4 caracteres")
        }
    }

    async nameAlreadyExist(res) {
        try {
            const nomeExist = await databaseModel.findName('users', this.nome) 
            if (nomeExist) { 
                this.errors.push("Usuário já existe");
            }
        } catch (error) {
            console.log(error)
            res.redirect('/error404')
        }

    }
}

exports.login = login