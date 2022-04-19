const controller = require("../controllers/issue.controller");
const router = require("express").Router();

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/title").get(controller.getByTitle);

router.route("/project/:id").get(controller.getByProject);

router.route("/").post(controller.create);

router.route("/:id").put(controller.update);

router.route("/state/:id").put(controller.changeState);

router.route("/:id").delete(controller._delete);

module.exports = router;