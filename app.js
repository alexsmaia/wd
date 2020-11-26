// Set Port
const PORT = process.env.PORT || 3000;

// Set Express App
const express = require('express');
const app = express();

// Swagger
const swaggerUi = require("swagger-ui-express"); 
const swaggerDocument = require("./config/swagger.json")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true})); 

// Import Routes
require('./init/router') (app);


// Set server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
