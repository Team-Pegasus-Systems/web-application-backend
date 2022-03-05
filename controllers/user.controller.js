const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const getAll = async (req, res) => {
    await user.find().select("-password")
    .then(result => {
        res.json({
            status: "success",
            result: result
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            result: err
        })
    })
};

const getById = async (req, res) => {
    await user.find({_id: req.params.id}).select("-password")
    .then(result => {
        res.json({
            status: "success",
            result: result
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            result: err
        })
    })
};

const auth = async (req,res) => {
    await user.find({_id: req.user.user.id }).select("-password")
    .then(result => {
        res.json({
            status: "success",
            result: result
        })
    })
    .catch(err => {
        res.json({
            status: "error",
            result: err
        })
    })
};

const create = async (req, res) => {
    const { name, username, password, age, passport, gender, contactNo, email, socialMedia, role, profileImage } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await user.create({
        name: JSON.parse(name),
        username: username,
        password: encryptedPassword,
        age: age,
        passport: passport,
        gender: gender,
        contactNo: JSON.parse(contactNo),
        email: email,
        socialMedia: JSON.parse(socialMedia),
        role: role,
        profileImage: req.file.filename
    })
    .then(result => {
        const token = jwt.sign({user: { id: result._id, role: result.role }}, config.get("jwtsecret"), {expiresIn: 3600,});
        res.json({
            status: "successful",
            token: token
        });
    })
    .catch(result => {
        res.json({
            status: "error",
            result: result
        });
    })
};

const invalidCheck = (body) => {
    if (name && password && age && passport && gender && contactNo && email && socialMedia && role && profileImage) {

    } else {
        res.json({
            status: "unsuccess",
            result: "Invalid request body"
        });
    }
};

module.exports = { getAll, getById, create, auth };