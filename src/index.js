const morgan = require('morgan');
const express = require('express');

require('dotenv').config();
const db = require('./config/db');
const app = express();

const route = require('./routes');

// connect DB;
db.connect();

// log Http
app.use(morgan('combined'));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Route
route(app);

// Port
var serverPort = process.env.PORT || 8080;

app.listen(serverPort, () => {
	console.log(`Listening on port ${serverPort}`);
});
