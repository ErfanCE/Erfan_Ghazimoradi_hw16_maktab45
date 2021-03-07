const express = require('express');
const app = express();
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes.js');
const path = require('path');


// connect MongoDB
mongoose.connect('mongodb://localhost:27017/corporate', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// require ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', appRoutes);


// 404: not found
app.use('*', (request, response) => {
    response.send('<h3 style="color: red"><pre>404: not Found!</pre></h3>');
});


app.listen(8000, () => {
    console.log('Server is running on :8000 ...');
});