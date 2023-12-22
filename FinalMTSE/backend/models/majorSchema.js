const mongoose = require("mongoose");

const majorSchema = new mongoose.Schema({
    majorName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    timeRegistrationStart: {
        type: Date,
        default: Date.now
    },
    timeRegistrationEnd: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("major", majorSchema);

