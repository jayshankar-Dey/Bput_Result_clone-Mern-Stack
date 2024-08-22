const { z } = require('zod')

const ExampSchema = z.object({
    semister: z.string({ required_error: "semistar name is required" }).trim(),
    type: z.string({ required_error: "type is required" }).trim(),

    year: z.string({ required_error: 'year is required' }).trim()
})

module.exports = ExampSchema