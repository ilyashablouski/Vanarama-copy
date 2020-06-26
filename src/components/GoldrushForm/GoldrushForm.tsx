import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../utils/regex';
import { IGoldrushFormProps, IGoldrushFromValues } from './interfaces';

const GoldrushForm: React.FC<IGoldrushFormProps> = ({
  onSubmit,
  isSubmitting,
  isPostcodeVisible,
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
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address',
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
            maxLength: 16,
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
              minLength: 5,
              maxLength: 8,
              pattern: /asd/,
            })}
            type="text"
          />
        </Formgroup>
      )}

      <Text tag="p" color="darker" size="xsmall">
        {`By creating your account, you agree to our `}
        <Link
          dataTestId="terms_and_conditions"
          href="https://www.motorama.com/terms-conditions"
          size="xsmall"
        >
          Terms and Conditions
        </Link>
        {` and `}
        <Link
          dataTestId="privacy_policy"
          href="https://www.motorama.com/cookie-privacy-policy"
          size="xsmall"
        >
          Privacy Policy
        </Link>
        .
      </Text>
      <Button
        dataTestId="goldrush-form_submit"
        type="submit"
        label={buttonLabel}
        disabled={isSubmitting}
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        color="primary"
      />
    </Form>
  );
};

export default GoldrushForm;
