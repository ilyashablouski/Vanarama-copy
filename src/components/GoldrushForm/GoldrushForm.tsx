import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox';
import { useForm } from 'react-hook-form';
import {
  postcodeValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
} from '../../utils/inputValidators';
import { IGoldrushFormProps, IGoldrushFromValues } from './interfaces';

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
      <FormGroup
        controlId="goldrush-form_full-name"
        label="Full Name"
        error={errors.fullName?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_full-name"
          dataTestId="goldrush-form_full-name"
          name="fullName"
          ref={register(fullNameValidator)}
          type="text"
        />
      </FormGroup>
      <FormGroup
        controlId="goldrush-form_email"
        label="Email Address"
        error={errors.email?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_email"
          dataTestId="goldrush-form_email"
          name="email"
          ref={register(emailValidator)}
          type="text"
        />
      </FormGroup>
      <FormGroup
        controlId="goldrush-form_phone-number"
        label="Phone Number"
        error={errors.phoneNumber?.message?.toString()}
      >
        <TextInput
          id="goldrush-form_phone-number"
          dataTestId="goldrush-form_phone-number"
          name="phoneNumber"
          ref={register(phoneNumberValidator)}
          type="text"
        />
      </FormGroup>
      {isPostcodeVisible && (
        <FormGroup
          controlId="goldrush-form_postcode"
          label="Postcode"
          error={errors.postcode?.message?.toString()}
        >
          <TextInput
            id="goldrush-form_postcode"
            dataTestId="goldrush-form_postcode"
            name="postcode"
            ref={register(postcodeValidator)}
            type="text"
          />
        </FormGroup>
      )}
      <FormGroup label="Please Confirm">
        <CheckBox
          id="goldrush-form_marketing-preference"
          dataTestId="goldrush-form_marketing-preference"
          name="marketingPreference"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          ref={register}
        />
      </FormGroup>

      <Text tag="p" color="darker" size="xsmall">
        {'Terms and conditions agreement text and '}
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
