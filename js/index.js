var sprites;
var imageClasses = [
  'bigmark-c',
  'bigmark-m',
  'bigmark-y',
];

$.fn.extend({
  moveTo: function(x, y, width, height){
    this.animate({
      left: ((x - width/2)  * 100) + '%',
      top:  ((y - height/2) * 100) + '%',
    }, {
      queue: false,
      duration: 500,
      easing: 'easeOutElastic'
    });
  },
  keel: function() {
    this.transition({
      rotate: '+=180deg',
    });
  },
});

$(function(){
  sprites = [
    $('#sprite-0'),
    $('#sprite-1'),
    $('#sprite-2'),
  ];

  var counter = 0;
  setInterval(function(){
    for (var i = 0; i < imageClasses.length; i++) {
      $('.sprite').removeClass(imageClasses[i]);
    }
    $('.sprite').addClass(imageClasses[counter % imageClasses.length]);

    // サイズ
    var size = counter % 3 == 0 ? 'lg-size' : 'md-size';
    var prevSize = (counter - 1) % 3 == 0 ? 'lg-size' : 'md-size';
    // $('.sprite').removeClass(prevSize);
    // $('.sprite').addClass(size);

    var marginLeft = counter % 2 == 0 ? '100px' : '0px';

    $('#sprite-0').moveTo(0.3, 0.5, 0.2, 0.2);
    $('#sprite-1').moveTo(0.5, 0.5, 0.2, 0.2);
    $('#sprite-2').moveTo(0.7, 0.5, 0.2, 0.2);
    $('#sprite-0').keel();

    // $('.sprite').animate({
    //   marginLeft: marginLeft,
    // }, {
    //   queue: false,
    //   duration: 500,
    //   easing: 'easeOutElastic'
    // });
    // $('.sprite').animate({
    //   width: size,
    //   height: size,
    // }, {
    //   queue: false,
    //   duration: 500,
    // });

    counter++;
  }, 1000);

});
