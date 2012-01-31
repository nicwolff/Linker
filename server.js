var http = require('http');
var fs = require('fs');

var path = process.argv[2];

var handlers = {

	get_image: function (id, request, response) {},

	put_plist: function (id, request, response) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
	  response.end( [method, resource].join('_') + '\n' );
	}

};

var contentTypesByExtension = {
    'html': "text/html",
    'js':   "text/javascript"
};

function send_page_XML (fileExtension) {
	var contentType = contentTypesByExtension[fileExtension] || 'text/plain';
}

console.log( 'Looking for Replica.plist in ' + path );

http.createServer( function (request, response) {
	console.log('Got request for ' + request.url);
	var method = request.method.toLowerCase();
	var pathParts = request.url.split('/');
	var resource = pathParts[1];
	var id = pathParts[2];
	var h;
	if ( h = handlers[ [method, resource].join('_') ] ) {
		h( id, request, response );
	}
} ).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');