import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TextInput from 'core/atoms/textinput';
import { useForm, FormContext as FormProvider } from 'react-hook-form';
import {
  TermsAndConditions,
  Consent,
  PrivacyPolicy,
} from '../FormGenericCheckboxes/FormGenericCheckboxes';
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
  isCallBackForm,
  text,
  isTextInVisible,
  termsAndConditionsId,
  noTermsAndConditions,
  className,
  isPlaceholdersShown = {
    fullName: false,
    email: false,
    phoneNumber: false,
    postcode: false,
  },
  isLabelsShown = {
    fullName: true,
    email: true,
    phoneNumber: true,
    postcode: true,
  },
  dataUiTestId,
}) => {
  const buttonLabelText = isCallBackForm ? 'Call Me Back' : 'Get Quote Now';
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
          <Heading
            tag="span"
            size={isCallBackForm ? 'large' : 'lead'}
            color="black"
            dataUiTestId={dataUiTestId ? `${dataUiTestId}_heading` : undefined}
          >
            {heading}
          </Heading>
        )}
        {text && (
          <Text
            tag="span"
            size="regular"
            color="darker"
            className="-mb-400"
            dataUiTestId={dataUiTestId ? `${dataUiTestId}_text` : undefined}
          >
            {text}
          </Text>
        )}
        <FormGroup
          controlId="goldrush-form_full-name"
          label={isLabelsShown?.fullName ? 'Full Name' : ''}
          error={methods.errors.fullName?.message?.toString()}
          dataUiTestId={
            dataUiTestId
              ? `${dataUiTestId}_goldrush-form_full-name_error`
              : undefined
          }
        >
          <TextInput
            id="goldrush-form_full-name"
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_goldrush-form_full-name`
                : undefined
            }
            dataTestId="goldrush-form_full-name"
            name="fullName"
            ref={methods.register(fullNameValidator)}
            type="text"
            placeholder={isPlaceholdersShown?.fullName ? 'Full Name' : ''}
          />
        </FormGroup>
        <FormGroup
          controlId="goldrush-form_email"
          label={isLabelsShown?.email ? 'Email Address' : ''}
          error={methods.errors.email?.message?.toString()}
          dataUiTestId={
            dataUiTestId
              ? `${dataUiTestId}_goldrush-form_email_error`
              : undefined
          }
        >
          <TextInput
            id="goldrush-form_email"
            dataTestId="goldrush-form_email"
            name="email"
            ref={methods.register(emailValidator)}
            type="text"
            placeholder={isPlaceholdersShown?.email ? 'Email Address' : ''}
            dataUiTestId={
              dataUiTestId ? `${dataUiTestId}_goldrush-form_email` : undefined
            }
          />
        </FormGroup>
        <FormGroup
          controlId="goldrush-form_phone-number"
          label={isLabelsShown?.phoneNumber ? 'Phone Number' : ''}
          error={methods.errors.phoneNumber?.message?.toString()}
          dataUiTestId={
            dataUiTestId
              ? `${dataUiTestId}_goldrush-form_phone-number_error`
              : undefined
          }
        >
          <TextInput
            id="goldrush-form_phone-number"
            dataTestId="goldrush-form_phone-number"
            name="phoneNumber"
            ref={methods.register(phoneNumberValidator)}
            type="text"
            placeholder={isPlaceholdersShown?.phoneNumber ? 'Phone Number' : ''}
            dataUiTestId={
              dataUiTestId
                ? `${dataUiTestId}_goldrush-form_phone-number`
                : undefined
            }
          />
        </FormGroup>
        {isPostcodeVisible && (
          <FormGroup
            controlId="goldrush-form_postcode"
            label={isLabelsShown?.postcode ? 'Postcode' : ''}
            error={methods.errors.postcode?.message?.toString()}
          >
            <TextInput
              id="goldrush-form_postcode"
              dataTestId="goldrush-form_postcode"
              name="postcode"
              ref={methods.register(postcodeValidator)}
              type="text"
              placeholder={isPlaceholdersShown?.postcode ? 'Postcode' : ''}
            />
          </FormGroup>
        )}
        {!noTermsAndConditions && (
          <>
            {isCallBackForm ? (
              <FormGroup
                error={
                  methods.errors?.termsAndCons?.message?.toString() ||
                  methods.errors?.privacyPolicy?.message?.toString()
                }
                dataUiTestId={
                  dataUiTestId
                    ? `${dataUiTestId}_error_${
                        methods.errors?.termsAndCons
                          ? 'terms-and-conditions'
                          : 'privacy-policy'
                      }`
                    : undefined
                }
              >
                <TermsAndConditions
                  id={termsAndConditionsId || ''}
                  dataUiTestId={dataUiTestId}
                />
                <PrivacyPolicy
                  id={termsAndConditionsId || ''}
                  dataUiTestId={dataUiTestId}
                />
                <Consent
                  id={termsAndConditionsId || ''}
                  dataUiTestId={dataUiTestId}
                />
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
          <Text
            tag="p"
            color={isCallBackForm ? 'dark' : 'darker'}
            size="xsmall"
            dataUiTestId={
              dataUiTestId ? `${dataUiTestId}_legal_content` : undefined
            }
          >
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
          dataUiTestId={
            dataUiTestId ? `${dataUiTestId}_goldrush-form_submit` : undefined
          }
        />
      </Form>
    </FormProvider>
  );
};

export default GoldrushForm;
