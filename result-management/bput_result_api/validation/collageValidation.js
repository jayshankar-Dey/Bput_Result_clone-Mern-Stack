const { z } = require('zod')

const collageSchema = z.object({
    collageName: z.string({ required_error: "please enter valide collage name" }).min(5, { message: "collage name most be 5 character" }),
    address: z.string({ required_error: "address is required" }).min(10, { message: "address most be 10 character" })
})


module.exports = collageSchema