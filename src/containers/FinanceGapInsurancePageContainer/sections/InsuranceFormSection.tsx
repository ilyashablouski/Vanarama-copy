import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import RouterLink from 'components/RouterLink/RouterLink';
import Router from 'next/router';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import {
  postcodeValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
} from '../../../utils/inputValidators';

interface IProps {
  title: string | null;
  body: string | null;
  isSubmitting: boolean;
  isGratitudeVisible: boolean;
  onSubmit: () => void;
  onCompleted: () => void;
}

const InsuranceFormSection = ({
  title,
  body,
  isSubmitting,
  onSubmit,
  isGratitudeVisible,
  onCompleted,
}: IProps) => {
  const { handleSubmit, errors, register } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const buttonLabel = isSubmitting ? 'Loading...' : 'Get Quote Now';

  return (
    <div className="row:featured-right">
      <div>
        <Heading size="large" color="black">
          {title || ''}
        </Heading>
        <ReactMarkdown escapeHtml={false} source={body || ''} />
      </div>
      <div className="card">
        {isGratitudeVisible ? (
          <>
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
              onClick={onCompleted}
            />
          </>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Text size="small" color="darker">
              Terms and conditions agreement text and{' '}
              <Link
                onClick={() => {
                  Router.push('/terms-and-conditions');
                }}
                href=""
              >
                link
              </Link>
            </Text>
            <Button
              label={buttonLabel}
              color="teal"
              size="regular"
              fill="solid"
            />
          </Form>
        )}
      </div>
    </div>
  );
};

export default InsuranceFormSection;
