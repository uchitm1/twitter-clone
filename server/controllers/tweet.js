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
	const tweets = await Tweet.find({}).sort({ updatedAt: -1 });
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched all tweets successfully.",
	});
};

const fetchTweetsByUsername = async (req, res) => {
	const username = req.params.username;
	const tweets = await Tweet.find({
		"user.username": username,
	});
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched tweets successfully.",
	});
};

const fetchTweetsBySearchedUsername = async (req, res) => {
	const searchedUsername = req.query.q;
	const tweets = await Tweet.find({
		"user.username": new RegExp(searchedUsername),
	});
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched tweets successfully.",
	});
};

module.exports = {
	createTweet,
	fetchAllTweets,
	fetchTweetsByUsername,
	fetchTweetsBySearchedUsername,
};
