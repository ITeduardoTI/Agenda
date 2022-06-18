const express = require('express');

const app = express();
const routes = require('./routes')
const path = require('path');
const database = require('./database')

const session = require('express-session');
const flash = require('connect-flash')
const FirestoreStore = require("firestore-store")(session);
const helmet = require('helmet');
const csrf = require('csurf');
const checkCsrfError = require('./src/middlewares/middlewares').checkCsrfError;
const csrfMiddleware = require('./src/middlewares/middlewares').csrfMiddleware;


const sessionOptions = session({
	secret: 'ChaveSecreta',
	resave: false,
	saveUninitialized: false,
	store: new FirestoreStore({
		database: database
	}),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true
	}
})

app.use(helmet());

routes.set('views', path.resolve(__dirname, 'src', 'views'));
routes.set('view engine', 'ejs')

app.use(sessionOptions);
app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes)



app.listen(3000);
