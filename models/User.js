import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },

  todos: [{ title: String, caption: String, status: String }],

  createAt: {
    type: Date, //tarikhe sabt dar system
    default: () => Date.now(),
    immutable: true, //ke natunim ino taghir bedim
  },
});

//agar User vojud dasht behemun bedesh, agar na yak user ijad kon ba name User va schema UserSchema
const User = models.User || model("User", userSchema);

export default User;
