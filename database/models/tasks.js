const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    consumerName: {
      type: String,
      required: true,
    },
    consumerEmail: {
      type: String,
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    providerEmail: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingSlot: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
