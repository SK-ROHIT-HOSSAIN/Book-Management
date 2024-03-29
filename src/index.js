const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/routes/route');

const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://skrohithossain2000:ZM72Svh2eBK2QiYt@cluster0.svd56m5.mongodb.net/Book-Management?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});