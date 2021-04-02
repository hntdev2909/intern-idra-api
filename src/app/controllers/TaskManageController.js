class TaskManageController {
	// [GET] /taskmanage
	index(req, res) {
		res.send('GET taskmanage');
	}
}

module.exports = new TaskManageController();
