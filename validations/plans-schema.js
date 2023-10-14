const yup = require("yup");
const plansSchema = yup.object({
    body: yup.object({
        interviewType: yup.string().required('Interview type is required'),
        title: yup.string().required('Title is required'),
        skills: yup.array().required('skills are required'),
        price: yup.number('Please enter number').required('Duration is required')
    })
})
module.exports = { plansSchema }