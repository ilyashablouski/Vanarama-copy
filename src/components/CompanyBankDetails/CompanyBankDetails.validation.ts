import * as yup from 'yup';
import moment from 'moment';
import { ICompanyBankDetails } from './interfaces';

function isInPast({ joinedAtYear, joinedAtMonth }: ICompanyBankDetails) {
  if (!joinedAtYear || !joinedAtMonth) {
    return '';
  }
  const inPast =
    moment(`${joinedAtMonth}-${joinedAtYear}`, 'MM-YYYY').diff() <= 0;
  return inPast ? '' : 'Oops, this date seems to be in the future';
}

function timeValidator(this: yup.TestContext) {
  const { createError, path, parent } = this;
  const error = isInPast(parent);

  return error ? createError({ message: error, path }) : true;
}

const ValidationSchema = yup.object().shape({
  accountName: yup
    .string()
    .required('Please enter bank account name')
    .matches(
      /^^[a-zA-Z'-\s]+$/,
      'Please use only letters, apostrophes and dashes',
    )
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(100, 'Oops, this name’s too long. Please keep it to 100 characters'),
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
  joinedAtYear: yup
    .string()
    .required('Please select account opening date')

    .test(
      'not-in-future',
      'Oops, this date seems to be in the future',
      timeValidator,
    ),
  joinedAtMonth: yup
    .string()
    .required('Please select account opening date')
    .test(
      'not-in-future',
      'Oops, this date seems to be in the future',
      timeValidator,
    ),
});

export default ValidationSchema;
