const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskManage = new Schema({
	_id: Schema.Types.ObjectId,
	taskId: Schema.Types.ObjectId,
	newData: {
		id: Schema.Types.ObjectId,
		content: String,
		tag: {
			name: String,
			bgColor: String,
			color: String,
		},
		title: String,
		createdAt: String,
	},
});

module.exports = mongoose.model('TaskManage', TaskManage);
