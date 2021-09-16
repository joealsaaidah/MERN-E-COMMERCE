const router = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.route("/").post(verifyToken, verifyAdmin, createProduct);
router.route("/:id").put(verifyToken, verifyAdmin, updateProduct);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteProduct);
router.route("/find/:id").get(getProduct);
router.route("/").get(getAllProducts);

module.exports = router;
