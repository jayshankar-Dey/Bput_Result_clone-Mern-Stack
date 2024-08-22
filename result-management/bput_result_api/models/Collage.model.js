const mongoose = require('mongoose')

const collageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    collageName: {
        type: String,
        required: [true, "collage name is require"]
    },
    address: {
        type: String,
        required: [true, "Address is requires"]
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"

    }],
    delete: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const Colleges = mongoose.model("Colleges", collageSchema)

module.exports = Colleges