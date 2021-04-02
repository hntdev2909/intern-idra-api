const todoListRouter = require('./todoList');
const countdownRouter = require('./countdown');
const taskManageRouter = require('./taskManage');

function route(app) {
	app.use('/todolist', todoListRouter);

	app.use('/countdown', countdownRouter);

	app.use('/taskmanage', taskManageRouter);
}

module.exports = route;
