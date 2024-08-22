const errorMiddleware = (err, req, res, next) => {

    console.log(`error in api ${err}`.bgRed)
    const status = err.status || 500;
    const message = err.message || "internal server error"

    return res.status(status).json({
        success: false,
        message
    })




}

module.exports = errorMiddleware