// Set Express App
const express = require('express');
let router = express.Router();


router.get('/', (req, res) => {
    res.send('We are home');
});

module.exports = router;