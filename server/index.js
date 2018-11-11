var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');

//Connect to database
mongoose.connect('mongodb://localhost/worldWallDB');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () =>  {
    console.log('Connected to database.');
});


//use session to track logins
app.use(cookieParser());
app.use(session({
    secret: 'workhard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    }),
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60000000
    }
}));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://159.203.29.234:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

//include routes
var userRoutes = require('./routes/userRouter');
var wallRoutes = require('./routes/wallRouter');
app.use('/', userRoutes);
app.use('/', wallRoutes);


app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
