const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectCode: {
        type: String,
        required: true,
    },
    sessions: {
        type: String,
        required: true,
    },
    majorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'major',
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }
}, { timestamps: true });

module.exports = mongoose.model("project", projectSchema);