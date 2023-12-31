import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true, require: true, index: true },
  password: String,
  age: Number,
  carts: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "carts",
        },
      },
    ],
    default: [],
  },
  role: { type: String, default: "user" },
});

export const userModel = mongoose.model(usersCollection, usersSchema);
