const auth = require('../middleware/auth.js');

// Check if User is Administrator
exports.isAdmin = function(req, res, next) {
    auth.checkAuth(req.headers.authorization, (data) => {
        if (data.role > 1) {
            next();
        } else {
            res.status(401).send("Not Authorized");
        }
    })    
}