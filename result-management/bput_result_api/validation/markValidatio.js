const { z } = require('zod')

const markSchema = z.object({
    subjectCode: z.string({ required_error: "subjectCode is required" }).trim().min(5, { message: "SubjectCode is minimum 5 character" }),


    subjectName: z.string({ required_error: "subjectName is required" }).trim().min(5, { message: "subjectName is minimum 5 character" }),

    type: z.string({ required_error: "type is required" }),

    examId: z.string({ required_error: "type is required" }),


    cradit: z.string({ required_error: "cradit is required" }),

    finamGrade: z.string({ required_error: "finamGrade is required" }),
})

module.exports = markSchema