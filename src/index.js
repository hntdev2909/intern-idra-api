const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const CronJob = require('cron').CronJob;

// Make server don't sleep
const job = new CronJob(
	'59 * * * * *',
	function () {
		console.log("Cron job make app don't sleep");
	},
	null,
	true,
	'Asia/Ho_Chi_Minh'
);
job.start();

const db = require('./config/db');
const app = express();

require('dotenv').config({ path: __dirname + '/./.env' });
const route = require('./routes');
const { ConnectionStates } = require('mongoose');

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
