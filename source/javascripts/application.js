$(document).ready(function() {
  $('body').append(function() {
    var script = '<script src="/javascripts/console.js">\x3C/script>';
    script += '<!--[if lt IE 10]>';
    script += '<script src="/javascripts/jquery.iecors.js">\x3C/script>';
    script += '<![endif]-->';
    return script;
  });

  $('body').click(function() {
    if(Console.loaded) {
      Console.$input.focus();
    } else {
      Console.load();
    }
  })
})

