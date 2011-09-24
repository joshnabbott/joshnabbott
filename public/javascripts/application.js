$(document).ready(function() {
  $('body').append('<script src="public/javascripts/console.js">\x3C/script>');

  $('body').click(function() {
    if(consoleLoaded) {
      $('#console').focus();
    } else {
      loadConsole();
    }
  })
})

