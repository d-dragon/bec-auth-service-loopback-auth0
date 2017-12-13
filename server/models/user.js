'use strict';

var client_id = '8tPu6suZ3KtNzsIMskqE43kVMgXPtjru'; // bec-auth-service client
var client_secret = 'ulPfafRrmL7xfr6O9RfbHXB82GP2Pt7VGIJnnHffMZJkb8dL1CLbXYMNQRLgWu8a';
var connection = 'Username-Password-Authentication';
var audience = 'http://192.168.1.122:3000/api';
var signin_url = 'https://bec-authen-demo.auth0.com/oauth/token';
var signup_url = 'https://bec-authen-demo.auth0.com/dbconnections/signup';
var logout_url = 'https://bec-authen-demo.auth0.com/v2/logout';

module.exports = function(User) {
	User.remoteMethod('login', {
		accepts: [
			{arg: 'email', type: 'string', required: true},
			{arg: 'pass', type: 'string', required: true}
		],
		http: {path: '/login', verb: 'post'},
		returns: {arg: 'token', type: 'Object'}
	});

	User.remoteMethod('signup', {
		accepts: [
		{arg: 'email', type: 'string', required: true},
		{arg: 'password', type: 'string', required: true},
		{arg: 'fist_name', type: 'string', required: true},
		{arg: 'last_name', type: 'string', required: true},
		{arg: 'role', type: 'string', required: true}
		],
		http: {path: '/signup', verb: 'post'},
		returns: {arg: 'result', type: 'Object'}
	});

	User.remoteMethod('logout', {
		http: {path: '/logout', verb: 'post'},
		returns: {arg: 'result', type: 'Object'}
	});

	// Login endpoint logic
	User.login = function(email, password, callback) {

		console.log("calling Auth0 login");

		var request = require("request");

		var options = { method: 'POST',
						url: signin_url,
						headers: { 'content-type': 'application/json'},
						body:
						{
							grant_type: 'password',
							username: email,
							password: password,
							audience: audience,
							client_id: client_id,
							client_secret: client_secret},
						json: true 
		};

		request (options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
			callback(null, body);
		});
	};

	// Signup endpoint logic
	User.signup = function(email,
							password,
							fist_name,
							last_name,
							role,
							callback) {
		console.log("calling Auth0 signup");

		var request = require("request");

		var options = { method: 'POST',
						url: signup_url,
						headers: { 'content-type': 'application/json'},
						body:
						{
							client_id: client_id, 
							email: email,
							password: password,
							connection: connection,
							user_metadata: {fist_name: fist_name,
											last_name: last_name,
											role: role}
						},
						json: true

		};
		
		request(options, function(error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
			callback(null, body);
		});
	};
	
	// Logout endpoinst logic
	User.logout = function(callback)	{
		console.log('calling Auth0 logout');

		var request = require("request");

		var options = { method: 'GET',
						url: logout_url,
						headers: { 'content-type': 'application/json'},
						body:
						{
							client_id: client_id,
							//returnTo: 'http://192.168.1.122:3000/explorer'
							//returnTo: 'http://192.168.1.122:3001/api/users'
						},
						json: true
		};
		request(options, function(error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
			callback(null, body);
		});
	};
};

