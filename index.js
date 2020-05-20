require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
 

var routerUsers = require('./Routers/users');
var authLogin = require('./Auth/login.auth');
var loginMiddlewares = require('./Middlewares/requireLogin');
 

app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SECRET_STRING));


app.use('/library',loginMiddlewares.require, routerUsers);
app.use('/auth', authLogin);


app.use(express.static('public'));



app.get('/', function(req, res) {
    res.send('Hello world');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))