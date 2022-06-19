exports.middlewareGlobal = (req, res, next) => {
	res.locals.errors = req.flash('errors');
	res.locals.success = req.flash('success');
	res.locals.user = req.session.user;
	next();
}

exports.checkCsrfError = (err, req, res, next) => {
	if (err && err.code === 'EBADCSRFTOKEN') {
		return res.send('BAD CSRF.')
	}
}

exports.csrfMiddleware = (req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
}

exports.loginRequired = (req, res, next) => {
	if (req.session.user) {
		console.log(req.session.user);
		next();
	} else {
		req.flash('errors', 'Você não está logado');
		req.session.save(function () {
			res.redirect('/error404')
		})
	}
}