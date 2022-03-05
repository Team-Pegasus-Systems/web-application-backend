const controller = require("../controllers/user.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../Middleware/image.middleware").upload;

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/").post(upload.single("image"),controller.create);

router.route("/auth").post(auth, controller.auth);

module.exports = router;