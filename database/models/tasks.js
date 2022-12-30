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
    taskType:{
      type: String,
      required: true,
    },
    courseDeliveryMethod:{
      type: String,
      required: true,
    },
    courseDeliveryAddress:{
      type: String,
      required: false,
    },
    courseStartDate:{
      type: String,
      required: false,
    },
    courseEndDate:{
      type: String,
      required: false,
    },
    courseVideoLink:{
      type: String,
      required: false,
    },
    taskDetails:{
      type: Array,
      required: false,
    },
    paymentStatus: {
      type: Boolean,
      required: false
    },
    paymentType: {
      type: String,
      required: false
    },
    totalPayment: {
      type: Number,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
