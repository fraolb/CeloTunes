const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  try {
    const { address, name } = req.body;
    if (!address || !name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Require both address and name" });
    }
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

const getUser = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Require both address and name" });
  }

  const user = await User.find({ address });
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { createUser, getUser };
