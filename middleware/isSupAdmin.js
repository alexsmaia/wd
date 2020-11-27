const auth = require('./auth.js');

// Check if User is Super Administrator
exports.isSupAdmin = function(req, res, next) {
    auth.checkAuth(req.headers.authorization, (data) => {
        if (data.role > 2) {
            next();
        } else {
            res.status(401).send("Not Authorized");
        }
    })    
}