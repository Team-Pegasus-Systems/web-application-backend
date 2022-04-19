const mongo = require("mongoose");

const Project = mongo.Schema({
	title: {
		type: String,
		required: true,
	},
	created_at: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
	manager: {
		type: String,
		required: true
	},
    devs: [{
        user_id: {
            type: String,
            required: true
        }
    }],
	testers: [{
		user_id: {
            type: String,
            required: true
        }
	}]
});

module.exports = mongo.model("projects", Project)