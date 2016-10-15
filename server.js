var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var tasks = [{ description: "Create your first task", done: false, id: generateUUID() }];

app.get("/", function(req, res)
{
    res.sendFile("index.html", {"root": __dirname});
});

app.get("/tasks", function(req, res)
{
	res.json(tasks);
});

app.post("/new-task", function(req, res)
{
	var task = JSON.parse(req.body.content);

	if (task.hasOwnProperty("id")) {
		index = tasks.map(function(obj, index) {
		    if(obj.id === task.id) {
		        return index;
		    }
		}).filter(isFinite);

		if (index.length > 0)
			tasks[index[0]].description = task.description;

		else
			tasks.push(createTask(task.description));
	}
	else {
		tasks.push(createTask(task.description));
	}

	res.json(tasks);
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
	console.log('ToDo List app listening on port 3000!');
});

function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
}

function createTask(taskDescription) {
	return { description: taskDescription, done: false, id: generateUUID() };
}
