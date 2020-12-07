import { useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import {
  IFleetCallBackFormProps,
  IFleetCallBackFormValues,
} from './interfaces';
import {
  requiredField,
  fullNameValidator,
  emailValidator,
  phoneNumberValidator,
  companyNameValidator,
  fleetSizeValidator,
} from '../../utils/inputValidators';

const RequestCallBackForm: React.FC<IFleetCallBackFormProps> = ({
  onSubmit,
  isSubmitting,
  showModal,
  setShowModal,
}) => {
  const { handleSubmit, errors, register } = useForm<IFleetCallBackFormValues>({
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
        <Form
          dataTestId="fleet-request-call-back-form"
          id="fleet-request-call-back-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup
            controlId="fleet-call-back-form_full-name"
            label="Full Name"
            error={errors.fullName?.message?.toString()}
          >
            <TextInput
              id="fleet-call-back-form_full-name"
              dataTestId="fleet-call-back-form_full-name"
              name="fullName"
              ref={register(fullNameValidator)}
              type="text"
            />
          </FormGroup>
          <FormGroup
            controlId="fleet-call-back-form_company-name"
            label="Company Name"
            error={errors.companyName?.message?.toString()}
          >
            <TextInput
              name="companyName"
              dataTestId="fleet-call-back-form_company-name"
              ref={register(companyNameValidator)}
              type="text"
            />
          </FormGroup>
          <FormGroup
            controlId="fleet-call-back-form_fleet-name"
            label="Fleet Size"
            error={errors.fleetSize?.message?.toString()}
          >
            <NumericInput
              type="number"
              name="fleetSize"
              dataTestId="fleet-call-back-form_fleet-size"
              ref={register(fleetSizeValidator)}
            />
          </FormGroup>
          <FormGroup
            controlId="fleet-call-back-form_email-name"
            label="Email Address"
            error={errors.email?.message?.toString()}
          >
            <TextInput
              name="email"
              dataTestId="fleet-call-back-form_email-address"
              ref={register(emailValidator)}
              type="text"
            />
          </FormGroup>
          <FormGroup
            controlId="fleet-call-back-form_phone-number"
            label="Phone Number"
            error={errors.phoneNumber?.message?.toString()}
          >
            <TextInput
              id="fleet-call-back-form_phone-number"
              dataTestId="fleet-call-back-form_phone-number"
              name="phoneNumber"
              ref={register(phoneNumberValidator)}
              type="text"
            />
          </FormGroup>
          <FormGroup
            controlId="fleet-call-back-form_agreement"
            label="Agree To:"
            error={errors.agreement?.message?.toString()}
          >
            <Checkbox
              id="agreement"
              name="agreement"
              dataTestId="fleet-call-back-form_agreement"
              label="Terms & Conditions & Privacy Policy."
              ref={register(
                requiredField('The terms and conditions must be accepted'),
              )}
            />
            <Checkbox
              id="updates"
              name="updates"
              dataTestId="fleet-call-back-form_updates"
              label="Keep me updated on the latest deals & offers."
              ref={register}
            />
          </FormGroup>
          <Text tag="p" color="dark" size="xsmall">
            Vanarama collects the contact information you provide to us to
            contact contact contact contact you about our products and services.
            You may from these communications at any time. For information on
            how to unsubscribe, as well as our privacy practices and commitment
            to protecting your privacy, please check out our Privacy Policy.
          </Text>
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
      </div>
    </Card>
  );
};

export default RequestCallBackForm;
