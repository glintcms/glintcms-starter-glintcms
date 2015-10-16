var debug = require('debug')('page-contact');
var defaults = require('defaults');
var express = require('express');
var router = express.Router();

var c = require('./config');
var Wrap = require('./wrap');

module.exports = function contact(o) {
  o = defaults(o, c);

  router.use(o.route, function(req, res, next) {

    var wrap = Wrap(o);

    debug('route', o.route);
    wrap
      .editable(req.userCan('edit'))
      .cid(o.id)
      .place(req.place || o.place)
      .load(res.locals, function(err, result) {
        debug('route loaded', result);
        if (err) return next(err);
        res.send(result.page);
      })
    ;
  });
  return router;
};

