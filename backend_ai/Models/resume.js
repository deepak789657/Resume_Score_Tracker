const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resume_name: {
        type: String,
        required: true, 
    },
    job_desc: {
        type: String,
        required: true,
    },
    score: {
        type: String,
    },
    feedback: {
        type: String,
    },
} ,{timestamps: true});

const resumeModel = mongoose.model("Resume", ResumeSchema);
module.exports = resumeModel;
