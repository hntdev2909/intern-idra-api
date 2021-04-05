const Todolist = require('../models/todoListModel');

class TodoListController {
	// [GET] /todolist
	index(req, res, next) {
		Todolist.find({})
			.then((response) => res.send(response))
			.catch(next);
	}

	// [POST] /todolist/create
	create(req, res) {
		const newTask = new Todolist(req.body);
		newTask
			.save()
			.then((task) => res.send(task))
			.catch(() => res.status(304).send('Error when create'));
	}

	// [PUT] /todolist/:id
	edit(req, res, next) {
		Todolist.findByIdAndUpdate(req.params.id, req.body)
			.then((resUpdate) => res.send('Update complete'))
			.catch(() => res.status(304).send('Error when update'));
	}

	// [PUT] /todolist/change
	change(req, res, next) {
		Todolist.updateMany({}, req.body)
			.then(() => res.send('Update success'))
			.catch(() => res.send('Update fail'));
	}

	// [DELETE] /todolist/:id
	destroy(req, res) {
		Todolist.findByIdAndDelete(req.params.id)
			.then(() => res.send('Deleted'))
			.catch(() => res.send('Error delete'));
	}

	// [DELETE] /todolist/delete
	destroyAll(req, res) {
		Todolist.deleteMany({ isCompleted: true })
			.then(() => res.send('Deleted'))
			.catch(() => res.send('Error delete'));
	}
}

module.exports = new TodoListController();
