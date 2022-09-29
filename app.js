import logger from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import fileUpload from "express-fileupload";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import postRouter from "./routes/post.js";
import signupRouter from "./routes/signup.js";
import createPostRouter from "./routes/createpost.js";
import bodyParser from "body-parser";
import Pusher from "pusher";

var app = express();

app.use(logger("dev"));
app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
app.use("/public", express.static("public"));
app.use(cors());
// app.use(fileUpload());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users", usersRouter);
app.use("/signup", signupRouter);
app.use("/createpost", createPostRouter);
app.use("/post", postRouter);

const pusher = new Pusher({
  appId: "1482620",
  key: "69b5a077e6f30925c3f7",
  secret: "cd7fd44524b63dc0e595",
  cluster: "ap2",
  useTLS: true,
});

//db connection
mongoose.connect(
  "mongodb+srv://drstone:hamzaalikhan@cluster0.kjxeldw.mongodb.net/merntaskv2?retryWrites=true&w=majority"
);
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
  console.log("Db is connected");

  const msgCollection = db.collection("posts");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        title: messageDetails.title,
        description: messageDetails.description,
        user: messageDetails.user,
        image: messageDetails.image,
      });
    } else {
      console.log("Error trigerrring Pusher");
    }
  });
});
export default app;
