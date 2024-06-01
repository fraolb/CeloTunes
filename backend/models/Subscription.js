// models/Subscription.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  address: {
    type: "String",
    required: [true, "Please provive the user address"],
  },
  subscriptionStart: { type: Date, default: Date.now },
  subscriptionEnd: { type: Date, required: true },
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
