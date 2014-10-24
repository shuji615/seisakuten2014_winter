var sprites;
var texts;
var imageClasses = [
  'bigmark-c',
  'bigmark-m',
  'bigmark-y',
];

// jqueryの実装
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

// 整列の実装

var moveToHorizontal = function() {
    sprites[0].moveTo(0.3, 0.5, 0.2, 0.2);
    sprites[1].moveTo(0.5, 0.5, 0.2, 0.2);
    sprites[2].moveTo(0.7, 0.5, 0.2, 0.2);
    $('.sprite').transition({
      scale: 4,
      duration: 0.2
    });
};

var moveToTriangle = function () {
    var radius = 0.3;
    var a0 = Math.PI / 2 * 3;

    for (var i = 0; i < sprites.length; i++) {
      var a = a0 + i * Math.PI * 2 / 3;
      var x = 0.5 + radius * Math.cos(a);
      var y = 0.5 + radius * Math.sin(a);
      sprites[i].moveTo(x, y, 0.2, 0.2);
    }
    $('.sprite').transition({
      scale: 1,
      duration: 0.2,
    });
}

var keel = function () {
  $('.sprite').keel();
};

var showText = function(){
  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    var text = texts[i];
    var pos = sprite.position();
    text.css({
      left: pos.left + sprite.width(),
      top:  pos.top + sprite.height() / 2 - text.height() / 2,
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
};

// loop
var loop = [
  function(){
    moveToHorizontal();
  },
  function(){
    keel();
  },
  function(){
    moveToTriangle();
  },
  function(){
    showText();
  },
  function(){
    hideText();
  },
];

// main

$(function(){
  sprites = [$('#sprite-0'), $('#sprite-1'), $('#sprite-2'), ];
  texts = [$('#text-0'), $('#text-1'), $('#text-2'), ]

  var counter = 0;
  setInterval(function(){
    for (var i = 0; i < imageClasses.length; i++) {
      $('.sprite').removeClass(imageClasses[i]);
    }
    $('.sprite').addClass(imageClasses[counter % imageClasses.length]);

    loop[counter % loop.length]();

    counter++;
  }, 1000);

});
