process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var http2 =require('http2'),
	dns = require('dns'),
	readline = require('readline'),
	rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false
	});

console.log("[");

rl.on('line', function(ip_address){
	pcounted += 1;
    dns.reverse(ip_address, function (err, domains) {
      if (err) {
      	shipit({
      		error: err.message
      	});
      } else {
      	pcounted += domains.length > 0 ? (domains.length - 1) : 0;
      	domains.forEach(function(domain){
      		try{
	      		findit(domain, function(resp){
	      			shipit(resp);
	      			close();
	      		});
      		} catch( e ){
		      	shipit({
		      		error: e
		      	});
      		}
      	});
      }
    });

});

function shipit(findings){
	console.log(JSON.stringify(findings)+",");
}

//TODO: check http urls too (need to monkey patch node_modules/http2/lib/http.js:843)
function findit(domain, callback){
		var req = http2.get('https://'+domain+'/', function(response) {
		 	var findings = {
		 		request: response.req._header,
				response: {
					headers: response.headers
				}
			};

			callback(findings);
		});

		req.on('error', function(err){
			callback({error: err.message});
		});
}

//output footer in json
var pcounted = 0;
var pcomplete = 0;
function close() {
	pcomplete += 1;
	if( pcomplete === pcounted ){
		console.log("]");
		process.exit();
	}
}
