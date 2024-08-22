const { z } = require("zod")

const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(3, { message: "Name must be 3 character" }).max(20, { message: "Name most be maximum 20 character" }),
    email: z.string({
        required_error: "email is required"
    }).email({ message: "invalide email address" }).trim().min(3, { message: "email must be 3 character" }).max(20, { message: "maximum 20 character" }),
    password: z.string({
        required_error: "email is required"
    }).trim().min(3, { message: "Password must be 3 character" }).max(20, { message: "maximum 20 character" }),
})

module.exports = registerSchema