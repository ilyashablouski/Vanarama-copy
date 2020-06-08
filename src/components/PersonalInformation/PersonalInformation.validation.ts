import * as yup from 'yup';
import { WORLDWIDE_MOBILE_REGEX } from '../../utils/regex';

const reqMsg = (rel: string) => `Please enter your ${rel}`;

const ValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(reqMsg('first name'))
    .matches(
      /^^[a-zA-Z'-\s]+$/,
      'Please use only letters, apostrophes and dashes',
    )
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
  lastName: yup
    .string()
    .required(reqMsg('last name'))
    .matches(
      /^^[a-zA-Z'-\s]+$/,
      'Please use only letters, apostrophes and dashes',
    )
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
  mobile: yup
    .string()
    .required(reqMsg('mobile number'))
    .max(
      16,
      'Oops, this mobile number is too long. Please enter 16 characters or less',
    )
    .min(
      11,
      'Oops, this mobile number is too short. Please enter 11 characters or more',
    )
    .matches(
      WORLDWIDE_MOBILE_REGEX,
      'Please enter mobile number without spaces or hyphens',
    ),
});

export default ValidationSchema;
