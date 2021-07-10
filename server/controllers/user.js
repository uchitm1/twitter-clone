const { COOKIE_NAME } = require("../constants");
const User = require("../entities/User");
const { hashPassword, verifyPassword } = require("../utils/password");

const createUser = async (req, res) => {
	const body = req.body;
	const isEmail = await User.findOne({
		email: body.email,
	});
	if (isEmail) throw new Error("Email already in use.");
	const isUsername = await User.findOne({
		username: body.username,
	});
	if (isUsername) throw new Error("Username already exists.");
	const newUser = new User({
		email: body.email,
		username: body.username,
		password: await hashPassword(body.password),
		fullName: body.fullName,
	});
	await newUser.save().then(() => {
		req.session.userId = accountExists._id;
		return res.status(201).json({
			success: true,
			id: newUser._id,
			email: newUser.email,
			username: newUser.username,
			fullName: newUser.fullName,
			message: "User created successfully",
		});
	});
};

const loginUser = async (req, res) => {
	const body = req.body;
	const accountExists = await User.findOne({ email: body.email });
	if (!accountExists) throw new Error("Account doesn't exist.");
	const isMatched = await verifyPassword(accountExists.password, body.password);
	if (!isMatched) throw new Error("Incorrect password. Try again.");
	else {
		req.session.userId = accountExists._id;
		return res.status(200).json({
			success: true,
			username: accountExists.username,
			message: "Login successful",
		});
	}
};

const currentUser = async (req, res) => {
	if (!req.session.userId) throw new Error("No ongoing session");
	const user = await User.findById(req.session.userId);
	return res.status(200).json({
		success: true,
		user,
	});
};

const logoutUser = async (req, res) => {
	return new Promise((resolve, reject) => {
		req.session.destroy((err) => {
			res.clearCookie(COOKIE_NAME);
			if (err) {
				reject(err);
			} else
				resolve(
					res.status(200).json({
						success: true,
						message: "Logout successful",
					})
				);
		});
	});
};

module.exports = { createUser, loginUser, currentUser, logoutUser };
