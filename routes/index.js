import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send({
    message: "Welcome!",
  });
});

export default router;
// module.exports = router;
