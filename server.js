var Express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = Express();

app.use(Express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;

app.post('/action', function(req, res) {
	var user_token = req.body.userToken;

	request({
		method: 'POST',
		url: 'https://inapp.playground.klarna.com/api/v1/users/#{user_token}/orders',
		json: true,
		body: {
			reference: req.body.article_id,
			user_token: user_token,
			name: 'name',
			order_amount: 1,	// rahaa
			tax_amount: 9,		//
			origin_proof: req.body.origin_proof
		}
	}, function(err, response, body) {

		// add basic auth

		if (err) {
			res.json({
				'result': 'error',
				// 'data': data,
				'err': err
			});
		}
		else {
			res.json({
				'result': 'success',
				'err': null
			});
		}
	});
});

app.get('/test', function(req, res) {
	res.send('BUSKR!');
});

app.post('/user', function(req, res) {
	console.log('POST');
	// console.log('req', req);
	console.log('req.body', req.body);

	res.json({
		userId: 'user_xx66xx66',
		name: 'James Elliot',
		description: "I'm the king of the Brick lane",
		iban: '007007007007007'
	});
});

// app.get('/user', function(req, res) {
// 	console.log('GET');
// 	console.log('req.body', req.body);

// 	res.json({
// 		userId: 'XXX',
// 		name: 'Red Hot Chilli Peppers',
// 		iban: '007007007'
// 	});
// });

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('app at http://%s:%s', host, port);
});