const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		fullName: { type: String, required: true },
		// location: { type: String },
		// birthday: { type: Date },
		// followers: [{ type: Schema.Types.ObjectId, required: true }],
		// following: [{ type: Schema.Types.ObjectId, required: true }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
