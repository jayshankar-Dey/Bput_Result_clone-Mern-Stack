const castError = require('../middlewares/castError')
const Colleges = require('../models/Collage.model')
const Student = require('../models/Student.model')
const getFile = require('../config/dataUri')
const cloudinary = require('cloudinary')

class StudentExampController {
    createExamp = async(req, res, next) => {
        try {
            const { id } = req.params
            const { semister, type, year } = req.body
            const student = await Student.findByIdAndUpdate(id, { $push: { exams: { semister, type, year } } })
            res.json({
                success: true,
                message: "exam add successfully",
                student
            });
        } catch (error) {
            next(error)
        }
    }

    examGet = async(req, res, next) => {
        try {
            const { reg, type } = req.params;
            console.log(reg, type)
            if (!reg || !type) return res.json({
                success: false,
                message: "Please provide all fields"
            })
            const find = await Student.findOne({ reg: reg })
            if (!find) return res.json({
                success: false,
                message: "enter valide reg no"
            })
            const Collage = await Colleges.findById(find.collage, { student: 0, user: 0, delete: 0 })
            const student = await Student.findById(find._id, { exams: 0, admitionDate: 0, collage: 0 })
            const exam = find.exams.filter((exam) => {
                if (exam.type.toLowerCase() == type.toLowerCase()) {
                    return exam
                }
            })
            if (exam.length === 0) return res.json({
                success: false,
                message: "Please enter valid type"
            })
            res.json({
                success: true,
                message: "exam get successfully",
                Collage,
                student,
                exam
            });
        } catch (error) {
            next(error)
        }
    }

    deleteExam = async(req, res, next) => {
        try {
            const { id } = req.params
            const { exam_id } = req.query
                // const student = await Student.findByIdAndUpdate(id, {
                //     $pull: {
                //         exams: {
                //             _id: exam_id
                //         }
                //     }
                // })
            const student = await Student.findById(id)
            let index;
            console.log("student", id, "exam_id", exam_id, "index", index)
            student.exams.forEach((exam, i) => {
                if (exam._id.toString() == exam_id.toString()) index = i
            })
            student.exams.pull(student.exams[index])
            await student.save()
            res.json({
                success: true,
                message: "exam delete successfully",
                student
            });
        } catch (error) {
            next(error)
        }
    }

    UpdateExam = async(req, res, next) => {
        try {
            const { semister, type, year } = req.body;
            const { id } = req.params
            const { exam_id } = req.query
            const student = await Student.findById(id)
            let index = -1;
            student.exams.forEach((exam, i) => {
                if (exam._id.toString() == exam_id.toString()) index = i
            })
            if (index < 0) res.json({ message: "Please enter valide exam id" })
            if (semister) student.exams[index].semister = semister
            if (type) student.exams[index].type = type
            if (year) student.exams[index].year = year

            await student.save()
            res.json({
                success: true,
                message: "exam update successfully",
                student
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new StudentExampController