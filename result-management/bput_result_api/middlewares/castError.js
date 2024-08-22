const castError = (error, res) => {
    if (error.name == "CastError") {
        return res.status(400).json({
            success: false,
            message: "Please enter valide id"
        })
    } else {
        next(error)
    }
}
module.exports = castError