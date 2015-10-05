var debug = require('debug')('glintcms-starter-glintcms');
var url = require('url');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var compress = require('compression');

var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');
var fsa = require('glint-adapter-fs')();
var sessionAdapter = Adapter(fsa).db('glint').type('session');
var sessionStore = require('glint-session')(app, sessionAdapter);
var io = require('glint-socket-io')(server, sessionStore);
var isBot = require('connect-is-bot');

// pages
var pageAuth = require('page-auth');
var pageAccess = require('page-auth-access');
var pageMain = require('page-main');

var pageFilemanager = require('page-filemanager');
var pageUpload = require('page-upload');

var pageError = require('page-error');

// no view engine setup -> all handled by the page modules
app.use(compress()); // middleware order: very early to compress everything. -> huge difference in file size! check network in browser.

app.use(favicon(__dirname + '/public/assets/wrap-layout/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// enable cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next){
  req.__ = res.locals.__ = function noopTranslate(str) {
    return str;
  };
  next();
});

app.use(flash());
app.use(isBot());

app.use(cookieParser());

app.use(PageAdapter().routes);


// the important stuff happens here! -> page routes

app.use(pageAuth());  // middleware order: first page middleware

var access = pageAccess();
app.use(access); // middleware order: after pageAuth

if (debug.enabled) {
  app.use(function(req, res, next) {
    debug('locals', res.locals);
    debug('userRole', req.userRole);
    debug('userRoleString', req.userRoleString);
    debug('userPermission', req.userPermission);
    next();
  });
}

app.get(/^\/$/, function(req, res, next){
  res.redirect('/home');
});

app.use(pageMain()); // middleware order: must be after the other pages

app.use(pageFilemanager());
app.use(pageUpload());

if (debug.enabled) {
  app.use(function(req, res, next) {
    debug('no route');
    next();
  });
}

app.use(function(err, req, res, next) {
  console.error('uncaught error', err);
  next(err);
});

// final error handler
app.use(pageError()); // middleware order: at the very end

module.exports = server;

module.exports.app = app;
