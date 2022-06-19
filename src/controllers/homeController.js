const databaseModel = require('../models/databaseModel')

exports.home = (req, res) => {
    databaseModel.getData({ dbName: 'agenda' })
        .then(response => {
            console.log(response)
            res.locals.agenda = response
            res.render('home');
        })

}

exports.error404 = (req, res) => {
    res.render('error404')
};