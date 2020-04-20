import * as Yup from 'yup';
import { checkFuture } from '../../utils/validation';
import { IEmploymentFormValues } from './interfaces';
import { WORLDWIDE_MOBILE_REGEX } from '../../utils/regex';

const requiredWhenEmployed = (message: string) => (
  status: string,
  schema: Yup.StringSchema,
) =>
  // TODO: Work out how to get these magic strings from the BE instead
  status === 'Employed' || status === 'Self employed'
    ? schema.required(message)
    : schema;

export default Yup.object().shape<IEmploymentFormValues>({
  history: Yup.array().of(
    Yup.object().shape({
      status: Yup.string().required('Please enter your employment status'),
      title: Yup.string().when(
        'status',
        requiredWhenEmployed('Please enter the job title'),
      ),
      type: Yup.string().when(
        'status',
        requiredWhenEmployed('Please enter the employment type'),
      ),
      company: Yup.string().when(
        'status',
        requiredWhenEmployed('Please enter the company name'),
      ),
      phoneNumber: Yup.string()
        .when(
          'status',
          requiredWhenEmployed('Please enter the work phone number'),
        )
        .matches(
          WORLDWIDE_MOBILE_REGEX,
          'Please enter work phone number without spaces or hyphens',
        ),
      address: Yup.string().when(
        'status',
        requiredWhenEmployed('Please enter the company address'),
      ),
      income: Yup.string().when(
        'status',
        requiredWhenEmployed('Please enter the gross annual income'),
      ),
      month: Yup.string()
        .required('Please select the date you started')
        .test(
          'max',
          'Oops, the date you started cannot be in the future',
          checkFuture,
        ),
      year: Yup.string()
        .required('Please select the date you started')
        .test(
          'max',
          'Oops, the date you started cannot be in the future',
          checkFuture,
        ),
    }),
  ),
});
