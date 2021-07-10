const argon2 = require("argon2");

const hashPassword = async (password) => {
	try {
		const hash = await argon2.hash(password);
		return hash;
	} catch (error) {
		console.log(error);
		return error;
	}
};

const verifyPassword = async (hashedPassword, inputPassword) => {
	try {
		if (await argon2.verify(hashedPassword, inputPassword)) return true;
		else return false;
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = { hashPassword, verifyPassword };
