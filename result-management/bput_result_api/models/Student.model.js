const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    collage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colleges",
        required: [true, "college is required"]
    },
    studentName: {
        type: String,
        required: [true, "student name is required"]
    },
    branch: {
        type: String,
        required: [true, "Branch name"]
    },
    reg: {
        type: String,
        required: [true, "registration num is required"]
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    address: {
        type: String,
        required: [true, "Branch name"]
    },
    admitionDate: {
        type: Date,
        default: Date.now()
    },
    exams: [{
        semister: {
            type: String
        },
        type: {
            type: String
        },
        year: {
            type: String
        }
    }]

}, { timestamps: true })


const Student = mongoose.model("Students", studentSchema)

module.exports = Student