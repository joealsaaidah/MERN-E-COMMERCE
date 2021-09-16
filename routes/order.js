const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getIncome,
  getAllOrders,
} = require("../controllers/order");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.route("/").post(verifyToken, createOrder);
router.route("/:id").put(verifyToken, verifyAdmin, updateOrder);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteOrder);
router.route("/find/:userId").get(verifyToken, getOrders);
router.route("/").get(verifyToken, verifyAdmin, getAllOrders);
router.route("/income").get(verifyToken, verifyAdmin, getIncome);

module.exports = router;
