const jwt = require("jsonwebtoken");
const config = require("config");

const secret = config.get("jwtsecret");

const verify = (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (!token) {
		res.status(403).send({
			status: "unsuccess",
			result: "A token is required for authentication",
		});
	}
	try {
		const decoded = jwt.verify(token, secret);

		req.user = decoded;

        next();
	} catch (err) {
		res.status(401).send({
			status: "unsuccess",
			result: "Invalid token",
		});
	}
};

module.exports = verify;
