const token = require('../utilities/token');
const jwt = require('jsonwebtoken');

// Check if User is authenticated
exports.checkAuth = (authorization, callback) => {
    if(!authorization) {
        return callback(false); 
    }
    token.validateToken(authorization, (result) => {
        if(result) {
            // get the decoded payload ignoring signature, no secretOrPrivateKey needed
            let decoded = jwt.decode(authorization.replace('Bearer ', ''));
            // get the decoded payload and header
            let data = decoded.data;
            return callback(data); 
        } else {
            return callback(false);
        }
    })
}