var http = require('http');
var fs = require('fs');

var path = process.argv[2];

var route = {
	'/': list_pages,
	'/plist': plist
};

var contentTypesByExtension = {
    'html': "text/html",
    'js':   "text/javascript"
};

function list_pages (argument) {
	// body...
}

function plist (argument) {
	// body...
}

function send_page_XML (fileExtension) {
	var contentType = contentTypesByExtension[fileExtension] || 'text/plain';
}

console.log( 'Looking for Replica.plist in ' + path );

http.createServer( function (request, response) {
	console.log('Got request for ' + request.url);
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
} ).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');