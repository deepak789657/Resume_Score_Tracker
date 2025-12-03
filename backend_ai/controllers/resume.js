require("dotenv").config();
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CohereClientV2 } = require("cohere-ai");
const resumeModel = require("../Models/resume");

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded!" });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    const resumeText = pdfData.text.replace(/\n+/g, " ").trim();
    const jobText = job_desc.replace(/\n+/g, " ").trim();

    const prompt = `
You are a resume screening assistant.
compare the following resume against the job description provided (jd) 
and give a match score (0-100) and feedback.

Resume Content:
${resumeText}

Job Description:
${jobText}

Return this:
Score: XX
Reason: ...
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [{ role: "user", content: prompt }],
      maxTokens: 150,
    });

    const assistantMsg = response.message;
    const result = assistantMsg.content?.[0]?.text || "";



    // 🟢 Correct regex
    const match = result.match(/score:\s*(\d+)/i);
    const score = match ? parseInt(match[1], 10) : null;

    const reasonMatch = result.match(/reason:\s*([\s\S]*)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;


    function cleanFeedback(text) {
  return text
    .replace(/\*\*/g, "")     // remove bold markdown
    .replace(/\*/g, "")       // remove bullets
    .replace(/\d+\.\s*/g, "") // remove numbering like "1. "
    .replace(/-\s*/g, "")     // remove dashes
    .replace(/\s+/g, " ")     // remove extra spaces
    .trim();
}

    // Save in MongoDB
    const newResult = new resumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: cleanFeedback(reason),
    });

    await newResult.save();
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Resume processed successfully",
      score,
      feedback: cleanFeedback(reason),
      raw: result,
    });

  } catch (err) {
    console.log("Cohere Error:", err.body || err);
    return res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
};


exports.getAllResumesForUser = async (req, res) =>{
    try{
    const {user} = req.params;
   let resume = await resumeModel.find({ user }).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Your Previous History",resumes: resume});

    }catch (err) {
    console.log("Cohere Error:", err.body || err);
    return res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
}


exports.getResumeForAdmin = async (req, res) =>{
    try{
    
   let resume = await resumeModel.find({}).sort({ createdAt: -1 }).populate('user');
    return res.status(200).json({ message: "Featch All History",resumes: resume});

    }catch (err) {
    console.log("Cohere Error:", err.body || err);
    return res.status(500).json({
      error: "Server Error",
      message: err.message,
    });
  }
}
