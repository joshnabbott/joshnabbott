var consoleLoaded = false;

// PandoraBots stuff
var uri    = 'http://pandorabots.heroku.com';
var botid  = 'ff62f374fe343f73';
var custid = getCache('custid');


function unloadConsole() {
  if(!consoleLoaded) return false;

  console.log("Unloading console...");
  $('body').html(getCache('originalContent'));
  consoleLoaded = false;
}

function loadConsole() {
  if(consoleLoaded) return false;

  console.log("Loading console...");

  // Save original content of page for wheneconsole needs to be quit
  setCache('originalContent', $('body').html());

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
    if(event.which == 27) {
      // esc was pressed
      unloadConsole();
    } else if(event.which == 13) {
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
      parseData(data);
    },
    error: function(description, message) {
      console.log('Blech' + description + ': ' + message);
    }
  });

  function parseData(data) {
    custid = data.result.custid;
    setCache('custid', custid);

    var response = '<pre>' + sanitizeResponse(data.result.that) + '\n</pre>';

    $console_viewer.append(response);
    $console_viewer.scrollTop($console_viewer[0].scrollHeight);
  }
}


// Wrapper for window.localStorage.getItem(key)
function getCache(key) {
  return window.localStorage.getItem(key) || ''
}

// Wrapper for window.localStorage.setItem(key, data)
function setCache(key, data) {
  window.localStorage.setItem(key, data);
}

function sanitizeResponse(string) {
  // A lot of responses are coming back with multiple spaces
  // this replaces multiple spaces for just one
  return string.replace(/\s{2,}/g, ' ');
}

