'use strict';

module.exports = function(User) {
	User.remoteMethod('login', {
		accepts: [
			{arg: 'email', type: 'string', required: true},
			{arg: 'pass', type: 'string', required: true}
		],
		http: {path: '/login', verb: 'post'},
		returns: {arg: 'token', type: 'Object'}
	});

	// Login endpoint logic
	User.login = function(email, pass, callback) {

		console.log("calling Auth0 login");

		var request = require("request");

		var options = { method: 'POST',
						url: 'https://bec-authen-demo.auth0.com/oauth/token',
						headers: { 'content-type': 'application/json'},
						body:
						{
							grant_type: 'password',
							username: email,
							password: pass,
							audience: 'http://192.168.1.122:3000/api',
							client_id: '8tPu6suZ3KtNzsIMskqE43kVMgXPtjru',
							client_secret: 'ulPfafRrmL7xfr6O9RfbHXB82GP2Pt7VGIJnnHffMZJkb8dL1CLbXYMNQRLgWu8a'},
						json: true 
		};

		request (options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
			callback(null, body);
		});
	}
};

