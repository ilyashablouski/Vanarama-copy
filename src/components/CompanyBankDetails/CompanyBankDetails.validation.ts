import * as yup from 'yup';
import { ICompanyBankDetails } from './interfaces';
import { diffInMonth } from '../../utils/dates';
import { BANK_ACCOUNT_NAME_REGEX, BANK_NAME_REGEX } from '../../utils/regex';

function isInPast({ joinedAtYear, joinedAtMonth }: ICompanyBankDetails) {
  if (!joinedAtYear || !joinedAtMonth) {
    return '';
  }
  const inPast =
    diffInMonth(
      new Date(),
      new Date(parseInt(joinedAtYear, 10), parseInt(joinedAtMonth, 10) - 1, 1),
    ) <= 0;
  return inPast ? '' : 'Oops, this date seems to be in the future';
}

function timeValidator(this: yup.TestContext) {
  const { createError, path, parent } = this;
  const error = isInPast(parent);

  return error ? createError({ message: error, path }) : true;
}

const ValidationSchema = yup.object().shape({
  bankName: yup
    .string()
    .required('Please enter bank name')
    .matches(BANK_NAME_REGEX, 'Please use only letters, apostrophes and dashes')
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(100, 'Oops, this name’s too long. Please keep it to 100 characters'),
  accountName: yup
    .string()
    .required('Please enter bank account name')
    .matches(
      BANK_ACCOUNT_NAME_REGEX,
      'Please use only letters, apostrophes and dashes',
    )
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(160, 'Oops, this name’s too long. Please keep it to 100 characters'),
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
