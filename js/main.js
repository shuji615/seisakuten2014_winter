$(function(){
  jQuery.extend(jQuery.easing, {
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });

  // sticky navigation
  var $nav = $('#nav');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $nav.addClass('sticky');
    } else {
      $nav.removeClass('sticky');
    }
  });

  // 最初のアニメーション
  // $('#main').removeClass('goast');

  // // クリックされたらアニメーション
  // $('#nav .link a').click(function(e){
  //   e.preventDefault();
  //   $('#main').addClass('goast');
  //   setTimeout(function(){
  //     window.location.href = e.target.parentNode.href;
  //   }, 800);
  // });
});


