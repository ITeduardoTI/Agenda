const databaseModel = require('./databaseModel')

class agendaModel {
    constructor(nome, sobrenome, email, telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.telefone = telefone;
        this.errors = [];
        this.success = [];
    }

    async newItem() {
        await this.validations();
        if (this.errors.length == 0) {
            await databaseModel.registerItem({
                dbName: 'agenda', doc: this.telefone,
                items: {
                    nome: this.nome,
                    sobrenome: this.sobrenome,
                    email: this.email,
                    telefone: this.telefone
                }
            })
            if(this.success.length == 0) {
                return [false];
            } else {
                return [false, this.success];
            }
        } else {
            return [true, this.errors];
        }
    }

    async editarItem() {
        try {
            await databaseModel.updateItem('agenda', this.telefone, {
                nome: this.nome,
                sobrenome: this.sobrenome,
                email: this.email,
                telefone: this.telefone
            })
        } catch(e) {
            console.log(e);
        }
        
    }

    async validations() {
        const credentials = this.credentialValidation();
        let numberExist;
        if (credentials) {
            numberExist = await this.numberAlreadyExist();
            if(numberExist) {
                this.editarItem();
                this.success.push("Contato editado com sucesso")
            }
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
            if (numberExist) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }
}

exports.agendaModel = agendaModel;