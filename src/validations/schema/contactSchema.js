import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup.string().required('Please enter your name.'),
  email: yup.string().required('Please enter your email.'),
  subject: yup.string().required('Please enter subject.'),
  message: yup.string().required('Please enter your message.'),
});