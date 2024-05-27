const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the artist!"],
      maxLength: 50,
      minLength: 3,
    },
    title: {
      type: String,
      required: [true, "Please provide the title of the music!"],
      maxLength: 50,
      minLength: 3,
    },
    description: {
      type: String,
      maxLength: 300,
      default: "",
    },
    genre: {
      type: String,
      enum: [
        "Pop",
        "Classical",
        "Jazz",
        "Hiphop",
        "EDM",
        "Electronic",
        "Other",
      ],
      default: "Other",
    },
    price: {
      type: Number,
      required: [true, "Please provice the price of the music!"],
    },
    image: [
      {
        public_id: {
          type: String,
          required: [true, "Please provide the public_id of the image!"],
        },
        url: {
          type: String,
          required: [true, "Please provide the URL of the image!"],
        },
      },
    ],
    music: [
      {
        public_id: {
          type: String,
          required: [true, "Please provide the public_id of the music!"],
        },
        url: {
          type: String,
          required: [true, "Please provide the URL of the music!"],
        },
      },
    ],
    createdBy: {
      type: String,
      required: [true, "Please provive the user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Music", musicSchema);
