const Tweet = require("../entities/Tweet");
const User = require("../entities/User");

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
	}).sort({ updatedAt: -1 });
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched tweets successfully.",
	});
};

const fetchSearchResults = async (req, res) => {
	const searchedTerm = req.query.q;
	const tweets = await Tweet.find({
		"user.username": new RegExp(searchedTerm),
	}).sort({ updatedAt: -1 });
	const matchingAccounts = await User.find({
		username: new RegExp(searchedTerm),
	});
	return res.status(200).json({
		success: true,
		message: "Fetched tweets successfully.",
		tweets,
		matchingAccounts,
	});
};

module.exports = {
	createTweet,
	fetchAllTweets,
	fetchTweetsByUsername,
	fetchSearchResults,
};
