//mongodb://localhost:27017/contact-keeper
const mongoose = require('mongoose')
const config = require('./default');
const db = config.mongoURL;


const connectDB = async () => {
	try {
		await mongoose.connect(db);

	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;