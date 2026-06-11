const analyzeLeadWithAI = async (leadData) => {
  const message = leadData.message.toLowerCase();
  let score = 40;

  const keywords = [
    "automation",
    "appointment",
    "whatsapp",
    "crm",
    "lead",
    "follow up",
    "reminder",
    "booking",
    "chatbot",
    "email",
  ];

  keywords.forEach((word) => {
    if (message.includes(word)) score += 6;
  });

  if (message.length > 80) score += 10;
  if (score > 100) score = 100;

  let priority = "Low";
  if (score >= 80) priority = "High";
  else if (score >= 60) priority = "Medium";

  return {
    aiScore: score,
    priority,
    aiSummary: `This lead appears to need business automation support. Priority marked as ${priority}.`,
  };
};

module.exports = {
  analyzeLeadWithAI,
};