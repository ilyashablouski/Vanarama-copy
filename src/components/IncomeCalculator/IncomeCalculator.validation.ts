import * as yup from 'yup';
import { IIncomeCalculatorFormValues } from './interfaces';

const createValidationSchema = (monthlyPayment: number) =>
  yup.object().shape<IIncomeCalculatorFormValues>({
    averageMonthlyIncome: yup
      .string()
      .required('Please enter your monthly income'),
    suitabilityConsent: yup
      .boolean()
      .oneOf([true], 'You must accept to proceed'),
    mortgageOrRent: yup.string().required('Please enter your mortgage or rent'),
    phoneAndInternet: yup
      .string()
      .required('Please enter your phone and internet'),
    creditCardPayments: yup
      .string()
      .required('Please enter your credit card payments'),
    utilities: yup.string().required('Please enter your utilities'),
    insurance: yup.string().required('Please enter your car insurance'),
    carFinance: yup.string().required('Please enter your car finance'),
    foodAndClothes: yup.string().required('Please enter your food and clothes'),
    fuel: yup.string().required('Please enter your fuel'),
    studentLoan: yup.string().required('Please enter your student loan'),
    otherCredit: yup.string().required('Please enter your other credit'),
    netDisposableIncome: yup
      .string()
      .when(
        [
          'averageMonthlyIncome',
          'mortgageOrRent',
          'phoneAndInternet',
          'creditCardPayments',
          'utilities',
          'insurance',
          'carFinance',
          'foodAndClothes',
          'fuel',
          'studentLoan',
          'otherCredit',
        ],
        {
          is: (...args) => args.every(Boolean),
          then: yup
            .string()
            .test(
              'netDisposableIncome',
              'Based on your outgoings, it looks like you won’t be able to afford the monthly rentals on this lease.',
              value => Number(value) > monthlyPayment,
            ),
        },
      ),
  });

export default createValidationSchema;
