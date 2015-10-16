var debug = require('debug')('page-contact');
var user = require('page-auth-access');
var keyboard = require('glint-trigger-keyboard');
var sidenav = require('glint-trigger-sidenav');
var router = require('page.js');
var isBrowser = require('is-browser');
var defaults = require('defaults');

var c = require('./config');
var Wrap = require('./wrap');

module.exports = function contact(o) {
  o = defaults(o, c);

  if (isBrowser) {
    var form = document.querySelector(o.selectorForm);
    var buttons = document.querySelectorAll(o.selectorButton);

    function contact(e) {

      var target = e.target || e.srcElement;

      function getAttributes(config, form, names) {
        var attributes = {};
        names.forEach(function(name) {
          var value = config[name] || '';
          if (form) {
            var input = form.querySelector('[name=' + name + ']');
            if (input) value = input.value || input.text || input.placeholder;
          }
          attributes[name] = value;
        });
        return attributes;
      }


      var attr = getAttributes(c, form, ['email', 'subject', 'message']);

      debug('button', e, target, attr);

      var href = 'mailto:' + attr.email + '?subject=' + encodeURIComponent(attr.subject) + '&body=' + encodeURIComponent(attr.message);

      target.setAttribute('href', href);

    }

    [].slice.call(buttons).forEach(function(button) {
      button.addEventListener('click', contact, false);
    });
  }


  return router(o.route, function(req) {
    debug('route', window.location.href, req.params);
    var wrap = Wrap(o);

    if (user.can('edit')) {
      wrap.editable(true);
      keyboard().add(wrap.container);
      sidenav().add(wrap.container);
    }

    wrap
      .i18n(context.i18n)
      .cid(o.id)
      .place(o.place)
      .load(function(err, result) {
        if (err) return console.error(err);
        debug('wrap loaded', result);
      })
    ;
  });

};

