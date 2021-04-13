const todoListRouter = require('./todoList');
const countdownRouter = require('./countdown');
const taskManageRouter = require('./taskManage');
const homepageRouter = require('./homepage');
const userRouter = require('./form');

function route(app) {
	app.use('/todolist', todoListRouter);

	app.use('/countdown', countdownRouter);

	app.use('/taskmanage', taskManageRouter);

	app.use('/user', userRouter);

	app.use('/', homepageRouter);
}

module.exports = route;
