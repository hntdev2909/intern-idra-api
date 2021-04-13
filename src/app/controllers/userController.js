const User = require('../models/userModel');

class UserController {
	// [POST] /user
	create(req, res, next) {
		const newUser = new User(req.body);
		newUser
			.save()
			.then((task) => res.send(task))
			.catch(() => res.status(304).send('Error when create'));
	}
}

module.exports = new UserController();
