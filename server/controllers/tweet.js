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

const fetchFollowingTweets = async (req, res) => {
	const { following } = req.query;
	const tweets = await Tweet.find({
		user: {
			$in: following,
		},
	})
		.populate("user")
		.sort({ updatedAt: -1 });
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched all tweets successfully.",
	});
};

const fetchTweetsByUsername = async (req, res) => {
	const username = req.params.username;
	const user = await User.findOne({
		username: username,
	});
	const tweets = await Tweet.find({
		user: user._id,
	})
		.populate("user")
		.sort({ updatedAt: -1 });
	return res.status(200).json({
		success: true,
		tweets,
		message: "Fetched tweets successfully.",
	});
};

const fetchSearchResults = async (req, res) => {
	const searchedTerm = req.query.q;
	const user = await User.find(
		{
			username: new RegExp(searchedTerm),
		},
		{ _id: 1 }
	);
	if (!user) {
		return res.status(200).json({
			success: true,
			message: "No search results found.",
			tweets: [],
			matchingAccounts: [],
		});
	}
	const tweets = await Tweet.find({
		user: { $in: user },
	})
		.populate("user")
		.sort({ updatedAt: -1 });

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
	fetchFollowingTweets,
	fetchTweetsByUsername,
	fetchSearchResults,
};
