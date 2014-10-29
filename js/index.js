var sprites;
var texts;
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
};

$(window).resize(function(){ fitToWindow(); });

// jqueryの拡張
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
      rotate: '0deg',
      duration: 0
    });
    this.transition({
      rotate: '360deg',
    });
  },
});

// 整列の実装

var moveToHorizontal = function() {
    sprites[0].moveTo(0.3, 0.5, 0.2, 0.2);
    sprites[1].moveTo(0.5, 0.5, 0.2, 0.2);
    sprites[2].moveTo(0.7, 0.5, 0.2, 0.2);
    $('.sprite').transition({
      scale: 2,
      duration: 0.2
    });
};

var moveToTriangle = function () {
  var radius = 0.3;
  var origin = {x: 0.5, y: 0.55};
  var a0 = Math.PI / 2 * 3;

  for (var i = 0; i < sprites.length; i++) {
    var a = a0 + i * Math.PI * 2 / 3;
    var x = origin.x + radius * Math.cos(a);
    var y = origin.y + radius * Math.sin(a);
    sprites[i].moveTo(x, y, 0.2, 0.2);
  }
  $('.sprite').transition({
    scale: 1,
    duration: 0.2,
  });
}

var keel = function () {
  $('.sprite').keel();
  if (inverted) {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      sprite.removeClass(imageClassesInverted[i]);
      sprite.addClass(imageClasses[i]);
    }
    $('.text .inverted').addClass('hidden');
    $('.text .default').removeClass('hidden');
    $('#main').css({
      backgroundColor: '#ffffff',
    });
  } else {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      sprite.removeClass(imageClasses[i]);
      sprite.addClass(imageClassesInverted[i]);
    }
    $('.text .inverted').removeClass('hidden');
    $('.text .default').addClass('hidden');
    $('#main').css({
      backgroundColor: '#000000',
    });
  }
  inverted = !inverted;
};

var showText = function(){
  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    var text = texts[i];
    var pos = sprite.position();
    text.css({
      left: pos.left + sprite.width() / 2 - text.width() / 2,
      top:  pos.top + sprite.height(),
    });
    sprite.animate({
      top: pos.top - sprite.height() / 4,
    },{
      queue: false,
      duration: 500,
      easing: 'easeOutElastic'
    });
  }

  $('.text').animate({
    opacity: '1.0',
  },{
    queue: false,
    duration: 500,
  });

};

var hideText = function(){
  $('.text').animate({
    opacity: '0.0',
  },{
      queue: false,
      duration: 200,
  });
  moveToTriangle();
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
  var radius = size / 3;

  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    var a = a0 + i * Math.PI * 2 / 3;
    var x = origin.x + radius * Math.cos(a);
    var y = origin.y + radius * Math.sin(a);
    var pos = sprite.position();
    sprite.animate({
      top: y - sprite.height()/2,
      left: x - sprite.width()/2,
    },{
      queue: true,
      duration: 10
    });
    sprite.animate({
      top: pos.top,
      left: pos.left,
    },{
      queue: true,
      duration: 500,
      easing: 'easeOutElastic',
    });
  }
};

// loop
var loop = [
  function(){
    toggle();
  },
  // function(){
  //   moveToHorizontal();
  // },
  // function(){
  //   keel();
  // },
  // function(){
  //   moveToTriangle();
  // },
  // function(){
  //   showText();
  // },
  // function(){
  //   hideText();
  // },
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
  }, 1000);

});
