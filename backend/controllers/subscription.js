const { RestartAlt } = require("@mui/icons-material");
const Subscription = require("../models/Subscription");
const { StatusCodes } = require("http-status-codes");

const subscribeMusic = async (req, res) => {
  try {
    const { address, subscriptionEnd } = req.body;

    const subscribe = await Subscription.create({ address, subscriptionEnd });
    // Respond with the created product
    res.status(StatusCodes.CREATED).json(subscribe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkSubscription = async (req, res) => {
  try {
    const { address } = req.body;
    const subscribe = await Subscription.find({ address });
    res.status(StatusCodes.OK).json(subscribe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  subscribeMusic,
  checkSubscription,
};
