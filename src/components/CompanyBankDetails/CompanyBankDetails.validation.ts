import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
  accountName: yup.string().required('Please enter bank account name'),
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
        .min(2, 'Please enter sort code'),
    )
    .required('Please enter sort code'),
  // joinedAtMonth: yup.string().required('Please select account opening date'),
  // joinedAtYear: yup.string().required('Please select account opening date'),
});

export default ValidationSchema;
