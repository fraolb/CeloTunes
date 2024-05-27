const Music = require("../models/Music");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getAllMusic = async (req, res) => {
  const musics = await Music.find({});
  res.status(StatusCodes.OK).json({ musics, count: musics.length });
};

const getSingleMusic = async (req, res) => {
  const { musicIds } = req.body;
  const music = await Music.find({ _id: musicIds });

  if (!music) {
    throw new error("No music was found");
  }

  res.status(StatusCodes.OK).json({ music });
};

const getMyMusic = async (req, res) => {
  try {
    const { address } = req.query;

    console.log("The user address is: ", address);

    const myMusic = await Music.find({ createdBy: address });
    const boughtMusic = await User.find({ createdBy: address });

    const count = myMusic.length + boughtMusic.length;

    res.status(200).json({ myMusic, boughtMusic, count }); // Using 200 directly for simplicity
  } catch (error) {
    console.error("Error fetching music data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadMusic = async (req, res) => {
  console.log("The body data of the music is: ", req.body);
  const music = await Music.create(req.body);
  res.status(StatusCodes.CREATED).json(music);
};

const buyMusic = async (req, res) => {
  try {
    const { createdBy, musicIds } = req.body;

    if (!createdBy || !musicIds) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "createdBy and musicIds are required" });
    }

    console.log("music id: ", musicIds);
    // Validate that all provided music IDs exist in the Music collection
    const validMusic = await Music.find({ _id: musicIds });
    if (!validMusic) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Some music IDs are invalid" });
    }

    // Check if user already exists
    let user = await User.findOne({ createdBy });

    if (user) {
      // User exists, update their music array with unique music IDs
      user.music = [...new Set([...user.music, ...musicIds])];
      await user.save();
    } else {
      // User does not exist, create a new user
      user = await User.create({ createdBy, music: musicIds });
    }

    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.error("Error in buyMusic: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  uploadMusic,
  buyMusic,
};
