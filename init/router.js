// Set middlewares
let {isRegistered} = require('../middleware/isRegistered.js');
let {isAdmin} = require('../middleware/isAdmin.js');

// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/site/auth.routes'));
    app.use('/users', isRegistered, require('../routes/site/users.routes'));
    app.use('/wd/topics', isAdmin, require('../routes/wd/topics.routes'));
    app.use('/wd/users', isAdmin, require('../routes/wd/users.routes'));
}