const { z } = require('zod')

const studentSchema = z.object({
    collage: z.string({ required_error: "collage id is required" }).min(5, { message: "college min 5 character" }).trim(true),

    studentName: z.string({ required_error: "Student name is required" }).min(5, { message: "Student name most be 5 charactor" }),

    branch: z.string({ required_error: "Branch name is required" }).min(3, { message: "branch name most be 3 characher" }).trim(true),

    reg: z.string({ required_error: "Registration no is required" }).min(5, { message: "minimum 5 character" }).max(10, { message: "Registration no maximum 10 character" }).trim(true),

    address: z.string({ required_error: "Address is required" }).trim(true).min(10, { message: "address most be 10 character" })

});


module.exports = studentSchema;