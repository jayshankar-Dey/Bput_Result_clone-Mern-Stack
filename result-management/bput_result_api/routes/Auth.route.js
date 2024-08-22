const express = require('express');
const {
    register_controller,
    login_controller,

    get_All_users,
    deleteUsers,
    getsingleUserData,
    UpdateUsers
} = require('../controllers/Auth.controller');
const validateMiddleware = require('../middlewares/validateMiddleware');
const registerSchema = require('../validation/userValidation');
const isauth = require('../middlewares/isauth.middlewares');

const router = express.Router();

router.post('/register', validateMiddleware(registerSchema), register_controller)
router.post('/login', login_controller)
router.get('/user/:id', isauth, getsingleUserData)
router.get('/get/users/:search?', isauth, get_All_users)
router.delete('/delete/users/:id', isauth, deleteUsers)
router.post('/update/users/:id', isauth, UpdateUsers)
module.exports = router