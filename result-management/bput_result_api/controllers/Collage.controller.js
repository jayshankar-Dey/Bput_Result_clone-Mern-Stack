const castError = require('../middlewares/castError')
const Colleges = require('../models/Collage.model')


class CollageController {

    addCollage = async(req, res, next) => {
        const { collageName, address } = req.body
        try {
            const collage = await Colleges.create({ user: req.user, collageName, address })
            res.json({
                success: true,
                message: "collage added successfully",
                collage
            })
        } catch (error) {
            next(error)
        }
    }

    getCollage = async(req, res) => {
            try {
                const { id } = req.params
                const collage = await Colleges.findById(id);
                res.json({
                    success: true,
                    message: "collage get succesfully",
                    collage
                })
            } catch (error) {
                castError(error, res)
            }
        }
        //get all college
    get_All_Collage = async(req, res, next) => {
        try {
            const { search } = req.params
            const { page } = req.query
            console.log(search, page)
            const limit = 9
            const skip = (page - 1) * limit
            const find = {}
            if (search) {
                find.collageName = { $regex: search, $options: 'i' }
            }
            // await Colleges.find(find).skip(skip).limit(limit)
            const collage = await Colleges.find(find).skip(skip).limit(limit)
            const total = await Colleges.find({})
            const totapage = Math.ceil(total.length / limit)
            res.json({
                message: "collage get succesfully",
                collage,
                total: total.length,
                totapage
            })
        } catch (error) {
            next(error)
            console.error(error)
        }
    }

    updateCollage = async(req, res) => {
        try {
            const { id } = req.params
            const { collageName, address } = req.body
            const collage = await Colleges.findById(id)
            if (collageName) collage.collageName = collageName;
            if (address) collage.address = address;
            await collage.save()
            res.json({
                success: true,
                message: "collage Update succesfully",
                collage
            })
        } catch (error) {
            castError(error, res)
        }
    }
    deleteCollage = async(req, res) => {
        try {
            const { id } = req.params
            const collage = await Colleges.findByIdAndDelete(id)
            res.json({
                success: true,
                message: "collage delete succesfully",
                collage
            })
        } catch (error) {
            castError(error, res)
        }
    }
}

module.exports = new CollageController()