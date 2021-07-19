import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
	withCredentials: "include",
});

const createUser = (payload) => {
	return api.post("/user/register", payload);
};

const loginUser = (payload) => {
	return api.post("/user/login", payload);
};

const getLoggedInUser = () => {
	return api.get("/user/current");
};

const logoutUser = () => {
	return api.post("/user/logout");
};

const createTweet = (payload) => {
	return api.post("/tweet/new", payload);
};

const fetchAllTweets = () => {
	return api.get("/tweets");
};

const fetchTweetsByUsername = (username) => {
	return api.get(`/tweets/${username}`);
};

const fetchSearchResults = (searchedTerm) => {
	return api.get("/search", {
		params: {
			q: searchedTerm,
		},
	});
};

const followUser = (followerId, followingId) => {
	return api.post(`/follow/${followerId}/${followingId}`);
};

const apis = {
	createUser,
	loginUser,
	getLoggedInUser,
	logoutUser,
	createTweet,
	fetchAllTweets,
	fetchTweetsByUsername,
	fetchSearchResults,
	followUser,
};

export default apis;
