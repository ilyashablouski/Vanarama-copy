import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox';
import { useForm } from 'react-hook-form';
import {
  postcodeValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
  termsAndCons,
} from '../../utils/inputValidators';
import { IGoldrushFormProps, IGoldrushFromValues } from './interfaces';
import Skeleton from '../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const FormGroup = dynamic(() =>
  import('@vanarama/uibook/lib/components/molecules/formgroup'),
);
const Form = dynamic(() =>
  import('@vanarama/uibook/lib/components/organisms/form'),
);

const GoldrushForm: React.FC<IGoldrushFormProps> = ({
  onSubmit,
  isSubmitting,
  isPostcodeVisible,
  heading,
  callBack,
  text,
  isTextInVisible,
  termsAndConditionsId,
  noTermsAndConditions,
  className,
}) => {
  const buttonLabelText = callBack ? 'Call Me Back' : 'Get Quote Now';
  const buttonLabel = isSubmitting ? 'Loading...' : buttonLabelText;
  const { handleSubmit, errors, register, reset } = useForm<
    IGoldrushFromValues
  >({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      reset({
        fullName: '',
        email: '',
        phoneNumber: '',
      });
    }
  }, [isSubmitting, reset]);

  const termsAndConditions = () => (
    <CheckBox
      id={`termsAndCons${termsAndConditionsId || ''}`}
      dataTestId="aboutTermsAndCons"
      name="termsAndCons"
      label={
        callBack
          ? 'Terms & Conditions and Privacy Policy'
          : 'I agree to the terms and conditions.'
      }
      ref={register(termsAndCons)}
    />
  );

  const consent = () => (
    <CheckBox
      id={`consent${termsAndConditionsId || ''}`}
      dataTestId="aboutConsent"
      name="consent"
      label={
        callBack
          ? 'Subscribe to get updates, exclusive offers and amazing deals'
          : 'I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions.'
      }
      ref={register}
    />
  );

  return (
    <Form
      className={className}
      dataTestId="goldrush-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {heading && (
        <Heading tag="span" size={callBack ? 'large' : 'lead'} color="black">
          {heading}
        </Heading>
      )}
      {text && (
        <Text tag="span" size="regular" color="darker" className="-mb-400">
          {text}
        </Text>
      )}
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
      {!noTermsAndConditions && (
        <>
          {callBack ? (
            <FormGroup
              label="Agree To:"
              error={errors?.termsAndCons?.message?.toString()}
            >
              {termsAndConditions()}
              {consent()}
            </FormGroup>
          ) : (
            <FormGroup
              label="Please Confirm"
              error={errors?.termsAndCons?.message?.toString()}
            >
              {consent()}
              {termsAndConditions()}
            </FormGroup>
          )}
        </>
      )}
      {!isTextInVisible && (
        <Text tag="p" color={callBack ? 'dark' : 'darker'} size="xsmall">
          Vanarama collects the contact information you provide to us to contact
          you about our products and services. You may unsubscribe from these
          communications at any time. For information on how to unsubscribe, as
          well as our privacy practices and commitment to protecting your
          privacy, please check out our Privacy Policy.
        </Text>
      )}
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
