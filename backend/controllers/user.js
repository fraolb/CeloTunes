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

    res.status(StatusCodes.CREATED).json(user);
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
      .json({ error: "Address is required" });
  }

  try {
    const user = await User.find({ address });
    if (Array.isArray(user) && user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, getUser };
