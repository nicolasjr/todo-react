var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res)
{
    res.sendFile("index.html", {"root": __dirname});
});

app.use(function(error, req, res, next) {

	if (error) {

		if (!error.status) {
			console.error(error);
			error.message = 'Unexpected error.';
			error.status = 500;
		}

		return res.status(error.status).send(error.message || 'Unexpected error.');
	}

	next();
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

