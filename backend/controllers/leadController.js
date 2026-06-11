const Lead = require("../models/Lead");

const {
  sendLeadConfirmationEmail,
  sendAdminLeadNotificationEmail,
} = require("../services/emailService");

const { analyzeLeadWithAI } = require("../services/aiService");

const createLead = async (req, res) => {
  try {
    const analysis = await analyzeLeadWithAI(req.body);

    const lead = await Lead.create({
      ...req.body,
      aiScore: analysis.aiScore,
      priority: analysis.priority,
      aiSummary: analysis.aiSummary,
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });

    Promise.allSettled([
      sendLeadConfirmationEmail(lead),
      sendAdminLeadNotificationEmail(lead),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.log("Email sending failed:", result.reason.message);
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
};