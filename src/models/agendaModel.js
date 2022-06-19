const databaseModel = require('./databaseModel')

class agendaModel {
    constructor(nome, sobrenome, email, telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.errors = [];
    }

    async newItem() {
        await this.validations();
        if (this.errors.length == 0) {
            await databaseModel.registerItem({dbName: 'agenda', doc: this.telefone,
                items: {
                    nome: this.nome,
                    sobrenome: this.sobrenome,
                    email: this.email,
                    telefone: this.telefone
                }})
            return [false];
        } else {
            return [true, this.errors];
        }
    }

    async validations() {
        const credentials = this.credentialValidation();
        if (credentials) {
            await this.numberAlreadyExist()
        }
    }

    credentialValidation() {
        const validator = require('validator');
        if (!this.nome) this.errors.push("O nome deve ser informado");
        if (!this.sobrenome) this.errors.push("O sobrenome deve ser informado");
        if (!this.telefone) this.errors.push("O telefone deve ser informado");

        if (this.email) {
            if (!validator.isEmail(this.email)) {
                this.errors.push("O e-mail deve ser válido")
            }
        }

        if (this.errors.length == 0) {
            return true
        } else {
            return false
        }
    }

    async numberAlreadyExist() {
        try {
            const numberExist = await databaseModel.findName('agenda', this.telefone)
            if(numberExist) {
                this.errors.push("Numero já existe");
            }
        } catch (error) {
            console.log(error)
        }
    }
}

exports.agendaModel = agendaModel;