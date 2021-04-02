const morgan = require('morgan');
const express = require('express');

const db = require('./config/db');
const app = express();
const port = 3030 || 8080;

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

app.listen(port, () => {
	console.log('App listening on port 3000');
});
