const project = require("../models/project.model");
const user = require("../models/user.model");

const getAll = async (req, res) => {
	await project
		.find()
		.then((result) => {
			res.json({
				status: "success",
				result: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
};

const getById = async (req, res) => {
	await project
		.findOne({ _id: req.params.id })
		.then((result) => {
			if (result) {
				res.json({
					status: "success",
					result: result,
				});
			} else {
				res.json({
					status: "fail",
					result: "No users found",
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
};

const getByName = async (req, res) => {
	await project
		.find({ title: { $regex: req.body.name } })
		.then((result) => {
			if (result) {
				res.json({
					status: "success",
					result: result,
				});
			} else {
				res.json({
					status: "fail",
					result: "No users found",
				});
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
};

const create = async (req, res) => {
	if (req.user.role == "ADMIN") {
		const { title, created_at, description, manager, devs, testers } = req.body;

		await project
			.create({
				title: title,
				created_at: created_at,
				description,
				description,
				manager: manager,
				devs: devs,
				testers: testers,
			})
			.then((result) => {
				res.json({
					status: "success",
					result: result,
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "error",
					result: err,
				});
			});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

const updateAdmin = async (req, res) => {
	if (req.user.role == "ADMIN") {
		const { title, created_at, description, manager, devs, testers } = req.body;

		await project
			.updateOne(
				{ _id: req.params.id },
				{
					title: title,
					created_at: created_at,
					description,
					description,
					manager: manager,
					devs: devs,
					testers: testers,
				}
			)
			.then((result) => {
				return project.findOne({ _id: result._id });
			})
			.then((result) => {
				res.json({
					status: "success",
					result: result,
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "error",
					result: err,
				});
			});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

// not useful
const updateUser = async (req, res) => {
	const { title, created_at, description, manager, devs, testers } = req.body;

	await project
		.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				title: title,
				created_at: created_at,
				description,
				description,
				manager: manager,
				devs: devs,
				testers: testers,
			}
		)
		.then((result) => {
			return project.findOne({ _id: result._id });
		})
		.then((result) => {
			res.json({
				status: "success",
				result: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
};

const _deleteAdmin = async (req, res) => {
	if (req.user.role == "ADMIN") {
		await project
			.findOneAndDelete({ _id: req.params.id })
			.then((result) => {
				res.json({
					status: "success",
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "error",
					result: err,
				});
			});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

// not useful
const _deleteUser = async (req, res) => {
	await project
			.deleteOne({ _id: req.user.id })
			.then((result) => {
				res.json({
					status: "success",
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "error",
					result: err,
				});
			});
};

const getProjectMembers = async (req, res) => {
    let devs = [], testers = [];
    let manager = {};
    
    await project.find({ _id: req.params.id })
    .then(async result => {

        await user.find({ _id: result.manager })
        .then(resp => {
            manager = resp;

            return user.find({ _id: { $in: result.devs } })
        })
        .then(resp => {
            devs = resp;

            return user.find({ _id: { $in: result.testers } })
        })
        .then(resp => {
            testers = resp;

            res.json({
                status: "success",
                result: {
                    manager: manager,
                    devs: devs,
                    testers: testers
                }
            })
        })

    })
    .catch((err) => {
        res.status(400).json({
            status: "error",
            result: err,
        });
    });

};

const addDev = async (req, res) => {
	if (req.user.role == "ADMIN") {

		// req.body.devs structure
		//
		// req.body.devs = [
		// 	{
		// 		user_id: kansdinwnaidaw
		// 	},
		// 	{
		// 		user_id: kansdinwnaidaw
		// 	},
		// ]
		await project.findOneAndUpdate({ _id: req.params.id }, {
			$addToSet: { devs: req.body.devs }
		})
		.then((result) => {
			res.json({
				status: "success",
				result: "Members added",
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

const addTesters = async (req, res) => {
	if (req.user.role == "ADMIN") {

		// req.body.devs structure
		//
		// req.body.devs = [
		// 	{
		// 		user_id: kansdinwnaidaw
		// 	},
		// 	{
		// 		user_id: kansdinwnaidaw
		// 	},
		// ]
		await project.findOneAndUpdate({ _id: req.params.id }, {
			$addToSet: { testers: req.body.testers }
		})
		.then((result) => {
			res.json({
				status: "success",
				result: "Members added",
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

const updateManager = async (req, res) => {
	if (req.user.role == "ADMIN") {
		await project.findOneAndUpdate({ _id: req.params.id }, {
			manager: req.body.manager
		})
		.then((result) => {
			return project.findOne({ _id: result._id });
		})
		.then((result) => {
			res.json({
				status: "success",
				result: result,
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: "error",
				result: err,
			});
		});
	} else {
		res.json({
			status: "fail",
			result: "User authorization failed",
		});
	}
};

module.exports = { getAll, getById, getByName, create, updateAdmin, updateUser, _deleteAdmin, _deleteUser, getProjectMembers, addDev, addTesters, updateManager }; 