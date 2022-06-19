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
	if(req.sessions.user) {
		console.log(req.sessions.user);
	} else {
		req.flash('errors', 'Você não está logado');
	}
}