function unloadConsole() {
  $('body').html(window.localStorage.getItem('originalContent'));
}

function loadConsole() {
  // Save original content of page in case console needs to be quit
  window.localStorage.setItem('originalContent', $('body').html());

  input = document.createElement('input', { 'type' : 'text', 'name' : 'console', 'id' : 'console' });

  $(input).css({
    'background-color': 'transparent',
    'border-width': 0,
    'color': '#cacaca',
    'display': 'table-cell',
    'font-family': 'inherit',
    'height': '14px',
    'vertical-align': 'middle',
    'width': '100%'
  });

  $('body').html(input);

  $(input).focus();

  $(document).bind('keypress', function(event) {
    if(event.keyCode == 27) {
      // esc was pressed
      unloadConsole();
    } else {
      // Submit user input and see what happens
      return submitQuery();
    }
  })
}

function submitQuery() {
  // put stuff here
}
