const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(
			`mongodb+srv://hnt2909:${process.env.DB_PASSWORD}@todolist.caogc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			}
		);
		console.log('Connect successfully!!!');
	} catch (error) {
		console.log('Connect failure!!!');
	}
}

module.exports = { connect };
