var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var path = process.argv[2];
console.log( 'Looking for files in ' + path );

var handlers = {

	GET: function (resource, request, response) {
	  console.log('In GET');

		var extension = resource.split('.').pop();

		fs.readFile(
			path + '/' + resource,
			function (err, data) {
			  if ( err ) {
			    console.error("Could not open file: %s", err);
					response.writeHead(404, 'File not found');
				  response.end();
			  }
				response.writeHead( 200, { 'Content-Type': contentTypes[extension] } );
			  response.end( data );
		} );

	},

	PUT: function (resource, request, response) {
	  console.log('In PUT');

		var body = '';

		request.on('data', function (data) { body += data } );

		request.on('end', function () {
			var data = qs.parse(body);
			fs.writeFile( path + '/' + resource, data, 'utf8', function (err) {
				if (err) throw err;
				console.log('It\'s saved!');
			} );
		  handlers['GET']( resource, request, response );
		} );

	}

};

var contentTypes = {
    html: 'text/html',
    js:   'text/javascript',
		plist:'text/xml'
};

String.prototype.printf = function () {
	var args = arguments;
	var i = 0;
	return this.replace( /\%s/g, function () { return args[i++] } );
}

function send_page_XML (fileExtension) {
	var contentType = contentTypesByExtension[fileExtension] || 'text/plain';
}

http.createServer( function (request, response) {
	console.log('Got request for ' + request.url);
	var method = request.method.toUpperCase();
	var pathParts = request.url.split('/');
	var resource = pathParts[1];
	console.log('About to route to %s(%s)'.printf(method, resource));
	var h;
	if ( h = handlers[ method ] ) {
		h( resource, request, response );
	} else {
		response.writeHead(405, 'Method %s not allowed on resource %s'.printf( method, resource));
	  response.end();
	}
} ).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');