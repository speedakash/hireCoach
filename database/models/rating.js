const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
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
    consumerName: {
      type: String,
      required: true,
    },
    consumerEmail: {
      type: String,
      required: true,
    },
    service: {
        type: String,
        required: true,
    },
    serviceIcon: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    taskId: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
