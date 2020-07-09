import * as yup from 'yup';
import moment from 'moment';

function isInFuture({
  joinedAtYear,
  joinedAtMonth
}) {
  return joinedAtMonth > new Date().getMonth()+1 ? 'In future': null;
}

function timeValidator(this: yup.TestContext) {
  const { createError, path, parent } = this;
  const error = parent.joinedAtMonth > new Date().getMonth()+1 ? 'In future': null;
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
  joinedAtMonth: yup.string()
    .required('Please select account opening date')
    .when('joinedAtYear', {
      is: new Date().getFullYear().toString(),
      then: yup.string().test('not-in-future', 'In future', timeValidator),
    }),
  // .when('joinedAtYear', {
  //   is: (val) => val == "2020",//new Date().getFullYear().toString(),
  //   // is: new Date().getFullYear().toString(),
  //   otherwise: yup.number().max(7),
  //   then: yup.number().max(7),
  //   // then: yup.string()
  //   //   .test(
  //   //     'not-in-future',
  //   //     'In future',
  //   //     value => true/* {
  //   //       console.log(value);
  //   //       return true;
  //   //     } */)
  // }),
});

export default ValidationSchema;
