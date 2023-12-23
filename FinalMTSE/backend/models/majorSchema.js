const mongoose = require("mongoose");
const validator = require('validator');

const majorSchema = new mongoose.Schema({
    majorName: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    timeRegistrationProjectStart: {
      type: Date,
      default: Date.now
    },
    timeRegistrationProjectEnd: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return value >= this.timeRegistrationProjectStart;
        },
        message: 'Time end must greater than or equal time start'
      }
    }
}, { timestamps: true });

module.exports = mongoose.model("major", majorSchema);

