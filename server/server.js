'use strict';

//initailizations
const express = require('express');
const path = require('path');
const cors = require('cors');
const Queue = require('./queue.js');
const app = express();
const {PORT, CLIENT_ORIGIN} = require('../src/config.js');
app.use(cors({ origin: CLIENT_ORIGIN }));


// ifor CORS
app.use(function(req, res, next) 
{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
	if (req.method === 'OPTIONS') {
		return res.send(204);
	}
	next();
});

const questions = [{
	'image': 'https://i.imgur.com/QVByr5l.png',
	'answer': 'a',
	'postion': null,
	'correctAnswer': 'a'
}, {
	'image': 'https://i.imgur.com/tv4s5uF.png',
	'answer': 'b',
	'postion': null,
	'correctAnswer':'b' 
}, {
	'image': 'https://i.imgur.com/649Jbp9.png',
	'answer': 'c',
	'postion': null,
	'correctAnswer':'c' 
}, {
	'image': 'https://i.imgur.com/H6QFKHN.png',
	'answer': 'd',
	'postion': null,
	'correctAnswer':'d' 
}];

let questionQ = new Queue(null, null);

for (let i = 0; i < questions.length; i++) {
	questionQ.enqueue(questions[i]);
}
//Send static files to client
app.use(express.static(path.join(__dirname, './client/public')));
//re-Route requests to our router

app.get('/api/users', (req, res) => {
	console.log('Enter get api/question');
	return res.json(questionQ.peek(questionQ));
});

app.put('api/users', (req, res)=> {
	console.log('Enter put api/user req.body = ', req.body);
	return res.json(questionQ.dequeue());
});


//server functions
let server;

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}


if (require.main === module) {
	runServer();
}

module.exports = { app };