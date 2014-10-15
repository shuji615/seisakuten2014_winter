$(function(){
  jQuery.extend(jQuery.easing, {
    easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
  });

  // 最初のアニメーション
  $('#main').animate({
    marginLeft: '0'
  }, 500, 'easeOutExpo');

  // クリックされたらアニメーション
  $('#nav .link a').click(function(e){
    e.preventDefault();
    $('#main').animate({
      marginLeft: '-100%'
    }, 500, 'easeOutExpo', function(){
      window.location.href = e.target.parentNode.href;
    });
  });
});


