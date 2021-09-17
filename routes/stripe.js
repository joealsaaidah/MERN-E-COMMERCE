const { payment } = require("../controllers/stripe");

const router = require("express").Router();

router.route("/payment").post(payment);

module.exports = router;
