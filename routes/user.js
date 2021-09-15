const router = require("express").Router();

router.route("/usertest").get((req, res, next) => {
  res.send("testing user");
});

router.route("/username").post((req, res, next) => {
  res.send(`welcome ${req.body.username}`);
});

module.exports = router;
