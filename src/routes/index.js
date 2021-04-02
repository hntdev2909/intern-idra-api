const todoListRouter = require('./todoList');
const countdownRouter = require('./countdown');
const taskManageRouter = require('./taskManage');
const homepageRouter = require('./homepage');

function route(app) {
	app.use('/todolist', todoListRouter);

	app.use('/countdown', countdownRouter);

	app.use('/taskmanage', taskManageRouter);

	app.use('/', homepageRouter);
}

module.exports = route;
