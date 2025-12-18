const express = require('express');


const app = express();


app.use(express.json());


app.get('/', (req, res) => {
res.json({ message: 'LatLong API is running' });
});


app.use('/api/locations', require('./routes/locations'));


module.exports = app;
