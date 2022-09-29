import express from "express";
import Users from "../DBSchema/mongoos.js";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("user");
  Users.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

export default router;
// module.exports = router;
