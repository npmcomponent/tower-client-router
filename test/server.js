var http = require('http')
  , fs = require('fs')
  , path = require('path');

http.createServer(function (req, res){
  var file = '/' == req.url ? req.url : req.url.replace('/', '')
    , type;

  switch (file) {
    case 'index.js':
      type = 'text/javascript';
      file = 'test/index.js';
      break;
    case 'build/build.js':
      type = 'text/javascript';
      //file = '../' + file;
      break;
    case 'index.css':
      type = 'text/css';
      break;
    case 'build/build.css':
      type = 'text/css';
      //file = '../' + file;
      break;
    case '/':
      type = 'text/html';
      file = 'test/index.html';
      break;
    default:
      file = undefined;
      break;
  }

  if (file) {
    res.writeHead(200, { 'Content-Type': type });
    res.end(fs.readFileSync(file)); 
  }
}).listen(3000);