const token = require('../utilities/token');

// Check if User is authenticated
exports.auth = function(req, res, next) {
    token.validateToken(req.headers.authorization, (result) => {
        if(result) {
            next(); 
        } else {
            res.status(401).send("Invalid Token"); 
        }
    })
}