const Transaction = require('../models/transactionModel');

class TransactionController {
	// [GET] /transaction
	index(req, res, next) {
		Transaction.find({})
			.then((response) => res.send(response))
			.catch(next);
	}

	create(req, res, next) {
		const newTask = new Transaction(req.body);
		newTask
			.save()
			.then((task) => res.send(task))
			.catch(() => res.status(304).send('Error when create'));
	}

	edit(req, res, next) {
		Transaction.findByIdAndUpdate(req.params.id, req.body)
			.then((resUpdate) => res.send('Update complete'))
			.catch(() => res.status(304).send('Error when update'));
	}
}

module.exports = new TransactionController();
