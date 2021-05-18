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

require('dotenv').config({ path: __dirname + '/../.env' });
const route = require('./routes');

// Config Cors
app.use(cors());

app.use(function (req, res, next) {
	// res.header('Access-Control-Allow-Origin', 'http://localhost:5000/manage'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Connect DB;
db.connect();

// Log Http
// app.use(morgan('combined'));

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
