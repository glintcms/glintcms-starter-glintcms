// router
var page = require('page');

// routes
// auth is done completely on the server ;-)
require('page-filemanager')();
require('page-upload')();
require('page-main')();


// initialize page.js router
page({
  click: false,
  dispatch: true,
  decodeURLComponents : false
});

// initialize socket.io communication
//var io = window.io = require('glint-socket-io').io;
//var socket = window.socket = require('glint-socket-io')();
