const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema(
	{
		user: { type: Object, required: true },
		content: { type: String, required: true },
		likes: { type: Number, default: 0 },
		retweets: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("tweets", TweetSchema);
