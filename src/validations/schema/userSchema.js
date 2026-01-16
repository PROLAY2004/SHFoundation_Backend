import * as yup from 'yup';

export const userSignupSchema = yup.object({
  name: yup.string().required('Please enter your name.'),
  email: yup.string().required('Please enter your email.'),
  password: yup.string().required('Please enter your password.'),
});

export const userLoginSchema = yup.object({
  email: yup.string().required('Please enter your email.'),
  password: yup.string().required('Please enter your password.'),
});