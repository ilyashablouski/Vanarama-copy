import React from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormContext as FormProvider } from 'react-hook-form';
import TextInput from 'core/atoms/textinput';
import NumericInput from 'core/atoms/numeric-input';
import {
  TermsAndConditions,
  Consent,
  PrivacyPolicy,
} from '../FormGenericCheckboxes/FormGenericCheckboxes';
import {
  IFleetCallBackFormProps,
  IFleetCallBackFormValues,
} from './interfaces';
import {
  fullNameValidator,
  emailValidator,
  phoneNumberValidator,
  companyNameValidator,
  fleetSizeValidator,
} from '../../utils/inputValidators';
import Skeleton from '../Skeleton';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'));

const RequestCallBackForm: React.FC<IFleetCallBackFormProps> = ({
  onSubmit,
  isSubmitting,
  showModal,
  setShowModal,
}) => {
  const methods = useForm<IFleetCallBackFormValues>({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  if (showModal) {
    return (
      <Modal
        className="-mt-000 callBack"
        show
        onRequestClose={() => setShowModal(false)}
      >
        <div className="-pt-000">
          <Heading size="regular" color="black">
            Thank you for submitting the form. We will be in touch shortly.
          </Heading>
          <Button
            className="-mt-600"
            dataTestId="goldrush-button_close"
            label="Close"
            size="lead"
            fill="solid"
            color="teal"
            onClick={() => setShowModal(false)}
          />
        </div>
      </Modal>
    );
  }

  return (
    <Card
      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      className="hero-card"
    >
      <div className="hero-card--inner">
        <Heading size="lead">Schedule A Call With Us</Heading>
        <FormProvider {...methods}>
          <Form
            dataTestId="fleet-request-call-back-form"
            id="fleet-request-call-back-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormGroup
              controlId="fleet-call-back-form_full-name"
              label="Full Name"
              error={methods.errors.fullName?.message?.toString()}
            >
              <TextInput
                id="fleet-call-back-form_full-name"
                dataTestId="fleet-call-back-form_full-name"
                name="fullName"
                ref={methods.register(fullNameValidator)}
                type="text"
              />
            </FormGroup>
            <FormGroup
              controlId="fleet-call-back-form_company-name"
              label="Company Name"
              error={methods.errors.companyName?.message?.toString()}
            >
              <TextInput
                name="companyName"
                dataTestId="fleet-call-back-form_company-name"
                ref={methods.register(companyNameValidator)}
                type="text"
              />
            </FormGroup>
            <FormGroup
              controlId="fleet-call-back-form_fleet-name"
              label="Fleet Size"
              error={methods.errors.fleetSize?.message?.toString()}
            >
              <NumericInput
                type="number"
                name="fleetSize"
                dataTestId="fleet-call-back-form_fleet-size"
                ref={methods.register(fleetSizeValidator)}
              />
            </FormGroup>
            <FormGroup
              controlId="fleet-call-back-form_email-name"
              label="Email Address"
              error={methods.errors.email?.message?.toString()}
            >
              <TextInput
                name="email"
                dataTestId="fleet-call-back-form_email-address"
                ref={methods.register(emailValidator)}
                type="text"
              />
            </FormGroup>
            <FormGroup
              controlId="fleet-call-back-form_phone-number"
              label="Phone Number"
              error={methods.errors.phoneNumber?.message?.toString()}
            >
              <TextInput
                id="fleet-call-back-form_phone-number"
                dataTestId="fleet-call-back-form_phone-number"
                name="phoneNumber"
                ref={methods.register(phoneNumberValidator)}
                type="text"
              />
            </FormGroup>
            <FormGroup
              controlId="fleet-call-back-form_agreement"
              error={
                methods.errors?.termsAndCons?.message?.toString() ||
                methods.errors?.privacyPolicy?.message?.toString()
              }
            >
              <TermsAndConditions id="register-form-terms" />
              <PrivacyPolicy id="register-form-privacy-policy" />
              <Consent id="register-form-consent" />
            </FormGroup>

            <Button
              color="primary"
              dataTestId="fleet-call-back-form_continue"
              label="I'd Like A Callback"
              size="large"
              type="submit"
              className="-fullwidth"
              disabled={isSubmitting}
            />
          </Form>
        </FormProvider>
      </div>
    </Card>
  );
};

export default React.memo(RequestCallBackForm);
