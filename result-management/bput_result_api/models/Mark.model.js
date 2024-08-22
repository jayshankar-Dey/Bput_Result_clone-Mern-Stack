const mongoose = require('mongoose')


const markSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId
    },
    subjectCode: {
        type: String,
        required: [true, "subjectCode is required"]
    },
    subjectName: {
        type: String,
        required: [true, "subjectName is required"]
    },
    type: {
        type: String,
        required: [true, "Type is required"]
    },
    cradit: {
        type: String,
        required: [true, "cradit is required"]
    },
    finamGrade: {
        type: String,
        required: [true, "finamGrade is required"]
    }
}, { timestamps: true })

const Marks = mongoose.model("Marks", markSchema)

module.exports = Marks