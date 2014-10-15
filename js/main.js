$(function(){
  $('#nav .link a').click(function(e){
    e.preventDefault();
    console.log(this.attr('href'));
  });
});