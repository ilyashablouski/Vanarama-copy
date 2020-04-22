import * as yup from 'yup';
import { IIncomeCalculatorFormValues } from './interfaces';

const ValidationSchema = yup.object().shape<IIncomeCalculatorFormValues>({
  averageMonthlyIncome: yup
    .string()
    .required('Please enter your monthly income'),
});

export default ValidationSchema;
