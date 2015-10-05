jQuery(function($) {

  //Preloader
  var preloader = $('.preloader');
  $(window).load(function() {
    preloader.remove();
  });

  // Menu
  $('#header .nav-button').on('click', function(e) {
    e.preventDefault();
    $('#navigation').fadeIn();
  });

  $('#hidemenu').on('click', function(e) {
    e.preventDefault();
    $('#navigation').fadeOut();
  });

  $('.main-nav ul li a').on('click', function(e) {
    $('#navigation').fadeOut();
  });

  var slider = $('#page-slider .carousel-inner').find('.item');
  var menuItems = $('.main-nav ul').find('li');

  $('#page-slider').on('slid.bs.carousel', function(e) {

    var target = e.relatedTarget;
    var id = target.getAttribute('id');
    location.hash = id;

    navigate(menuItems, id);

    $('body').scrollTop(0);

  });

  function navigate(menuItems, id) {
    menuItems.removeClass('active');

    var item = null, number = 0;
    if (Number.isInteger(id)) {
      item = menuItems.eq(id);
      number = id;
    } else {
      item = menuItems.find('[data-id=' + id + ']');
      number = item.attr('data-slide-to');
      number = Number.parseInt(number);
      item = item.parent();
    }

    console.log('menu', item, number);

    if (item && number) {
      item.addClass('active');
      $('.carousel').carousel(number);
    }

  }

  var hash = location.hash.replace('#', '');
  hash = hash || 'home-page';
  console.log('hash', hash);
  navigate(menuItems, hash);

  //Contact Form
  var form = $('#contact-form');
  form.submit(function(event) {
    event.preventDefault();
    var form_status = $('.form-status');
    $.ajax({
      url: $(this).attr('action'),
      beforeSend: function() {
        form_status.find('.form-status-content').html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn();
      }
    }).done(function(data) {
      form_status.find('.form-status-content').html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
    });
  });

});