const Colleges = require('../models/Collage.model');
const UserModel = require('../models/Users.model')
const Student = require('../models/Student.model')
const register_controller = async(req, res) => {
    try {
        const { name, email, password } = req.body
        const exiestuser = await UserModel.findOne({ email: email })
        if (exiestuser) {
            res.status(200).json({
                success: false,
                message: `User alrady register please login`
            });
        } else {

            const user = await UserModel.create({ name, email, password })
            res.status(200).json({
                success: true,
                message: `Dear ${name} register succesfully`,
                user
            });
            console.log(name)
        }

    } catch (error) {
        console.log(`error in register api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `error in register  controller ${error}`
        });
    }
}

///login controller
const login_controller = async(req, res) => {
        try {
            const { email, password } = req.body
            const exiestuser = await UserModel.findOne({ email: email })
            if (!exiestuser) {
                res.status(200).json({
                    success: false,
                    message: `please enter valide email`
                });
            } else {
                const compaire = await exiestuser.compairePassword(password)
                if (compaire) {
                    const token = await exiestuser.genarateTokrn()
                    res.status(200).json({
                        success: true,
                        message: `Dear ${exiestuser.name} login succesfully`,
                        token: token
                    });

                } else {
                    res.status(200).json({
                        success: false,
                        message: `email and password not metch`
                    });
                }
            }

        } catch (error) {
            console.log(`error in login api ${error}`.bgRed)
            res.status(400).json({
                success: false,
                message: `error in login  controller ${error}`
            });
        }
    }
    //get login user data
const getsingleUserData = async(req, res) => {
    try {
        const { id } = req.params

        const user = await UserModel.findById(id)
        user.password = undefined
        res.status(200).json({
            success: true,
            message: "get succesfully",
            user
        });
    } catch (error) {
        console.log(`error in get user data api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `error in get user  controller ${error}`
        });
    }
}

///delete users

const get_All_users = async(req, res) => {
    try {
        const { search } = req.params;
        const { page } = req.query
        const limit = 9

        const find = {}
        if (search) {
            find.name = { $regex: search, $options: 'i' }
        }
        const skip = (page - 1) * limit
        const user = await UserModel.find(find).limit(limit).skip(skip)
        const users = await UserModel.find({})
        const totalCollege = (await Colleges.find({})).length
        const total = Math.ceil(users.length / limit)
        const TotalStudents = await Student.find({})
        res.status(200).json({
            success: true,
            message: "get succesfully",
            user,
            total,
            totalUsers: users.length,
            totalCollege,
            TotalStudents: TotalStudents.length
        });
    } catch (error) {
        console.log(`error in get users data api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `error in get users  controller ${error}`
        });
    }
}


//delete Users
const deleteUsers = async(req, res) => {
    try {
        const { id } = req.params
        await UserModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "delete succesfully",

        });
    } catch (error) {
        console.log(`error in delete user data api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `error in delete user  controller ${error}`
        });
    }
}



//update Users
const UpdateUsers = async(req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body

        const user = await UserModel.findById(id)
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save()
        res.status(200).json({
            success: true,
            message: "update succesfully",

        });
    } catch (error) {
        console.log(`error in update user data api ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `error in update user  controller ${error}`
        });
    }
}



module.exports = {
    register_controller,
    login_controller,
    getsingleUserData,
    get_All_users,
    deleteUsers,
    UpdateUsers
}