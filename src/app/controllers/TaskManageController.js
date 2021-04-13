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
			.then((response) => {
				Columns.findOneAndUpdate(
					{ columnName: 'columnOne' },
					{
						$push: {
							tasksId: { id },
						},
					}
				)
					.then((response) => res.send(task))
					.catch((err) => console.log(err));
			})
			.catch('Error');
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
		let id = req.params.id;
		Tasks.findByIdAndUpdate(
			id,
			{
				newData: req.body.task.newData,
			},
			{ new: true }
		)
			.then((response) => {
				res.send(response);
			})
			.catch((err) => console.log('Error', err));
	}

	// [PUT] /colums/:id
	async editColumns(req, res) {
		let cols = await Columns.find({});
		let { draggableId, source, destination } = req.body.data.result;

		let start, finish;

		if (
			source &&
			destination &&
			source.droppableId &&
			destination.droppableId
		) {
			if (source.droppableId === destination.droppableId) {
				for (let column of cols) {
					if (column._id == source.droppableId) {
						start = column;
					}
				}
			} else {
				for (let column of cols) {
					if (column._id == source.droppableId) {
						start = column;
					}

					if (column._id == destination.droppableId) {
						finish = column;
					}
				}
			}

			if (start === finish) {
				start.tasksId.splice(source.index, 1);
				start.tasksId.splice(destination.index, 0, { id: draggableId });
			} else {
				start.tasksId.splice(source.index, 1);

				finish.tasksId.splice(destination.index, 0, { id: draggableId });
			}

			Columns.findByIdAndUpdate(start._id, { tasksId: start.tasksId })
				.then(() => {
					if (start !== finish) {
						Columns.findByIdAndUpdate(finish._id, { tasksId: finish.tasksId })
							.then(() => {
								console.log('Changed');
							})
							.catch(() => console.log('Err between col'));
					}
					Columns.find({})
						.then((response) => res.send(response))
						.catch((err) => console.log(err));
				})
				.catch(() => console.log('Err in col'));
		} else {
			res.status(500).send('Err');
		}
	}

	// [DELETE] //DONE
	async destroy(req, res) {
		let { columnId, taskId } = req.body;
		Tasks.findByIdAndDelete(req.params.id)
			.then(() => console.log('delete success'))
			.catch(() => console.log('fail'));

		Columns.findOne({ _id: columnId }, function (error, doc) {
			if (error) {
				res.status(500).send('Error');
			} else if (doc) {
				var records = { records: doc };
				var idx = doc.tasksId
					? doc.tasksId.findIndex((item) => item.id == taskId)
					: -1;
				if (idx !== -1) {
					doc.tasksId.splice(idx, 1);
					doc.save(function (error) {
						if (error) {
							res.status(500).send('Error');
						} else {
							res.send(records);
						}
					});
					return;
				}
			}
			res.status(500).send('Error');
		});
	}
}

module.exports = new TaskManageController();
