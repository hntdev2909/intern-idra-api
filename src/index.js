const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const db = require('./config/db');
const app = express();

require('dotenv').config({ path: __dirname + '/./.env' });
const route = require('./routes');

// Config Cors
app.use(cors());

// Connect DB;
db.connect();

// Log Http
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
