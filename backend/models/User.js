const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    createdBy: {
      type: "String",
      required: [true, "Please provive the user address"],
    },
    music: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
