const yup = require("yup");
const registrationSchema = yup.object({
  body: yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter valid email"),
    password: yup.string().required("Password is required"),
    phoneNumber: yup.string().required("Phone number is required"),
  }),
});
const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter valid email"),
    password: yup.string().required("Password is required"),
  }),
});
module.exports = {
  registrationSchema,
  loginSchema,
};
