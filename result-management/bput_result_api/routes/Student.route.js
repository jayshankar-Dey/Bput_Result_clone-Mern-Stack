const express = require('express');
const isauth = require('../middlewares/isauth.middlewares')
const validateMiddleware = require('../middlewares/validateMiddleware');
const StudentController = require('../controllers/Student.controller');
const studentSchema = require('../validation/studatent.Validation');
const singleUplode = require('../middlewares/singleUplode')
const ExampSchema = require('../validation/ExamValidation')
const StudentExampController = require('../controllers/studentExam.controller');
const markSchema = require('../validation/markValidatio')
const StudentMarkController = require('../controllers/StudentMark.controller');
const router = express.Router()
    //add
router.post('/add', isauth, validateMiddleware(studentSchema), StudentController.addStudent)

router.put('/profile/update/:id', isauth, StudentController.updateStudentRecord)

router.put('/profileImage/update/:id', isauth, singleUplode, StudentController.updateProfile_image)

router.delete('/delete/:id', isauth, StudentController.delete_Students)

router.get('/all', isauth, StudentController.get_All_Students);

//exam statusupdate
router.put('/semistar/create/:id', isauth, validateMiddleware(ExampSchema), StudentExampController.createExamp)

router.get('/get/exam/:reg/:type', StudentExampController.examGet)

router.delete('/delete/semistar/:id', isauth, StudentExampController.deleteExam)

router.put('/update/:id', isauth, StudentExampController.UpdateExam)


router.post('/add/mark', isauth, validateMiddleware(markSchema), StudentMarkController.addMark)

router.get('/get/mark/:examId', StudentMarkController.VewMark)

router.post('/rechecking/subjects', StudentMarkController.rechecking_apply)
router.post('/varify/payment', StudentMarkController.Varify_apply)
router.get('/get/rechecking/:examId', StudentMarkController.get_rechecking)
router.get('/getall/rechecking', isauth, StudentMarkController.get_all_rechecking)
module.exports = router