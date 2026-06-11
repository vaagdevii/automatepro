const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    priority: {
      type: String,
      default: "Pending",
    },

    aiSummary: {
      type: String,
      default: "Not analyzed yet",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);