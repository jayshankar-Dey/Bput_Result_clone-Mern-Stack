const jwt = require('jsonwebtoken')

const isauth = async(req, res, next) => {
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Un-authorize user"

                });
            } else {
                req.user = decode.id;
                next()
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "please provide token",
            error
        });;
    }
}
module.exports = isauth