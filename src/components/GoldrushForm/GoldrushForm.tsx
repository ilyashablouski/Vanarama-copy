import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { useForm } from 'react-hook-form';
import {
  EMAIL_REGEX,
  WORLDWIDE_MOBILE_REGEX,
  POSTCODE,
} from '../../utils/regex';
import { IGoldrushFormProps, IGoldrushFromValues } from './interfaces';

const MAX_EMAIL_LENGTH = 254;

const GoldrushForm: React.FC<IGoldrushFormProps> = ({
  onSubmit,
  isSubmitting,
  isPostcodeVisible,
  heading,
}) => {
  const buttonLabel = isSubmitting ? 'Loading...' : 'Get Quote Now';
  const { handleSubmit, errors, register } = useForm<IGoldrushFromValues>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  return (
    <Form dataTestId="goldrush-form" onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="span" size="lead" color="black">
        {heading}
      </Heading>
      <Formgroup
        controlId="goldrush-form_full-name"
        label="Full Name"
        error={errors.fullName?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_full-name"
          dataTestId="goldrush-form_full-name"
          name="fullName"
          ref={register({
            required: {
              value: true,
              message: 'Please inter your full name',
            },
          })}
          type="text"
        />
      </Formgroup>
      <Formgroup
        controlId="goldrush-form_email"
        label="Email Address"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_email"
          dataTestId="goldrush-form_email"
          name="email"
          ref={register({
            required: {
              value: true,
              message: 'Your enter your email address',
            },
            maxLength: {
              value: MAX_EMAIL_LENGTH,
              message: `Email address should not exceed ${MAX_EMAIL_LENGTH} characters`,
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Oops, this email address is invalid',
            },
          })}
          type="text"
        />
      </Formgroup>
      <Formgroup
        controlId="goldrush-form_phone-number"
        label="Phone Number"
        error={errors.phoneNumber?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_phone-number"
          dataTestId="goldrush-form_phone-number"
          name="phoneNumber"
          ref={register({
            required: {
              value: true,
              message: 'Please enter your mobile number',
            },
            minLength: {
              value: 11,
              message:
                'Oops, this mobile number is too short. Please inter 11 characters or more',
            },
            maxLength: {
              value: 16,
              message:
                'Oops, this mobile number is too long. Please inter 16 characters or less',
            },
            pattern: {
              value: WORLDWIDE_MOBILE_REGEX,
              message:
                'Please enter your mobile number without spaces or hyphens',
            },
          })}
          type="text"
        />
      </Formgroup>
      {isPostcodeVisible && (
        <Formgroup
          controlId="goldrush-form_postcode"
          label="Postcode"
          error={errors.postcode?.message?.toString()}
        >
          <TextInput
            id="goldrush-form_postcode"
            dataTestId="goldrush-form_postcode"
            name="postcode"
            ref={register({
              required: {
                value: true,
                message: 'Please enter your postcode',
              },
              minLength: {
                value: 5,
                message: 'Oops, your postcode looks a little too short',
              },
              maxLength: {
                value: 9,
                message: 'Oops, your postcode looks a little too long',
              },
              pattern: {
                value: POSTCODE,
                message: 'Please only use numbers, characters and spaces',
              },
            })}
            type="text"
          />
        </Formgroup>
      )}

      <Text tag="p" color="darker" size="xsmall">
        {'Terms and conditions agreement text and link '}
        <Link dataTestId="terms_and_conditions" href="#" size="xsmall">
          link
        </Link>
      </Text>
      <Button
        dataTestId="goldrush-form_submit"
        type="submit"
        label={buttonLabel}
        disabled={isSubmitting}
        size="lead"
        fill="solid"
        color="teal"
      />
    </Form>
  );
};

export default GoldrushForm;
