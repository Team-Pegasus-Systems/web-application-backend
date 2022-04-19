const controller = require("../controllers/project.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getById);

router.route("/name").get(controller.getByName);

router.route("/members/:id").get(controller.getProjectMembers);

router.route("/").post(controller.create);

router.route("/dev").post(auth, controller.addDev);

router.route("/tester").post(auth, controller.addTesters);

router.route("/:id").put(auth, controller.updateAdmin);

router.route("/manager/:id").put(auth, controller.updateManager);

router.route("/:id").delete(auth, controller._deleteAdmin);

module.exports = router;