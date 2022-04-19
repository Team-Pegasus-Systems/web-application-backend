const mongo = require("mongoose");

const Issue = mongo.Schema({
	project_id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	created_at: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "OPEN",
	},
	summery: {
		type: String,
	},
	reporter: {
		type: String, // user id
		required: true
	},
	category: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true,
		default: "LOW",
		enum: ["LOW", "MEDIUM", "HIGH", "SEVERE"],
	},
	dev: {
		type: String,
		default: "NOT_ASSIGNED",
	},
	tester: {
		type: String,
		default: "NOT_ASSIGNED",
	},
});

module.exports = mongo.model("issues", Issue);
