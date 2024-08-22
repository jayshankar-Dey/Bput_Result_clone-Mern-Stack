const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true })
userSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('password')) {
        next();
    }
    user.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.genarateTokrn = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}
userSchema.methods.compairePassword = function(password) {
    return bcrypt.compare(password, this.password)
}
const UserModel = mongoose.model("Users", userSchema)
module.exports = UserModel