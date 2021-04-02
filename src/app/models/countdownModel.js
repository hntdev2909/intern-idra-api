const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Countdown = new Schema({
	name: String,
});

module.exports = mongoose.model('Countdown', Countdown);
