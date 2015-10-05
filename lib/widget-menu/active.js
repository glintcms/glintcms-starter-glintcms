var c = require('./config');

module.exports = function activePage(pathname) {

  var active = {};
  var p = pathname.replace('/', '');

  Object.keys(c.slides).forEach(function(id) {
    active[id] = (id == p) ? 'active' : '';
  });

  return active;

};