var fs = require('fs');
var dot = require('dot');
var defaults = require('defaults');
var Block = require('glint-block');
var Style = require('glint-plugin-block-style-editable');
var TextBlock = require('glint-block-text');
var MDBlock = require('glint-block-markdown');
var MetaBlock = require('glint-block-meta');
var CKEditorBlock = require('glint-block-ckeditor');
var Adapter = require('glint-adapter');
var PageAdapter = require('page-adapter');
var Container = require('glint-container');
var Wrap = require('glint-wrap');
var Widget = require('glint-widget');
var LayoutWrap = require('wrap-layout');

var template = fs.readFileSync(__dirname + '/index.dot', 'utf-8');
var compiled = dot.template(template);

function text() {
  return Block(TextBlock()).use(Style());
}

function markdown() {
  return Block(MDBlock()).use(Style());
}

function editor() {
  return Block(CKEditorBlock()).use(Style());
}

exports = module.exports = function wrap(o) {
  o = o || {};

  var wrap = Wrap();

  var blocks = {

    'home-title': text().selector('[data-id=home-title]'),
    'home-teaser': editor().selector('[data-id=home-teaser]'),
    'home-subtitle': markdown().selector('[data-id=home-subtitle]'),
    'home-box-1': markdown().selector('[data-id=home-box-1]'),
    'home-box-2': markdown().selector('[data-id=home-box-2]'),
    'home-box-3': markdown().selector('[data-id=home-box-3]'),
    'home-box-4': markdown().selector('[data-id=home-box-4]'),
    'home-box-5': markdown().selector('[data-id=home-box-5]'),
    'home-box-6': markdown().selector('[data-id=home-box-6]'),

    'www-title': text().selector('[data-id=www-title]'),
    'www-content': editor().selector('[data-id=www-content]'),

    'bb-title': text().selector('[data-id=bb-title]'),
    'bb-content': markdown().selector('[data-id=bb-content]'),

    'doc-title': text().selector('[data-id=doc-title]'),
    'doc-content': markdown().selector('[data-id=doc-content]'),

    'img-title': text().selector('[data-id=img-title]'),
    'img-content': editor().selector('[data-id=img-content]'),

    'contact-title': text().selector('[data-id=contact-title]'),
    'contact-content': markdown().selector('[data-id=doc-content]'),

    meta: Block(MetaBlock())

  };

  var adapter = o.adapter || PageAdapter(o);
  var db = o.db || 'glint';
  var type = o.type || 'main';
  var id = o.id || 'main';
  var templateData = o.templateData || '__template__';

  var homeAdapter = Adapter(adapter)
    .db(db)
    .type(type)

  var container = Container(blocks, homeAdapter)
    .id(id)
    .template(templateData);

  wrap
    .parallel(container)
    .series('content', Widget(function(options) {
      return compiled(options)
    }).place('force:server'))
    .series(LayoutWrap(o.layout).place('force:server'))

  wrap.routes = adapter.routes;

  return wrap;
};



