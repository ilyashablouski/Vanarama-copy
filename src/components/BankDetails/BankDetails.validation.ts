import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
  nameOnTheAccount: yup.string().required('Please enter name on account'),
  accountNumber: yup
    .string()
    .required('Please enter account number')
    .matches(/^[0-9\b]+$/, 'Please enter numbers only')
    .length(8, 'Account number should have 8 digits'),
  sortCode: yup
    .array()
    .of(
      yup
        .string()
        .required('Please enter sort code')
        .min(6, 'Please enter sort code'),
    )
    .required('Please enter sort code'),
  bankName: yup.string().required('Please enter bank name'),
  openingMonth: yup.string().required('Please select account opening date'),
  openingYear: yup.string().required('Please select account opening date'),
  understand: yup.boolean().oneOf([true], 'The understanding must be accepted'),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted'),
  checkCreditHistory: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted'),
  affordRental: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted'),
});

export default ValidationSchema;
