var sprites = null;
var imageClasses = [
  'bigmark-c',
  'bigmark-m',
  'bigmark-y',
];

var imageClassesInverted = [
  'bigmark-r',
  'bigmark-g',
  'bigmark-b',
];

var inverted = false;

// リサイズ関連
var fitToWindow = function() {
  var height = $('#main').height();
  var width  = $('#main').width();
  var size = height < width ? height : width;
  $('#top').css({
    width: size,
    height: size,
    top: (height - size) / 2
  });
  moveToHorizontal();
};

$(window).resize(function(){ fitToWindow(); });

// jqueryの拡張
$.fn.extend({
  moveTo: function(x, y){
    this.animate({
      left: (x  * 100) + '%',
      top:  (y * 100) + '%',
    }, {
      queue: false,
      duration: 500,
    });
  },
});

// 整列の実装

var moveToHorizontal = function() {
  if (!sprites) return;
  sprites[0].moveTo(-0.2, 0.1);
  sprites[1].moveTo( 0.1, 0.1);
  sprites[2].moveTo( 0.4, 0.1);
};

var toggle = function(){
  if (inverted) {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      sprite.removeClass(imageClassesInverted[i]);
      sprite.addClass(imageClasses[i]);
    }
  } else {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      sprite.removeClass(imageClasses[i]);
      sprite.addClass(imageClassesInverted[i]);
    }
  }
  inverted = !inverted;
  // 動かす
  var size = $('#main').width();
  var origin = {x: size/2, y: size/2};
  var a0 = Math.PI * Math.random();
  var radius = size ;

  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    var a = a0 + i * Math.PI * 2 / 3;
    var x = origin.x + radius * Math.cos(a);
    var y = origin.y + radius * Math.sin(a);
    var pos = sprite.position();
    sprite.animate({
      top: pos.top + sprite.height()/10 * (i % 2 == 0 ? 1 : -1),
    },{
      queue: true,
      duration: 10
    });
    sprite.animate({
      top: pos.top,
      left: pos.left,
    },{
      queue: true,
      duration: 400,
      easing: 'easeOutElastic',
    });
  }
};

// loop
var loop = [
  function(){
    toggle();
  },
];

// main

$(function(){
  fitToWindow();

  sprites = [$('#sprite-0'), $('#sprite-1'), $('#sprite-2'), ];
  texts = [$('#text-0'), $('#text-1'), $('#text-2'), ]

  var counter = 0;
  setInterval(function(){
    loop[counter % loop.length]();

    counter++;
  }, 1200);

});
