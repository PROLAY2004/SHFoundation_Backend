import * as yup from 'yup';

export const volunteerSchema = yup.object({
  skills: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one skill.'),
  availability: yup.string().required('Please specify your availability.'),
  details: yup.string().required('Please write about your motivation'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and conditions'),
});
