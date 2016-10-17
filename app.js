var router = require('./router.js');
//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

//Create a web server

var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(request, response) {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);
