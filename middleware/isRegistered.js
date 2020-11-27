const auth = require('../middleware/auth.js');

// Check if User is Registered
exports.isRegistered = function(req, res, next) {
    auth.checkAuth(req.headers.authorization, (data) => {
        if (data.role > 0) {
            next();
        } else {
            res.status(401).send("Not Authorized");
        }
    })    
}