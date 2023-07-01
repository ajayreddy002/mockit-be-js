const yup = require("yup");
const plansSchema = yup.object({
    body: yup.object({
        category: yup.string().required('Category is required'),
        title: yup.string().required('Title is required'),
        duration: yup.string('Please enter number').required('Duration is required'),
        // objective: yup.boolean().required('Objective is required'),
        programming: yup.boolean().required('Programming is required'),
        skills: yup.array().required('skills are required'),
        price: yup.number('Please enter number').required('Duration is required')
    })
})
module.exports = { plansSchema }