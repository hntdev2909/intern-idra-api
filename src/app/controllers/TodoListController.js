const TodoList = require('../models/todoListModel');

class TodoListController {
	// [GET] /todolist
	index(req, res) {
		res.send('GET todoList');
	}

	// [POST] /todolist/create
	create(req, res) {}

	// [PUT] /todolist/:id
	edit(req, res) {}

	// [DELETE] /todolist/:id
	destroy(req, res) {}
}

module.exports = new TodoListController();
