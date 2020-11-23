// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/user.routes'));
}