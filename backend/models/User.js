const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: {
      type: "String",
      required: [true, "Please provive the user address"],
    },
    name: {
      type: "String",
      required: [true, "Please provive the user name"],
    },
    music: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
