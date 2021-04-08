const Tasks = require('../models/taskManageModel');
const Columns = require('../models/columnsManageModel');
const ColumnOrder = require('../models/columnOrderManageModel');
const mongoose = require('mongoose');

class TaskManageController {
	// [GET] /taskmanage --- DONE
	index = async (req, res) => {
		const tasks = await Tasks.find({});
		const columns = await Columns.find({});
		const columnOrder = await ColumnOrder.find({});
		res.send({ tasks, columns, columnOrder });
	};

	// [CREATE] /create/task --- DONE
	createTask = async (req, res) => {
		let id = mongoose.Types.ObjectId();
		let task = new Tasks({
			_id: id,
			taskId: id,
			newData: {
				id: id,
				...req.body.task.newData,
			},
		});

		task
			.save()
			.then((response) => res.send(task))
			.catch('Error');

		Columns.findOneAndUpdate(
			{ columnName: 'columnOne' },
			{
				$push: {
					tasksId: id,
				},
			}
		)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	// [CREATE] /create/columnorder --- DONE
	createColumnOrder(req, res) {
		let columnOrder = new ColumnOrder(req.body);

		columnOrder
			.save()
			.then((response) => res.send('Created'))
			.catch('Error');
	}

	// [CREATE] /create/columns --- DONE
	createColumns(req, res) {
		let columns = new Columns(req.body);
		console.log(req.body);
		columns
			.save()
			.then((response) => res.send('Created'))
			.catch('Error');
	}

	// [PUT] /tasks/:id // DONE
	editTasks(req, res) {
		console.log(req.params.id, req.body);
		Tasks.findByIdAndUpdate(req.params.id, {
			newData: req.body.task.newData,
		})
			.then((res) => console.log('Updated', res))
			.catch((err) => console.log('Error', err));
	}

	// [PUT] /colums/:id
	async editColumns(req, res) {
		let cols = await Columns.find({});
		let { draggableId, source, destination } = req.body.data.result;

		let start, finish;

		for (let column of cols) {
			if (column._id == source.droppableId) {
				start = column;
			}

			if (column._id == destination.droppableId) {
				finish = column;
			}
		}

		if (start === finish) {
			start.tasksId.splice(source.index, 1);
			start.tasksId.splice(destination.index, 0, draggableId);
		} else {
			start.tasksId.splice(source.index, 1);

			finish.tasksId.splice(destination.index, 0, draggableId);
		}

		Columns.findByIdAndUpdate(start._id, { tasksId: start.tasksId })
			.then(() => console.log('Changed in col'))
			.catch(() => console.log('Err in col'));
		if (start !== finish) {
			Columns.findByIdAndUpdate(finish._id, { tasksId: finish.tasksId })
				.then(() => console.log('Changed between col'))
				.catch(() => console.log('Err between col'));
		}
	}

	// [DELETE] //DONE
	async destroy(req, res) {
		Tasks.findByIdAndDelete(req.params.id)
			.then(() => console.log('delete success'))
			.catch(() => console.log('fail'));
		let columns = await Columns.find({});
		let tmpTasksId;
		let id;
		columns.map((column) => {
			let tmpIndex = column.tasksId.indexOf(req.params.id);
			if (tmpIndex >= 0) {
				id = column._id;
				column.tasksId.splice(tmpIndex, 1);
				tmpTasksId = column.tasksId;
			}
		});
		Columns.findByIdAndUpdate(id, {
			tasksId: tmpTasksId,
		})
			.then((res) => console.log('Updated', res))
			.catch(() => console.log('Fail'));
	}
}

module.exports = new TaskManageController();
