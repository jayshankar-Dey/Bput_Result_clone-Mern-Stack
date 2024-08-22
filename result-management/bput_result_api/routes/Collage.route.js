const express = require('express');
const CollageController = require('../controllers/Collage.controller');
const isauth = require('../middlewares/isauth.middlewares')
const validateMiddleware = require('../middlewares/validateMiddleware');
const collageSchema = require('../validation/collageValidation');
const router = express.Router()
    //add
router.post('/add', isauth, validateMiddleware(collageSchema), CollageController.addCollage)
    //get
router.get('/get/:id', isauth, CollageController.getCollage)
    //get all users
router.get('/all/:search?', isauth, CollageController.get_All_Collage)
    //update
router.put('/update/:id', isauth, CollageController.updateCollage)
    //delete
router.delete('/delete/:id', isauth, CollageController.deleteCollage)

module.exports = router