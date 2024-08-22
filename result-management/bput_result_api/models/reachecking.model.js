const mongoose = require('mongoose')


const RechackingSchema = new mongoose.Schema({
    semistarID: {
        type: mongoose.Schema.Types.ObjectId
    },
    subjects: {
        type: Array,
        required: [true, "subjects is required"]
    },
    collage: {
        type: String,
        required: [true, "collage is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    reg: {
        type: String,
        required: [true, "reg is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    semistar: {
        type: String,
        required: [true, "semistar is required"]
    },
    payment: {
        type: Boolean,
        required: [true, "payment is required"],
        default: false
    },


}, {
    timestamps: true,
    strict: false
})

const Rechackings = mongoose.model("Rechackings", RechackingSchema)

module.exports = Rechackings