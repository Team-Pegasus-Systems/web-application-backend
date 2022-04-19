const issue = require("../models/user.model");

const getAll = async (res, req) => {
    await issue.find()
    .then(result => {
        res.json({
            status: "success",
            result: result,
        });
    })
    .catch(error => {
        res.json({
            status: "error",
            result: error,
        });
    });
};

const getByTitle = async (req, res) => {
    await issue.find({ title : { $regex: `${req.body.title }` }})
    .then(result => {
        res.json({
            status: "success",
            result: result,
        });
    })
    .catch(error => {
        res.json({
            status: "error",
            result: error,
        });
    })
};

const getByProject = async (req, res) => {
    await issue.find({ project_id: req.params.id })
    .then(result => {
        res.json({
            status: "success",
            result: result,
        });
    })
    .catch(error => {
        res.json({
            status: "error",
            result: error,
        });
    })
};

const getById = async (req, res) => {
    await issue.find({ id: req.body.id })
    .then(result => {
        res.json({
            status: "success",
            result: result,
        });
    })
    .catch(error => {
        res.json({
            status: "error",
            result: error,
        });
    })
};

const create = async (req, res) => {
    const { project_id, title, created_at, status, summery, reporter, category, priority, dev, tester } = req.body;

    await issue.create({ 
        project_id: project_id,
        title: title,
        created_at: created_at,
        status: status,
        summery: summery,
        reporter: reporter,
        category: category,
        priority: priority,
        dev: dev, 
        tester: tester 
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

const update = async (req, res) => {
    const { project_id, title, created_at, status, summery, reporter, category, priority, dev, tester } = req.body;

    await issue.findByIdAndUpdate({ _id: req.params.id },{ 
        project_id: project_id,
        title: title,
        created_at: created_at,
        status: status,
        summery: summery,
        reporter: reporter,
        category: category,
        priority: priority,
        dev: dev, 
        tester: tester 
    })
    .then((result) => {
        return issue.findOne({ _id: result._id });
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

const _delete = async (req, res) => {
    const { project_id, title, created_at, status, summery, reporter, category, priority, dev, tester } = req.body;

    await issue.findByIdAndDelete({ _id: req.params.id })
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

const changeState = async (req, res) => {
    await issue.findByIdAndUpdate({ _id: req.params.id },{ 
        status: req.body.status
    })
    .then((result) => {
        return issue.findOne({ _id: result._id });
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

module.exports = { getAll, getById, getByProject, getByTitle, create, update, _delete, changeState };