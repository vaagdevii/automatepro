const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: {
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

    position: {
      type: String,
      required: true,
    },

    coverNote: {
      type: String,
      required: true,
    },

    resumeFileName: {
      type: String,
      required: true,
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    recommendation: {
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

module.exports = mongoose.model("Candidate", candidateSchema);