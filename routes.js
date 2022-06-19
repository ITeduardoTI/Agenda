const express = require('express');
const routes = express();
const path = require('path');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginContoller');
const agendaController = require('./src/controllers/agendaController')
const middlewares = require('./src/middlewares/middlewares.js');

routes.use(middlewares.middlewareGlobal);

routes.get('/', homeController.home);
routes.get('/login', loginController.loginPage);
routes.post('/login/login', loginController.login);
routes.post('/login/signUp', loginController.signUp);
routes.get('/login/logOut', loginController.logOut)
routes.get('/novoItem', agendaController.novoItem)
routes.post('/novoItem', agendaController.novoItemPost)
routes.get('/error404', homeController.error404);

module.exports = routes;