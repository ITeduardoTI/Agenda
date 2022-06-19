const database = require('../../database');
const bcriptjs = require('bcryptjs');

exports.findName = (databaseName, nome) => {
    const users = database.collection(databaseName);
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

exports.getData = ({ dbName, docName, field }) => {
    const inDBName = dbName;
    const inName = docName;
    const inField = field
    const users = database.collection(inDBName);


    if (!inName) {
        const dados = users.get(inField)
            .then(response => {
                const listaDados = []
                response.forEach(data => {
                    listaDados.push({...data.data(), id: data.id})
                })
                return listaDados
            })
        return dados
    } else {
        const dados = users.doc(inName).get(inField)
            .then(response => {
                return response.data()
            })
        return dados
    }


}

exports.query = async (databaseName, query) => {
    const users = database.collection(databaseName);
    const dados = users.where(query[0], query[1], query[2]).get()
        .then(response => {
            const listaDados = []
            response.forEach(dado => {
                listaDados.push({ ...dado.data(), id: dado.id });
            });
            return listaDados
        })
    return dados

}

exports.registerUser = (databaseName, nome, senha) => {
    const users = database.collection(databaseName);
    const salt = bcriptjs.genSaltSync();
    const novaSenha = bcriptjs.hashSync(senha, salt);

    users.doc(nome).set({
        senha: novaSenha
    })
}

exports.registerItem = async ({dbName, doc, items}) => {
    const inDBName = dbName;
    const inDoc = doc;
    const inItems = items;

    if(!inDoc) {
        await database.collection(inDBName).add(inItems);
    } else {
        await database.collection(inDBName).doc(inDoc).set(inItems);
    }
}