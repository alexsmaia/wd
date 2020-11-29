// Set middlewares
let {isRegistered} = require('../middleware/isRegistered.js');
let {isAdmin} = require('../middleware/isAdmin.js');

// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/auth.routes'));
    app.use('/users', isAdmin, require('../routes/user.routes'));
}