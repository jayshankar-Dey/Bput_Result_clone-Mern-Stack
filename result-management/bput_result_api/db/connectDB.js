const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.DB).then(() => {
        console.log("Connection Succesfully".bgBlue)
    }).catch((error) => {
        console.log(`error in connection ${error}`)
    })
}
module.exports = connectDB