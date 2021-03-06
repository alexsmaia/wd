// Set middlewares
let {isRegistered} = require('../middleware/isRegistered.js');
let {isAdmin} = require('../middleware/isAdmin.js');

// Set Routes Files
module.exports = (app) => {
    app.use('/', require('../routes/site/auth.routes'));
    
    app.use('/comments', isRegistered, require('../routes/site/comments.routes'));
    app.use('/favorites', isRegistered, require('../routes/site/favorites.routes'));
    app.use('/users', isRegistered, require('../routes/site/users.routes'));
    app.use('/topics', require('../routes/site/topics.routes'));
    app.use('/videos', require('../routes/site/videos.routes'));
    
    app.use('/wd/comments', isAdmin, require('../routes/wd/comments.routes'));
    app.use('/wd/favorites', isAdmin, require('../routes/wd/favorites.routes'));
    app.use('/wd/topics', isAdmin, require('../routes/wd/topics.routes'));
    app.use('/wd/users', isAdmin, require('../routes/wd/users.routes'));
    app.use('/wd/videos', isAdmin, require('../routes/wd/videos.routes'));
}