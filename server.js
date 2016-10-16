const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const MongoClient = require('mongodb').MongoClient;
var db;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var tasks = [];
const mongodbUri = "mongodb://localhost:27017";

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

		if (index.length > 0) {
			tasks[index[0]].description = task.description;
			db.collection('tasks').update({ id: task.id },  { $set: { description: task.description } });
		}
		else 
			pushTask(createTask(task.description));
	}
	else {
		pushTask(createTask(task.description));
	}

	res.json(tasks);
});

app.post("/delete-task", function(req, res)
{
	const id = req.body.id;

	index = tasks.map(function(obj, index) {
	    if(obj.id === id) {
	        return index;
	    }
	}).filter(isFinite);

	if (index.length > 0) {
		tasks.splice(index[0], 1);

		db.collection('tasks').remove( { id: id } );
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

MongoClient.connect(mongodbUri, function(err, database) {
	if (err) return console.error(err);
	
	app.listen(3000, function() {
		console.log('listening on 3000');
	});

	db = database;
	db.collection('tasks').find().toArray(function(err, results) {
		tasks = results;
	});
});

function pushTask(task, callback) {
	db.collection('tasks').save(task, function(err, result) {
		if (err) 
			return console.error(err);
	});

	tasks.push(task);
}

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

