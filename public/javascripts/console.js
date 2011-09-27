Console = {
  loaded: false,

  uri: 'http://pandorabots.heroku.com',
  botid: 'ff62f374fe343f73',
  custid: window.localStorage.getItem('custid') || '',
  responseWrapper: '<pre></pre>',
  $inputStyles: {
    'background-color' : 'transparent',
    'border-width'     : 0,
    'color'            : '#cacaca',
    'display'          : 'table-cell',
    'font-family'      : 'inherit',
    'font-size'        : '14px',
    'height'           : '14px',
    'vertical-align'   : 'middle',
    'width'            : '100%'
  },

  load: function() {
    var self = this;

    if(this.loaded) return false;

    console.log('Loading console...');

    this.setCache('originalContent', $('body').html());

    this.$input  = $('<input></input>', { 'type' : 'text', 'name' : 'console', 'id' : 'console', 'autocomplete' : 'off' });
    this.$viewer = $('<div></div>', { 'id': 'console-viewer' });

    this.$input.css(this.$inputStyles);

    $('body').html(this.$input);
    $('body').prepend(this.$viewer);

    this.$input.focus();

    $(document).bind('keyup', function(event) {
      if(event.which == 27) {
        // esc was pressed
        self.unload();
      } else if(event.which == 13) {
        // Submit user input and see what happens
        if(self.$input.val()) {
          self.submitQuery(self.$input.val());
        } else {
          return false;
        }
      } else {
        // Maybe do something here?
      }
    });

    // Load the history
    this.loadHistory();

    this.loaded = true;
  },

  unload: function() {
    if(!this.loaded) return false;

    console.log('Unloading console...');

    // Set the history for this sessions before unloading
    this.setCache('history', this.$viewer.html());
    // Retrieve the original content and set it as the body
    $('body').html(this.getCache('originalContent'));
    // Tell Console it's been unloaded
    this.loaded = false;
  },

  submitQuery: function(message) {
    var self = this;

    this.$viewer.append('<pre>&#8658; ' + message + '</pre>');
    this.$input.val('');

    $.ajax({
      url: this.uri,
      dataType: 'json',
      data: { 'botid': this.botid, 'message': message, 'custid': this.custid },
      success: function(data) {
        self.parseData(data);
      },
      error: function(description, message) {
        console.log('Blech' + description + ': ' + message);
      }
    });
  },

  parseData: function(data) {
    this.custid = data.result.custid;
    this.setCache('custid', this.custid);

    var response = $(this.responseWrapper).html(this.sanitizeResponse(data.result.that));

    this.$viewer.append(response);
    this.positionViewer();
  },

  getCache: function(key) {
    return window.localStorage.getItem(key) || '';
  },

  setCache: function(key, data) {
    window.localStorage.setItem(key, data);
  },

  appendCache: function(key, data) {
    window.localStorage[key] += data;
  },

  sanitizeResponse: function(dirtyString) {
    // A lot of responses are coming back with multiple spaces
    // this replaces multiple spaces for just one
    return dirtyString.replace(/\s{2,}/g, ' ');
  },

  positionViewer: function() {
    this.$viewer.scrollTop(this.$viewer[0].scrollHeight);
  },

  loadHistory: function() {
    this.$viewer.html(this.getCache('history'));
    this.positionViewer();
  }
}

