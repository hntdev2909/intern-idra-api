const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todolist = new Schema({
	content: String,
	isCompleted: Boolean,
});

module.exports = mongoose.model('Todolist', Todolist);
