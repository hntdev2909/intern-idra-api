const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoList = new Schema(
	{},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('TodoList', TodoList);
