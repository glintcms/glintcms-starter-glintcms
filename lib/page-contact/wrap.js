var fs = require('fs');
var ejs = require('ejs');

var Container = require('glint-container');
var Block = require('glint-block');
var Style = require('glint-plugin-block-style-editable');
var TextBlock = require('glint-block-text');
var MetaBlock = require('glint-block-meta');

var Wrap = require('glint-wrap');
var LayoutWrap = require('wrap-layout');
var Widget = require('glint-widget');
var defaults = require('defaults');

var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');
var Dates = require('glint-plugin-adapter-dates');
var Id = require('glint-plugin-adapter-id');

var c = require('./config');

var template = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');

function text() {
  return Block(TextBlock()).use(Style({hover: false}));
}

module.exports = function wrap(o) {
  o = defaults(o, c);

  var blocks = o.blocks || {
      meta: Block(MetaBlock())
    };

  var adapter = Adapter(o.adapter || PageAdapter(o))
    .db(o.db || 'glint')
    .type(o.type || 'contact')
    .use(Dates())
    .use(Id())

  var container = Container(blocks, adapter);

  var contentWidget = Widget(function(options) {
    return ejs.render(o.template || template, options);
  })

  return Wrap()
    .defaults({
      title: 'i18n-Contact',
      style: '/assets/page-contact/style.css'
    })
    .parallel(container)
    .series('content', contentWidget.place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))

};
