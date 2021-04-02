const Countdown = require('../models/countdownModel');

class CountdownController {
	// [GET] /countdown
	index(req, res, next) {
		Countdown.find({})
			.then((item) => res.send(item))
			.catch(next);
	}

	// [POST] /countdown
	create(req, res, next) {
		const countdownTime = new Countdown(req.body);
		countdownTime
			.save()
			.then(() => res.status(200).send('Created'))
			.catch(next);
	}
}

module.exports = new CountdownController();
