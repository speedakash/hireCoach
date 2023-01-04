const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    businessCategory: {
      type: Array,
      required: false,
    },
    logoPath:{
      type: String,
      required: false,
    },
    rating:{
      type: String,
      required: false,
    },
    businessSkills:{
      type: Array,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Business", businessSchema);
