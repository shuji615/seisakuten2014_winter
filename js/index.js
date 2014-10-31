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
  var radius = size;

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

// canvas

var particle = {
    initCss:function(){
        // var canvasWrapper = $('#intro_back');
        var width = $(window).width();
        var height = $('#intro_bridge').height();
        var margin = 200;
        $('#intro_back').css(
            'height', height + margin * 2
        ).css(
            'top', -margin
        );
        // $('#intro_back').css(
        //     'height', height + margin
        // );

    },

    init:function(){
        this.initCss();
        var _this = this;
        var canvasWrapper = $('#intro_back');
        var width = canvasWrapper.width();
        var height = canvasWrapper.height();
        var canvas = document.getElementById('intro_back_canvas');
        var ctx = canvas.getContext("2d");
        var rate = 60;
        var num = 50;
        var size = 70;
        this.eggs = new Array;
        this.animating = false;
        this.toAnimate = false;
        this.visible = true;
        this.visibleEggCounter = 0;

        $("#intro_back_canvas").attr({
            width:width,
            height:height
        });

        this.setSize = function(){
            width = canvasWrapper.width();
            height = canvasWrapper.height();
            $("#intro_back_canvas").attr({
                width:width,
                height:height
            });
        };

        this.Egg = function(){
            this.x = Math.ceil(Math.random()*width);
            this.y = Math.ceil(Math.random()*height);
            this.toX = Math.random()*5 - 2.5;
            this.toY = -(Math.random()*5+1);
            this.r = Math.ceil(Math.random()*255);
            this.g = Math.ceil(Math.random()*255);
            this.b = Math.ceil(Math.random()*255);
            this.size = Math.random()*(size - 10) + 10;
            this.width = this.size * 19 / 20;
            this.height = this.size * 26 / 20;
            this.speed = 30;
            this.age = 0;
            this.rotateSpeed = 0.05;
            this.startRotation = Math.random() * Math.PI * 2;
            this.hidden = true;
        };

        this.Egg.prototype.update = function(){
            //次の描画位置を指定
            this.x = this.x + this.toX * ((this.age < this.speed ? this.age : this.speed) * 0.05);
            this.y = this.y + this.toY * ((this.age < this.speed ? this.age : this.speed) * 0.05);

            //画面外に出た時に反対の位置に移動
            if(this.x > width+this.width){this.x = 0-this.width;};
            if(this.y > height+this.height){this.y = 0-this.height;  };
            if(this.x < -this.width){    this.x = width + this.width;};
            if(this.y < -this.height){
                this.y = height + this.height;
                if(particle.toAnimate && this.hidden){
                    this.hidden = false;
                    particle.visibleEggCounter++;
                }
                if(!particle.toAnimate && !this.hidden){
                    this.hidden = true;
                    particle.visibleEggCounter--;
                }
                this.age = 0;
            };
            this.age++;
        }

        this.Egg.prototype.draw = function(ctx){
            if(this.hidden) return;
            ctx.setTransform(1, 0, 0, 1, this.x, this.y);
            var rotation = this.startRotation + this.age * this.rotateSpeed;
            ctx.rotate(rotation);
            ctx.beginPath();
            var h = this.height;
            var w = this.width;
            var m = 4./3 * (Math.sqrt(2)-1);
            var a = h/5;
            ctx.moveTo(-w, a);
            ctx.bezierCurveTo(-w, h*m+a, -w*m, h, 0, h);
            ctx.bezierCurveTo(w*m, h, w, h*m+a, w, +a);
            ctx.bezierCurveTo(w, -h*m+a, w*m, -h, 0, -h);
            ctx.bezierCurveTo(-w*m, -h, -w, -h*m+a, -w, a);
            ctx.fillStyle = "rgba("+ this.r + ", " + this.g + ", " + this.b + ", .6)";
            ctx.fill();
        };

        for(i=0;i<num;i++){
            this.eggs[i] = new particle.Egg();
        }

        //ループ関数
        this.loop = function(){
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            //キャンバスのクリア
            ctx.clearRect(0, 0, width, height);
            if(!_this.toAnimate && _this.visibleEggCounter == 0){
                _this.animating = false;
                return;
            }
            for(i=0;i<num;i++){
                var egg = _this.eggs[i];
                egg.draw(ctx);//描画
                egg.update();
            };
            //1000分のrate秒の間隔でloop関数を繰り返す
            _this.timerId = requestAnimationFrame(_this.loop,1000/rate);
        };
    },
    startAnimation:function(){
        this.toAnimate = true;
        if(this.animating) return;
        this.animating = true;
        this.loop();
    },
    stopAnimation:function(){
        if(!this.animating) return;
        this.toAnimate = false;
    },
    scroll:function(top){
        if(conotama.is_phone) return;
        var default_top = 820;
        var default_mid = 350;
        var mid = $(window).height()/2;
        $('#intro_wrapper').css(
            'margin-top', (top + mid - (default_top + default_mid)) * 0.8
        );
    },
    show:function(){
        if(this.visible) return;
        $('#intro_wrapper').css(
            'visibility', 'visible'
        );
        this.visible = true;
    },
    hide:function(){
        if(!this.visible) return;
        $('#intro_wrapper').css(
            'visibility', 'hidden'
        );
        this.visible = false;
    },
    resize:function(w, h){
       this.setSize();
    },
    saveImg:function(){
        var canvas = document.getElementById('intro_back_canvas');
        var ctx = canvas.getContext("2d");
        var img = new Image();
            var type = 'image/png';
        //imgオブジェクトのsrcに格納。
        img.src = canvas.toDataURL(type);
        //念のため、onloadで読み込み完了を待つ。
        img.onload = function(){
            //例：現在のウィンドウに出力。
            location.href = img.src;
        };
    },
};

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

  particle.init();

});
