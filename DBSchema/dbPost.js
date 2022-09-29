import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  title: String,
  description: String,
  user: String,
  image: String,
});

export default mongoose.model("posts", UserSchema);
