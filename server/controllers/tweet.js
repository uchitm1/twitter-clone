const Tweet = require("../entities/Tweet");

const createTweet = async (req, res) => {
	const body = req.body;
	const tweet = new Tweet({
		user: body.user,
		content: body.content,
		likes: body.retweets,
		retweets: body.retweets,
	});
	await tweet.save().then(() => {
		return res.status(201).json({
			success: true,
			tweet,
			message: "Tweet created successfully.",
		});
	});
};

const fetchAllTweets = async (req, res) => {
	const tweets = await Tweet.find({});
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched all tweets successfully.",
	});
};

module.exports = { createTweet, fetchAllTweets };
