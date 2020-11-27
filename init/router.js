// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/auth.routes'));
    app.use('/users', require('../routes/user.routes'));
}