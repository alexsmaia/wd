// Set middlewares
let {auth} = require('../middleware/auth.js');

// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/auth.routes'));
    app.use('/users', auth, require('../routes/user.routes'));
}