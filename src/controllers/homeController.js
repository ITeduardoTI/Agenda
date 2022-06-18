exports.home = (req, res) => {
    res.render('home');
}

exports.error404 = (req, res) => {
    res.render('error404')
};