import mongoose from "mongoose";
import shortid from "shortid";

const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
  code: { type: String, unique: true, default: shortid.generate },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number },
  /*purchaser: {
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },*/
  purchaser: {
    email: { type: String, required: true },
  },
});

export const ticketModel = mongoose.model(ticketsCollection, ticketsSchema);
