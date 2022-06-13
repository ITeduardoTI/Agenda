const express = require('express');
const routes = express();
const path = require('path');

const homeController = require('./src/controllers/homeController')

routes.get('/', homeController.nome);
routes.get('/error404', homeController.error404);

module.exports = routes;