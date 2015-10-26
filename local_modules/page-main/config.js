exports.identifier = 'page-main';

exports.id = 'main';

exports.route = /^\/(home|works-with-what|building-blocks|documentation|screenshots|contact)/;

exports.place = process.env.GLINT_PLACE || 'browser';

exports.contact = {
  identifier: 'page-contact',
  id: 'contact',
  route: '/contact',
  selectorForm: 'form.js-contact-form',
  selectorButton: '.js-contact-button',
  email: 'contact@intesso.com',
  subject: 'Inquiry',
  message: 'Please contact me.'
};