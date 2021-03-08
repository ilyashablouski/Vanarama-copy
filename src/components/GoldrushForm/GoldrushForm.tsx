import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput';
import { useForm, FormContext as FormProvider } from 'react-hook-form';
import {
  TermsAndConditions,
  Consent,
  PrivacyPolicy,
} from '../FormGenericCheckboxes/FormGenericChecboxes';
import {
  postcodeValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
} from '../../utils/inputValidators';
import { IGoldrushFormProps, IGoldrushFromValues } from './interfaces';
import Skeleton from '../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'));
const Form = dynamic(() => import('core/organisms/form'));

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
  const methods = useForm<IGoldrushFromValues>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      methods.reset({
        fullName: '',
        email: '',
        phoneNumber: '',
      });
    }
  }, [isSubmitting, methods]);

  return (
    <FormProvider {...methods}>
      <Form
        className={className}
        dataTestId="goldrush-form"
        onSubmit={methods.handleSubmit(onSubmit)}
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
          error={methods.errors.fullName?.message?.toString()}
        >
          <TextInput
            id="goldrush-form_full-name"
            dataTestId="goldrush-form_full-name"
            name="fullName"
            ref={methods.register(fullNameValidator)}
            type="text"
          />
        </FormGroup>
        <FormGroup
          controlId="goldrush-form_email"
          label="Email Address"
          error={methods.errors.email?.message?.toString()}
        >
          <TextInput
            id="goldrush-form_email"
            dataTestId="goldrush-form_email"
            name="email"
            ref={methods.register(emailValidator)}
            type="text"
          />
        </FormGroup>
        <FormGroup
          controlId="goldrush-form_phone-number"
          label="Phone Number"
          error={methods.errors.phoneNumber?.message?.toString()}
        >
          <TextInput
            id="goldrush-form_phone-number"
            dataTestId="goldrush-form_phone-number"
            name="phoneNumber"
            ref={methods.register(phoneNumberValidator)}
            type="text"
          />
        </FormGroup>
        {isPostcodeVisible && (
          <FormGroup
            controlId="goldrush-form_postcode"
            label="Postcode"
            error={methods.errors.postcode?.message?.toString()}
          >
            <TextInput
              id="goldrush-form_postcode"
              dataTestId="goldrush-form_postcode"
              name="postcode"
              ref={methods.register(postcodeValidator)}
              type="text"
            />
          </FormGroup>
        )}
        {!noTermsAndConditions && (
          <>
            {callBack ? (
              <FormGroup
                error={
                  methods.errors?.termsAndCons?.message?.toString() ||
                  methods.errors?.privacyPolicy?.message?.toString()
                }
              >
                <TermsAndConditions id={termsAndConditionsId || ''} />
                <PrivacyPolicy id={termsAndConditionsId || ''} />
                <Consent id={termsAndConditionsId || ''} />
              </FormGroup>
            ) : (
              <FormGroup
                label="Please Confirm"
                error={methods.errors?.termsAndCons?.message?.toString()}
              >
                <Consent id={termsAndConditionsId || ''} />
                <TermsAndConditions id={termsAndConditionsId || ''} />
              </FormGroup>
            )}
          </>
        )}
        {!isTextInVisible && (
          <Text tag="p" color={callBack ? 'dark' : 'darker'} size="xsmall">
            Vanarama collects the contact information you provide to us to
            contact you about our products and services. You may unsubscribe
            from these communications at any time. For information on how to
            unsubscribe, as well as our privacy practices and commitment to
            protecting your privacy, please check out our Privacy Policy.
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
    </FormProvider>
  );
};

export default GoldrushForm;
