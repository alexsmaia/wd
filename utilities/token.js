var jwt = require('jsonwebtoken');
const models = require('../models');

// Generate Tokem
exports.generateToken = (user_info, callback) => {
    let secret = process.env.SECRET; 
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}
// Validate Token
exports.validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    }
    let secret = process.env.SECRET; 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true);
        }
    })
}
// Get Loged User
exports.getLogedUser = (authorization, callback) => {    
    // get the decoded payload ignoring signature
    let decoded = jwt.decode(authorization.replace('Bearer ', ''));
    let user_id = decoded.data.user_id;
    // Find login user
    return models.User.findOne({
        where : { id : user_id }
    }).then(logedUser => {
        return callback(logedUser);
    }).catch(error => {
        return callback(false);
    });
}
// Get Loged User
exports.getLogedId = (authorization, callback) => {    
    // get the decoded payload ignoring signature
    let decoded = jwt.decode(authorization.replace('Bearer ', ''));
    let logedId = decoded.data.user_id;
    if (logedId > 0) {
        return callback(logedId);
    } else {
        return callback(false);
    }
}