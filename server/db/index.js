const mongoose = require("mongoose");

const db = async () => {
	await mongoose
		.connect(process.env.CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Connected successfully"))
		.catch((error) => console.error("Connection failed. " + error.message));
};

module.exports = db;
