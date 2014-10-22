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
    console.log('hello');
    counter++;
  }, 1000);

});
