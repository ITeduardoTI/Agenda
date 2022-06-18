const databaseModel = require('../models/databaseModel');
const bcryptjs = require('bcryptjs');

class login {
    constructor(nome, senha) {
        this.nome = nome;
        this.senha = senha;
        this.errors = [];
    }

    async register() {
        await this.validation()
        if (this.errors.length == 0) {
            databaseModel.registerUser(this.nome, this.senha)
            return [false]
        } else {
            return [true, this.errors]
        }
    }

    async login() {
        const credenciaisValidas = this.validLoginCredentials()
        let usuarioExiste;
        if (credenciaisValidas) {
            usuarioExiste = await this.loginValidation();
        }
        if (this.errors.length == 0) {
            return [false]
        } else {
            return [true, this.errors]
        }
    }

    async loginValidation() {
        try {
            const nomeExiste = await databaseModel.findName(this.nome)
            if (nomeExiste) {
                await this.senhaValida()
            } else {
                this.errors.push("Usuário não existe");
            }
        } catch (error) {
            console.log(error)
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

    async senhaValida() {
        try {
            const senhadb = await databaseModel.getData(this.nome, "senha");
            console.log(senhadb.senha);
            console.log(this.senha)
            if (!bcryptjs.compareSync(this.senha, senhadb.senha)) {
                this.errors.push("Senha inválida");
                return
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async validation() {
        this.credentialsValidation()
        try {
            if (this.errors.length == 0) {
                await this.nameAlreadyExist()
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

    async nameAlreadyExist() {
        try {
            const nomeExist = await databaseModel.findName(this.nome)
            if (nomeExist) {
                this.errors.push("Usuário já existe");
            }
        } catch (error) {
            console.log(error)
        }

    }
}

exports.login = login