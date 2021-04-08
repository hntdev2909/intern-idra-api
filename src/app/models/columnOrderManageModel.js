const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnOrderManage = new Schema({
	columnOrder: [],
});

module.exports = mongoose.model('columnOrderManage', ColumnOrderManage);
