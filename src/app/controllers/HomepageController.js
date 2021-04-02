class HomepageController {
	// [GET] /
	index(req, res, next) {
		res.send('Home page!');
	}
}

module.exports = new HomepageController();
