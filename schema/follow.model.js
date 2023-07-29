const mongoose = require("mongoose");
const {} = require("../lib/config");
const Schema = mongoose.Schema;

const followSchema = new mongoose.Schema(
  {
    follow_id: { type: Schema.Types.ObjectId, required: true },
    subscribe_id: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Follow", followSchema);
