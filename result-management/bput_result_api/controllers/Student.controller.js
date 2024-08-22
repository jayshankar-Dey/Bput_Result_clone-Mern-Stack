const castError = require('../middlewares/castError')
const Colleges = require('../models/Collage.model')
const Student = require('../models/Student.model')
const getFile = require('../config/dataUri')
const cloudinary = require('cloudinary')
class StudentController {


    addStudent = async(req, res, next) => {
        const { collage, studentName, branch, reg, address } = req.body
        try {
            const exiest = await Student.findOne({ reg: reg })
            if (exiest) return res.json({ message: "Student alrady exist" })
            const student = await Student.create({ collage, studentName, branch, reg, address })
            const Collage = await Colleges.findByIdAndUpdate({ _id: collage }, { $addToSet: { student: student._id } })
            res.json({
                success: true,
                message: "Student add succesfully",
                student
            })
        } catch (error) {
            next(error)
        }
    }


    updateStudentRecord = async(req, res) => {
        const { collage, studentName, branch, reg, address } = req.body
        const { id } = req.params;
        try {
            const student = await Student.findById(id);
            if (collage) student.collage = collage;
            if (studentName) student.studentName = studentName;
            if (branch) student.branch = branch;
            if (reg) student.reg = reg;
            if (address) student.address = address;
            await student.save()
            res.json({
                success: true,
                message: "Profile update succesfully",
                student
            })
        } catch (error) {
            castError(error, res)
        }
    }

    ///update profile image
    updateProfile_image = async(req, res) => {
        const { id } = req.params;
        try {
            const student = await Student.findById(id);
            if (req.file) {
                if (student.image.public_id) {
                    await cloudinary.v2.uploader.destroy(student.image.public_id)
                }
                const file = getFile(req.file)
                const cdb = await cloudinary.v2.uploader.upload(file.content)
                student.image = {
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                }
            }
            await student.save()
            res.json({
                success: true,
                message: "Profile image update succesfully",
                student
            })
        } catch (error) {
            castError(error, res)
        }
    }

    //get all students
    get_All_Students = async(req, res, next) => {
        try {
            const { collage, reg, id, page } = req.query;
            console.log(reg)
            const limit = 9
            const skip = (page - 1) * limit
            const quary = {}
            if (collage) quary.collage = collage
            if (reg) quary.reg = { $regex: reg, $options: 'i' }
            if (id) quary._id = id
            console.log(quary)
            let students = await Student.find(quary).populate({ path: "collage" }).limit(limit).skip(skip)
            const allStudent = await Student.find({})
            const TotalPage = Math.ceil(allStudent.length / limit)
            res.json({
                success: true,
                message: "Student get Succesfully",
                students,
                TotalPage
            })
        } catch (error) {
            next(error)
        }
    }

    //delete students
    delete_Students = async(req, res, next) => {
        try {
            const { id } = req.params;
            const student = await Student.findById(id)
            await Colleges.findByIdAndUpdate({ _id: student.collage }, { $pull: { student: student._id } })
            await student.deleteOne()
            res.json({
                success: true,
                message: "Student delete Succesfully",
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new StudentController