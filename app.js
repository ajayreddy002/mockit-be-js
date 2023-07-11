var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const interviewRouter = require('./routes/interview');
const interviewerRouter = require('./routes/interviewer');
const adminRouter = require('./routes/admin');
const commonRouter = require('./routes/common');
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URL, { dbName: 'mockit-db' });
const db = mongoose.connection;
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
const allowedOrigins = ['http://localhist:4200/']
app.use(cors({
  origin: allowedOrigins
}));
const server = http.Server(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/interview', interviewRouter);
app.use('/interviewer', interviewerRouter);
app.use('/admin', adminRouter);
app.use('/common', commonRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app: app, server: server };
