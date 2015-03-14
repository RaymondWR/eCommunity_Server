var express  = require('express');
var multer  = require('multer');
var formidable = require('formidable');
var flash = require('connect-flash');
var app   = express();
var auth = require('./config/authorization.js');
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8000;
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
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser())
app.use(passport.initialize());
app.use(session({
  secret: 'keyboard cat'
}))
app.use(passport.session());
app.use(flash());



var User = require('./app/models/users.js');
mongoose.model('User');
var Note = require('./app/models/notes.js');
mongoose.model('Note');
var Post = require('./app/models/posts.js');
mongoose.model('Post');
var Doc = require('./app/models/docs.js');
mongoose.model('Doc');


require('./app/passport')(passport)
require('./app/routes.js')(app,auth,passport);
app.use(multer({ dest: './uploads/'}))
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(port);
console.log("App listening on port " + port);
