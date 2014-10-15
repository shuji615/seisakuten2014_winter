$(function(){
  $('#nav .link a').click(function(e){
    e.preventDefault();
    window.location.href = e.target.parentNode.href;
  });
});

