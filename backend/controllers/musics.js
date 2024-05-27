const Music = require("../models/Music");
const { StatusCodes } = require("http-status-codes");

const getAllMusic = async (req, res) => {
  const musics = await Music.find({});
  res.status(StatusCodes.OK).json({ musics, count: musics.length });
};

const getSingleMusic = async (req, res) => {
  const { name } = req.body;
  const music = await Music.find({ name });

  if (!music) {
    throw new error("No music was found");
  }

  res.status(StatusCodes.OK).json({ music });
};

const getMyMusic = async (req, res) => {
  const myMusic = await Music.find({ createdBy: req.userAddress });
  res.status(StatusCodes.OK).json({ myMusic, count: myMusic.length });
};

const UploadMusic = async (req, res) => {
  const music = await Music.create(req.body);
  res.status(StatusCodes.CREATED).json(music);
};

module.exports = {
  getAllMusic,
  getSingleMusic,
  getMyMusic,
  UploadMusic,
};
