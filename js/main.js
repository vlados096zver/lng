$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 767) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }

  });

 $(document).on('click', '.main-header__link', function() {
    let target = $(this).attr('href');
    if ($(window).width() >= 768) {
      coordsScroll = $(target).offset().top - $('.main-header').outerHeight() 
    } else {
      coordsScroll = $(target).offset().top - $('.main-header').outerHeight()
    }
    $('html, body').animate({
      scrollTop: coordsScroll
    }, 800);
    return false;
  });

  (function() {
  var topMenu = $(".main-header"),
    activeClass = "main-header__link--active",
    menuItems = topMenu.find(".main-header__list a"),
    scrollItems = menuItems.map(function() {
      var item = $($(this).attr("href"));
      if (item.length) return item;
    });

    if ($(window).width() >= 768) {
      topMenuHeight = topMenu.outerHeight() + topMenu.outerHeight()
    } else {
     topMenuHeight = topMenu.outerHeight() + topMenu.outerHeight() 
    }

  // Bind to scroll
  $(window).scroll(function() {
    var fromTop = $(this).scrollTop() + topMenuHeight;

    var cur = scrollItems.map(function(v, i) {
      if ($(this).offset().top < fromTop) return this;
    });

    cur = cur[cur.length - 1] || scrollItems[0];
    var id = cur && cur.length ? cur[0].id : "";

    menuItems.removeClass(activeClass).filter("[href='#" + id + "']").addClass(activeClass);
  })

})()

 function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
        console.log('test');
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  }

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn, bool) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail') || bool == true) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    });

  }

  // для проверки при нажатии

  function valClick(input, length, regExp, error, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length || value === '' || bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  }

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  }


  var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
  var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
  var regPhone = /[_]/i;
  var regAll = /.{1,}/;


  // login

  $('#w_send').on('click', function() {
    sendForm();
  });

  function sendForm() {
    let email = $('#w_email').val();
    let phone = $('#w_password').val();

    validate('#w_email', 1, regEmail, '.write__error--email');
    validate('#w_phone', 0, regName, '.write__error--phone');
    disBtn('#w_email, #w_phone', '#w_send');

    valClick('#w_email', 1, regEmail, '.write__error--email');
    valClick('#w_phone', 0, regName, '.write__error--phone');
    let btn_bool = disBtnClick('#w_email, #w_phone', '#w_send');

    if (btn_bool) {
      $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
          action: 'send',
          email: email,
          phone: phone,
        },
      }).done(function(data) {
        $('#w_email, #w_phone').val('').removeClass('form-done');
        var text = 'Ваше  cообщение отправлено!';

        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
          $('.msg-modal').removeClass('msg-modal-active');
        }, 2500);
      });

    }

    return false;
  }

  validate('#w_email', 1, regEmail, '.user__error--email');
  validate('#w_phone', 0, regName, '.user__error--password');

  disBtn('#w_email, #w_phone', '#w_send');

})