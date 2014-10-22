var sprites;
var imageClasses = [
  'bigmark-c',
  'bigmark-m',
  'bigmark-y',
];

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
    $('.sprite').removeClass(prevSize);
    $('.sprite').addClass(size);

    var marginLeft = counter % 2 == 0 ? '100px' : '0px';
    $('.sprite').animate({
      marginLeft: marginLeft,
    }, {
      queue: false,
      duration: 500,
      easing: 'easeOutElastic'
    });
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
