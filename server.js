// ****************************************************
// *
// * imports
// *
// ****************************************************

const express = require("express");
const mongo = require("mongoose");
const cors = require("cors");

// ****************************************************
// *
// * initialization
// *
// ****************************************************

const config = require("config");
const app = express();
const router = express.Router();

const userRoutes = require("./routes/user.routes");

const port = config.get("port");
const url = config.get("db_url");

// ****************************************************
// *
// * server config
// *
// ****************************************************

app.use(express.json());
app.use(cors());

// ****************************************************
// *
// * db connection
// *
// ****************************************************

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err));

const connection = mongo.connection;

connection.once("open", () => {
    console.log("Database connected!");
});

// ****************************************************
// *
// * router declaration
// *
// ****************************************************

router.use("/user", userRoutes);
router.use("/static/profile-pictures", express.static('./public/profile_pictures'));

app.use(config.get("root"), router);

// ****************************************************
// *
// * server execution
// *
// ****************************************************

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
