$(function(){
  jQuery.extend(jQuery.easing, {
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });

  // 最初のアニメーション
  $('#main').removeClass('goast');

  // クリックされたらアニメーション
  $('#nav .link a').click(function(e){
    e.preventDefault();
    $('#main').addClass('goast');
    setTimeout(function(){
      window.location.href = e.target.parentNode.href;
    }, 800);
  });
});


