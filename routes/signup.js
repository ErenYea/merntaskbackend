import express from "express";
import Users from "../DBSchema/mongoos.js";
var router = express.Router();

/* GET users listing. */
router.post("/", function (req, res, next) {
  const data = req.body;
  console.log(data);

  Users.create(data, (err, data) => {
    if (err) {
      Users.findOne({ email: req.body.email }, (err, data) => {
        console.log(data);
        if (data.password == req.body.password) {
          res.status(200).send(data);
        } else {
          res.status(500).send({
            message: "Invalid password",
          });
        }
      });
      // res.status(500).send("The email is already in database");
    } else {
      res.status(201).send(data);
    }
  });
});

export default router;

// module.exports = router;
