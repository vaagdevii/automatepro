const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendLeadConfirmationEmail = async (lead) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"AutomatePro" <${process.env.EMAIL_USER}>`,
    to: lead.email,
    subject: "We received your automation inquiry",
    html: `
      <h2>Hi ${lead.name},</h2>
      <p>Thank you for contacting <strong>AutomatePro</strong>.</p>
      <p>We received your business automation inquiry for <strong>${lead.company}</strong>.</p>
      

      <p>Our team will contact you soon.</p>
      <br />
      <p>Regards,<br /><strong>AutomatePro Team</strong></p>
    `,
  });
};

const sendAdminLeadNotificationEmail = async (lead) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"AutomatePro" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${lead.priority} Priority Lead - ${lead.company}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Company:</strong> ${lead.company}</p>
      <p><strong>Industry:</strong> ${lead.industry}</p>
      <hr />
      <p><strong>AI Score:</strong> ${lead.aiScore}/100</p>
      <p><strong>Priority:</strong> ${lead.priority}</p>
      <p><strong>AI Summary:</strong> ${lead.aiSummary}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${lead.message}</p>
    `,
  });
};
const sendCandidateConfirmationEmail = async (candidate) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"AutomatePro Careers" <${process.env.EMAIL_USER}>`,
    to: candidate.email,
    subject: "Your application has been received",
    html: `
      <h2>Hi ${candidate.fullName},</h2>
      <p>Thank you for applying to <strong>AutomatePro</strong>.</p>
      <p>We received your application for the role of <strong>${candidate.position}</strong>.</p>
      <p>Our hiring team will review your profile and contact you if your application matches our requirements.</p>
      <br />
      <p>Regards,<br /><strong>AutomatePro Hiring Team</strong></p>
    `,
  });
};

const sendAdminCandidateNotificationEmail = async (candidate) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"AutomatePro Careers" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Candidate Applied - ${candidate.position}`,
    html: `
      <h2>New Candidate Application</h2>

      <p><strong>Name:</strong> ${candidate.fullName}</p>
      <p><strong>Email:</strong> ${candidate.email}</p>
      <p><strong>Phone:</strong> ${candidate.phone}</p>
      <p><strong>Position:</strong> ${candidate.position}</p>

      <hr />

      <p><strong>AI Score:</strong> ${candidate.aiScore}/100</p>
      <p><strong>Recommendation:</strong> ${candidate.recommendation}</p>
      <p><strong>AI Summary:</strong> ${candidate.aiSummary}</p>

      <hr />

      <p><strong>Resume File:</strong> ${candidate.resumeFileName}</p>

      <p><strong>Candidate Note:</strong></p>
      <p>${candidate.coverNote}</p>
    `,
  });
};

module.exports = {
  sendLeadConfirmationEmail,
  sendAdminLeadNotificationEmail,
  sendCandidateConfirmationEmail,
  sendAdminCandidateNotificationEmail,
};