const Candidate = require("../models/Candidate");

const {
  sendCandidateConfirmationEmail,
  sendAdminCandidateNotificationEmail,
} = require("../services/emailService");

const analyzeCandidate = (candidateData) => {
  const position = candidateData.position.toLowerCase();
  const coverNote = candidateData.coverNote.toLowerCase();

  let score = 40;
  let matchedSkills = [];

  const skillKeywords = [
    "angular",
    "node",
    "express",
    "mongodb",
    "javascript",
    "typescript",
    "api",
    "automation",
    "n8n",
    "openai",
    "ai",
    "workflow",
    "backend",
    "frontend",
    "full stack",
    "crm",
    "email",
    "whatsapp",
  ];

  skillKeywords.forEach((skill) => {
    if (coverNote.includes(skill)) {
      score += 5;
      matchedSkills.push(skill);
    }
  });

  if (position.includes("automation") && coverNote.includes("automation")) {
    score += 10;
  }

  if (
    position.includes("full stack") &&
    (coverNote.includes("frontend") || coverNote.includes("backend"))
  ) {
    score += 10;
  }

  if (coverNote.length > 120) {
    score += 10;
  }

  if (score > 100) {
    score = 100;
  }

  let recommendation = "Reject";

  if (score >= 80) {
    recommendation = "Shortlist";
  } else if (score >= 60) {
    recommendation = "Review";
  }

  const aiSummary =
    matchedSkills.length > 0
      ? `Candidate shows skills in ${matchedSkills
          .slice(0, 5)
          .join(", ")}. Suitable for ${recommendation.toLowerCase()} stage.`
      : "Candidate needs manual review because relevant skills are not clearly mentioned.";

  return {
    aiScore: score,
    recommendation,
    aiSummary,
  };
};

const createCandidate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const analysis = analyzeCandidate(req.body);

    const candidate = await Candidate.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      coverNote: req.body.coverNote,
      resumeFileName: req.file.filename,
      aiScore: analysis.aiScore,
      recommendation: analysis.recommendation,
      aiSummary: analysis.aiSummary,
    });

    res.status(201).json({
      success: true,
      message: "Candidate application submitted successfully",
      data: candidate,
    });

    Promise.allSettled([
      sendCandidateConfirmationEmail(candidate),
      sendAdminCandidateNotificationEmail(candidate),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.log("Candidate email sending failed:", result.reason.message);
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

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
};