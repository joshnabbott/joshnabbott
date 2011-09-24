var consoleLoaded = false;
// PandoraBots stuff
var uri    = 'http://pandorabots.heroku.com';
var botid  = 'ff62f374fe343f73';
var custid = '';


function unloadConsole() {
  $('body').html(window.localStorage.getItem('originalContent'));
  consoleLoaded = false;
}

function loadConsole() {
  if(consoleLoaded) return false;

  console.log("Loading console...");

  // Save original content of page for wheneconsole needs to be quit
  window.localStorage.setItem('originalContent', $('body').html());

  var $input = $('<input></input>', { 'type' : 'text', 'name' : 'console', 'id' : 'console', 'autocomplete' : 'off' });
  var $viewer = $('<div></div>', { 'id': 'console-viewer' });

  $input.css({
    'background-color' : 'transparent',
    'border-width'     : 0,
    'color'            : '#cacaca',
    'display'          : 'table-cell',
    'font-family'      : 'inherit',
    'font-size'        : '14px',
    'height'           : '14px',
    'vertical-align'   : 'middle',
    'width'            : '100%'
  });

  $('body').html($input);
  $('body').prepend($viewer);

  $input.focus();

  $(document).bind('keyup', function(event) {
    if(event.keyCode == 27) {
      // esc was pressed
      unloadConsole();
    } else if(event.keyCode == 13) {
      // Submit user input and see what happens
      if($input.val()) {
        submitQuery($input.val());
      } else {
        return false;
      }
    } else {
      // Maybe do something here?
    }
  })
  consoleLoaded = true;
}

function submitQuery(message) {
  console.log("Submitting query...");

  var $console = $('#console');
  var $console_viewer = $('#console-viewer');

  $console_viewer.append('<pre>&#8658; ' + $console.val() + '\n</pre>');
  $console.val('');

  $.ajax({
    url: uri,
    dataType: 'json',
    data: { 'botid': botid, 'message': message, 'custid': custid },
    success: function(data) {
      console.log(data);
      $console_viewer.append('<pre>' + sanitizeResponse(data.result.that) + '\n</pre>');

      $console_viewer.scrollTop($console_viewer[0].scrollHeight);

      // Set this for subsequent requests
      custid = data.result.custid;
    },
    error: function(description, message) {
      console.log('An error occurred: ' + description + ': ' + message);
    }
  });
}

function sanitizeResponse(string) {
  // A lot of responses are coming back with multiple spaces
  // this replaces multiple spaces for just one
  return string.replace(/\s{2,}/g, ' ');
}


