const express = require('express');
const app = express();
const routes = require('./routes')
const path = require('path');

routes.set( 'views', path.resolve(__dirname, 'src', 'views'));
routes.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));
app.use(routes)


app.listen(3000);
