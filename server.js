var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),

	rootPath = process.argv[2],

	contentTypes = {
	    html:  'text/html',
	    js:    'text/javascript',
	    jpg:   'image/jpeg',
		plist: 'text/xml'
	},

	handlers = {

		GET: function (resource, request, response) {

			var fullPath = rootPath + resource;
			console.log( 'GET ' + resource );

			if ( ! path.existsSync(fullPath) ) {
				response.writeHead( 404, 'Not Found' );
				response.end();
				console.error( 'Not found: ' + resource );
				return false;
			}

			var stats = fs.statSync(fullPath);

			var masterPlist;

			if ( stats.isDirectory() ) {
				var html = '<p>Directory listing of %s</p>'.sprintf( resource );
				fs.readdirSync( fullPath ).every( function (file) {
					if ( file.match( /^\.DS_Store/ ) ) return true;
					if ( masterPlist = file.match( /^(reportSession.*|Replica\.plist)$/ ) ) {
						masterPlist = masterPlist[0];
						resource = 'linker.html';
						fullPath = resource;
						return false;
					}
					html += '<a href="%s/">%s</a><br>'.sprintf( resource+file, file );
					return true;
				} );
				if ( ! masterPlist ) {
					response.writeHead( 200, {
						'Content-Type': 'text/html',
						'Content-Length': html.length
					} );
					response.end( html );
					return; // from GET handler
				}
			}

			var extension = resource.split('.').pop();

			fs.stat( fullPath, function (error, stat) {
				if (error) {
					response.writeHead( 500, 'Error while reading %s: %s'.sprintf( resource, error ) );
				  response.end();
				} else {
					var filesize = stat.size;
					if ( resource == 'linker.html' ) {
						var script = '<script>var reqURL = "%s", masterPlist = "%s";</script>\n\n'
							.sprintf( request.url, masterPlist );
						filesize += script.length;
					}
					response.writeHead( 200, {
						'Content-Type': contentTypes[extension] || 'text/plain',
						'Content-Length': filesize
					} );
					if ( script ) response.write( script );
					fs.createReadStream( fullPath )
						.on( 'error', function (err) { console.error(err) } )
						.pipe( response );
				}
			} );

		},

		PUT: function (resource, request, response) {

			var fullPath = rootPath + resource;
			console.log( 'PUT ' + fullPath );

			var body = '';
			request.on('data', function (data) { body += data.toString() } );

			request.on('end', function () {

				console.log( 'DATA: ' + body );

				fs.writeFile( fullPath, body, 'utf8', function (err) {
					if (err) { console.error( 'Error during write: ' + err ) };
					console.log( 'Saved file ' + fullPath );
					response.writeHead( 202, 'Accepted' );
					response.end();
				} );
			} );

		}

	};

console.log( 'Looking for files in ' + rootPath );

String.prototype.sprintf = function () {
	var args = arguments, i = 0;
	return this.replace( /\%s/g, function () { return args[i++] } );
}

http.createServer( function (request, response) {
	var method = request.method.toUpperCase();
	var resource = decodeURI(url.parse(request.url).pathname);
	if ( resource.match( /\/\.\.\//g ) ) {
		response.writeHead( 403, 'Forbidden' );
		response.end();
		console.error( 'Illegal request for ' + resource );
		return;
	}
	console.log( 'Routing request for %s to %s(%s)'.sprintf( request.url, method, resource ) );
	var h;
	if ( h = handlers[ method ] ) {
		h( resource, request, response );
	} else {
		response.writeHead( 405, 'Method %s not allowed on resource %s'.sprintf( method, resource ) );
	  response.end();
	}
} ).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
