const http = require('http');
const port = 3000;
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const route = require('./src/routes/index');

const app = express();

app.set('port', port);

mongoose.connect("mongodb://localhost:27017/quotes-app?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    }).catch(() => {
        console.log('connection failed');
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/user', route.user);
app.use('/api/quote', route.quotes);

const server = http.createServer(app);

server.listen(port);