// set up ======================================================================
var express  = require('express');
var app      = express();
var auth = require('./config/authorization.js');
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var database = require('./config/database');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var app = express();
mongoose.connect(database.url);
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(enableCORS);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser())
//app.use(session({secret: 'users'}))
app.use(passport.initialize());
app.use(passport.session());
var User = require('./app/models/users.js');
mongoose.model('User');
var User = require('./app/models/notes.js');
mongoose.model('Note');


require('./app/passport')(passport)
require('./app/routes.js')(app,auth,passport);


app.listen(port);
console.log("App listening on port " + port);
