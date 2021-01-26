import * as yup from 'yup';
import { IIncomeCalculatorFormValues } from './interfaces';

const ValidationSchema = yup.object().shape<IIncomeCalculatorFormValues>({
  averageMonthlyIncome: yup
    .string()
    .required('Please enter your monthly income'),
  suitabilityConsent: yup.boolean().oneOf([true], 'You must accept to proceed'),
  mortgageOrRent: yup.string().required('Please enter your mortgage or rent'),
  phoneAndInternet: yup
    .string()
    .required('Please enter your phone and internet'),
  creditCardPayments: yup
    .string()
    .required('Please enter your credit car payments'),
  utilities: yup.string().required('Please enter your utilities'),
  insurance: yup.string().required('Please enter your car insurance'),
  carFinance: yup.string().required('Please enter your car finance'),
  foodAndClothes: yup.string().required('Please enter your food and clothes'),
  fuel: yup.string().required('Please enter your fuel'),
  studentLoans: yup.string().required('Please enter your student loan'),
  otherCredit: yup.string().required('Please enter your other credit'),
});

export default ValidationSchema;
