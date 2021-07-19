const router = require("express").Router();
const {
	createUser,
	loginUser,
	currentUser,
	logoutUser,
	followUser,
} = require("../controllers/user");
const {
	createTweet,
	fetchFollowingTweets,
	fetchSearchResults,
	fetchTweetsByUsername,
} = require("../controllers/tweet");

router.post("/user/register", async (req, res) => {
	try {
		await createUser(req, res);
	} catch (err) {
		return res.status(422).json({
			errors: { body: "Could not create user. " + err.message },
		});
	}
});

router.post("/user/login", async (req, res) => {
	try {
		await loginUser(req, res);
	} catch (err) {
		return res.status(422).json({
			errors: { body: "Login unsuccessful. " + err.message },
		});
	}
});

router.post("/user/logout", async (req, res) => {
	try {
		await logoutUser(req, res);
	} catch (err) {
		return res.status(422).json({
			errors: { body: "Logout unsuccessful. " + err.message },
		});
	}
});

router.get("/user/current", async (req, res) => {
	try {
		await currentUser(req, res);
	} catch (err) {
		if (err.message === "No ongoing session") {
			return res.status(200).json({
				errors: { body: err.message },
			});
		}
		return res.status(400).json({
			errors: { body: "Could not fetch current user details. " + err.message },
		});
	}
});

router.post("/tweet/new", async (req, res) => {
	try {
		await createTweet(req, res);
	} catch (err) {
		return res.status(400).json({
			errors: { body: "Could not create tweet. " + err.message },
		});
	}
});

router.get("/tweets", async (req, res) => {
	try {
		await fetchFollowingTweets(req, res);
	} catch (err) {
		return res.status(400).json({
			errors: { body: "Could not fetch all tweets. " + err.message },
		});
	}
});

router.get("/search", async (req, res) => {
	try {
		await fetchSearchResults(req, res);
	} catch (err) {
		return res.status(400).json({
			errors: {
				body: "Could not fetch tweets by requested username. " + err.message,
			},
		});
	}
});

router.get("/tweets/:username", async (req, res) => {
	try {
		await fetchTweetsByUsername(req, res);
	} catch (err) {
		return res.status(400).json({
			errors: {
				body: "Could not fetch tweets by requested username. " + err.message,
			},
		});
	}
});

router.post("/follow/:followerId/:followingId", async (req, res) => {
	try {
		await followUser(req, res);
	} catch (err) {
		return res.status(400).json({
			errors: {
				body: "Could not follow user. " + err.message,
			},
		});
	}
});

module.exports = router;
