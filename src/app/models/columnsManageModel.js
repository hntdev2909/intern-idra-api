const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnsManage = new Schema({
	columnName: String,
	title: String,
	tasksId: [],
});

module.exports = mongoose.model('columnsManage', ColumnsManage);
