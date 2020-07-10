import * as yup from 'yup';
import moment from 'moment';
import { ICompanyBankDetails } from './interfaces';

function isInFuture({ joinedAtYear, joinedAtMonth }: ICompanyBankDetails) {
  const joiningMoment = moment(`${joinedAtMonth}-${joinedAtYear}`, 'MM-YYYY');
  const inPast = moment().diff(joiningMoment, 'months') >= 0;
  return inPast ? null : 'In future';
}

function timeValidator(this: yup.TestContext) {
  const { createError, path, parent } = this;
  const error = isInFuture(parent);
  return error ? createError({ message: error, path }) : true;
}

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
  joinedAtYear: yup.string().required('Please select account opening date'),
  joinedAtMonth: yup
    .string()
    .required('Please select account opening date')
    .when('joinedAtYear', {
      is: new Date().getFullYear().toString(),
      then: yup
        .string()
        .test(
          'not-in-future',
          'Oops, this date seems to be in the future',
          timeValidator,
        ),
    }),
});

export default ValidationSchema;
