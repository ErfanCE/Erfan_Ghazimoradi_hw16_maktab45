const express = require('express');
const app = express();
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes.js');
const path = require('path');


// connect MongoDB
mongoose.connect('mongodb://localhost:27017/corporate', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// require ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static public
app.use(express.static('public', {extensions: false}));
app.use('/company', express.static('public'));
app.use('/employee', express.static('public'));

// request body parser
app.use(express.urlencoded({extended: true}));


// routes
app.use('/', appRoutes);


// 404: not found
app.use('*', (request, response) => {
    response.send('<h3 style="color: red"><pre>404: not Found!</pre></h3>');
});


app.listen(8000, () => {
    console.log('Server is running on :8000 ...');
});