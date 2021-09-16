const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.route("/:id").put(verifyToken, updateUser);
router.route("/:id").delete(verifyToken, deleteUser);
router.route("/find/:id").get(verifyToken, verifyAdmin, getUser);
router.route("/").get(verifyToken, verifyAdmin, getAllUsers);
router.route("/stats").get(verifyToken, verifyAdmin, getUserStats);

module.exports = router;
