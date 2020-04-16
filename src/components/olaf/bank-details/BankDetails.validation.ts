import * as yup from 'yup';
import { IBankDetails } from './interfaces';

const ValidationSchema = yup.object().shape<IBankDetails>({
  nameOnTheAccount: yup.string().required('Please enter name on account'),
  accountNumber: yup
    .string()
    .required('Please enter account number')
    .matches(/^[0-9\b]+$/, 'Please enter numbers only')
    .length(8, 'Account number should have 8 digits'),
  sortCode: yup.lazy(() =>
    yup
      .array()
      .of(yup.string())
      .required('Please enter sort code'),
  ),
  bankName: yup.string().required('Please enter bank name'),
  openingMonth: yup.string().required('Please select account opening date'),
  openingYear: yup.string().required('Please select account opening date'),
  understand: yup.boolean().oneOf([true], 'The understading must be accetped'),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted'),
});

export default ValidationSchema;
