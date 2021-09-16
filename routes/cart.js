const router = require("express").Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAll,
} = require("../controllers/cart");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.route("/").post(verifyToken, createCart);
router.route("/:id").put(verifyToken, updateCart);
router.route("/:id").delete(verifyToken, deleteCart);
router.route("/find/:userId").get(verifyToken, getCart);
router.route("/").get(verifyToken, verifyAdmin, getAll);

module.exports = router;
