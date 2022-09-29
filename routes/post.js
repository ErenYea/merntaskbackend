import express from "express";
import dbPost from "../DBSchema/dbPost.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  dbPost.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

export default router;
// module.exports = router;
