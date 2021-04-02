const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Countdown = new Schema({
	time: String,
	content: String,
});

module.exports = mongoose.model('Countdown', Countdown);
