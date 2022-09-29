import express from "express";
import dbPost from "../DBSchema/dbPost.js";

import upload from "../bin/multer.js";
var router = express.Router();

/* GET users listing. */
router.post("/", upload.single("image"), function (req, res, next) {
  console.log("hamza");
  const data = req.body;
  console.log(data);
  // console.log(req.formData);/
  // const file = req.files.file;
  // const file = req.files;
  const url = req.protocol + "://" + req.get("host");
  // console.log("protocol: ", req.protocol);
  // console.log("host: ", req.get("host"));
  // console.log(file);
  // FormData()
  // const formData = new FormData();
  // formData.append("image", file);
  // console.log(data, "ssssss");
  // res.send("heeloo");
  // console.log(file);
  const datas = {
    title: data.title,
    description: data.description,
    user: data.user,
    image: url + "/public/images/" + req.file.filename,
  };
  console.log(datas, "datassss");
  // res.send("hello");
  dbPost.create(datas, (err, datass) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(datass);
    }
  });
});

export default router;
// module.exports = router;
