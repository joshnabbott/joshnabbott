var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  });

  console.log('Request\n');

  response.end('Hello World\n');
}).listen(8124, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8124/');
