// Set Port
const PORT = process.env.PORT || 3000;

// Set Express App
const express = require('express');
const app = express();


// Import Routes
require('./init/router') (app);


// Set server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
