const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const Transaction = new Schema({
	billId: String,
	timesIn: Date,
	timesOut: Date,
	total: { type: SchemaTypes.Double },
	listItem: Array,
	vat: Number,
	subtotal: { type: SchemaTypes.Double },
});

module.exports = mongoose.model('Transaction', Transaction);
