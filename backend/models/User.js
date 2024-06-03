const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userAddress: {
      type: "String",
      required: [true, "Please provive the user address"],
    },
    userName: {
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
