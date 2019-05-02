var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
//KN - 10
const prodRouter = require('./routes/products');
const authRouter = require('./routes/auth');

var mongoose = require('./mongoose');
const passport = require('./auth/passport');

var app = express();

//KN - 7
const defConnStr = 'mongodb://127.0.0.1:27017/express-mongoose-passport';
const mongoDBConnStr = process.env.MONGODB_URI || defConnStr;
mongoose(mongoDBConnStr);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
passport(app);

app.use('/', indexRouter);
app.use('/users', userRouter);
//KN - 10
app.use('/products', prodRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
