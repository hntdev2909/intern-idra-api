const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	email: String,
	password: String,
	fname: String,
	lname: String,
	dob: String,
	idnumber: Number,
	address: String,
	phonenumber: Number,
});

module.exports = mongoose.model('User', User);
