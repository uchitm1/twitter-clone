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

const apis = {
	createUser,
	loginUser,
	getLoggedInUser,
	logoutUser,
	createTweet,
	fetchAllTweets,
};

export default apis;
