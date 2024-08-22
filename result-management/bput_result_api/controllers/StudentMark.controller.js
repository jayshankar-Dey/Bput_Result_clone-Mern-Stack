const castError = require('../middlewares/castError')
const Colleges = require('../models/Collage.model')
const Rechacking = require('../models/reachecking.model')
const Marks = require('../models/Mark.model')
const Razorpay = require('razorpay')


class StudentMarkController {


    addMark = async(req, res, next) => {
        try {
            const { subjectCode, subjectName, type, cradit, finamGrade, examId } = req.body
            const mark = await Marks.create({ examId, subjectCode, subjectName, type, cradit, finamGrade })
            res.json({
                success: true,
                message: "Mark added successfully",
                mark
            })
        } catch (error) {
            next(error)
        }
    }

    VewMark = async(req, res, next) => {
        try {

            const mark = await Marks.find({
                examId: req.params.examId
            })
            res.json({
                success: true,
                message: "Mark get successfully",
                mark
            })
        } catch (error) {
            next(error)
        }
    }

    ///rechhacking apply
    rechecking_apply = async(req, res, next) => {
        try {

            const { subjects, collage, name, reg, semistar, price, semistarID } = req.body
            var rezorpay = new Razorpay({
                key_id: 'rzp_test_Ww0iu7fNG3RgTd',
                key_secret: 'o0yrzL6rnyzFvJIXyhrOE0DB',
            });

            var options = {
                amount: Number(price * 100),
                currency: "INR"
            };

            const order = await rezorpay.orders.create(options);
            console.log(subjects, collage, name, reg, semistar, price, semistarID)
            res.json({
                success: true,
                message: "Mark get successfully",
                order,
                subjects,
                collage,
                name,
                reg,
                semistar,
                price,
                semistarID
            })
        } catch (error) {
            next(error)
        }
    }

    ///Varidy apply
    Varify_apply = async(req, res, next) => {
        try {
            const {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                subjects,
                collage,
                name,
                reg,
                semistar,
                price,
                semistarID
            } = req.body

            const cheching = await Rechacking.create({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                subjects,
                collage,
                name,
                reg,
                semistar,
                price,
                semistarID,
                payment: true
            })
            res.json({
                success: true,
                message: "varify get successfully",
            })
        } catch (error) {
            next(error)
        }
    }

    ///get rechecking
    get_rechecking = async(req, res, next) => {
        try {
            const rechecking = await Rechacking.find({ semistarID: req.params.examId })
            res.json({
                success: true,
                message: "rechecking get successfully",
                rechecking
            })
        } catch (error) {
            next(error)
        }

    }

    ///get ll rechecking
    get_all_rechecking = async(req, res, next) => {
        try {
            const rechecking = await Rechacking.find({})
            res.json({
                success: true,
                message: "rechecking get successfully",
                rechecking
            })
        } catch (error) {
            next(error)
        }

    }
}


module.exports = new StudentMarkController