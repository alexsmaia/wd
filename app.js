// Set Port
const PORT = process.env.PORT || 3000;

// Set Express App
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('We are home');
});

// Set server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
