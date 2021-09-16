const router = require("express").Router();
const { register, login } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
//router.route("/forgotpassword").post(forgotPassword);
//router.route("/resetpassword:resetToken").post(resetPassword);

module.exports = router;
