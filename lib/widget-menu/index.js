var debug = require('debug')('widget-menu');
var fs = require('fs');
var dot = require('dot');
var defaults = require('defaults');
var isBrowser = require('is-browser');
var router = require('page');
var Widget = require('glint-widget');

var c = require('./config');

var template = fs.readFileSync(__dirname + '/index.dot', 'utf-8');
var compiled = dot.template(template);

module.exports = function(o) {
  o = defaults(o, c);
  return Widget(function(options) {
    options = defaults(options, o);
    return compiled(options);
  });
};

if (isBrowser) {

  /*
   popstate: browser back button
   */
  window.addEventListener('popstate', function(event) {
    var state = event.state;
    if (state && state.path) {
      debug('popstate', event, state.path);
      // TODO router does not pick it up
      // router.redirect(state.path);
      location.pathname = state.path;
    }
  });

  /*
   menu actions
   */
  $('#header .nav-button').on('click', function(e) {
    e.preventDefault();
    $('#navigation').fadeIn();
  });

  $('#hidemenu').on('click', function(e) {
    e.preventDefault();
    $('#navigation').fadeOut();
  });

  $('.main-nav > ul > li > a').on('click', function(e) {
    debug('nav link clicked', e.target);
    $('#navigation').fadeOut();
  });

  /*
   slider navigation elements <, >, °°°°
   */
  function showSliderNav() {
    $('.slider-nav').fadeIn();
  }

  function hideSliderNav() {
    $('.slider-nav').fadeOut();
  }

  /*
   page navigation with bootstrap slider
   */
  var menuItems = $('.main-nav > ul > li');
  $('#page-slider').on('slid.bs.carousel', function(e) {

    var target = e.relatedTarget;
    if (!target) return debug('page-slider to target found');

    var id = target.getAttribute('id');
    debug('slider slid event', id);
    navigate(menuItems, id, true);
    $('body').scrollTop(0);

  });

  function navigate(menuItems, id, redirect) {
    menuItems.removeClass('active');

    // get menuItem and number
    var item = null, number = 0;
    if (typeof id === 'number') {
      item = menuItems.eq(id);
      number = id;
    } else {
      if (!c.slides[id]) {
        debug('unknown slide: ' + id);
        hideSliderNav();
        return
      } else {
        item = menuItems.find('[data-id=' + id + ']').parent();
        number = c.slides[id].number;
        showSliderNav();
      }

    }

    // navigate to the pathname
    var pathname = '/' + id;
    debug('should navigate to: ' + pathname, number);

    if (item && typeof number === 'number' && !isNaN(number)) {
      item.addClass('active');
      $('.carousel').carousel(number);
      debug('navigate to: ' + pathname, location.pathname, number);
      if (location.pathname !== pathname || redirect) {
        debug('redirect to: ' + pathname);
        history.pushState(null, null, pathname);
        router.redirect(pathname);
      }
    }

  }

  // initial page navigation
  var path = location.pathname.replace('/', '');
  navigate(menuItems, path, false);

}
