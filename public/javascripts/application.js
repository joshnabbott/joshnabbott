$(document).ready(function() {
  $('body').append('<script src="public/javascripts/console.js">\x3C/script>');

  $('body').click(function() {
    if(Console.loaded) {
      Console.$input.focus();
    } else {
      Console.load();
    }
  })
})

