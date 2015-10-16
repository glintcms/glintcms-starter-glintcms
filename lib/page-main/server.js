var debug = require('debug')('page-main');
var defaults = require('defaults');
var url = require('url');
var express = require('express');
var router = express.Router();

var c = require('./config');
var active = require('widget-menu/active');
var Wrap = require('./wrap');

exports = module.exports = function main(o) {
  o = defaults(o, c);

  router.use(o.route, function(req, res, next) {
    debug('route', o.route, req.locale, req.user, res.locals);

    var pathname = url.parse(req.originalUrl).pathname;
    res.locals.active = active(pathname, o);
    debug('active', res.locals.active);

    Wrap(o)
      .editable(req.userCan('edit'))
      .cid(o.id)
      .place(req.place || o.place)
      .load(res.locals, function(err, result) {
        debug('route loaded', o.route, err, result);
        if (err) return next(err);
        res.send(result.page);
      })

  });

  return router;

};
