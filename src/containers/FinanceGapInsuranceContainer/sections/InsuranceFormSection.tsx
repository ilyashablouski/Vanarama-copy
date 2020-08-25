import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import ReactMarkdown from 'react-markdown';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useForm } from 'react-hook-form';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import Router from 'next/router';
import Link from '@vanarama/uibook/lib/components/atoms/link';
import GoldrushForm from '../../../components/GoldrushForm/GoldrushForm';
import {
  postcodeValidator,
  emailValidator,
  phoneNumberValidator,
  fullNameValidator,
} from '../../../utils/inputValidators';
import { OpportunityTypeEnum } from '../../../../generated/globalTypes';
import { DEFAULT_POSTCODE } from 'containers/GoldrushFormContainer/GoldrushFormContainer';

interface IProps {
  title: string | null;
  body: string | null;
  isSubmitting: boolean;
  isGratitudeVisible: boolean;
  onSubmit: (variables: {
    fullName: string;
    email: string;
    phoneNumber: string;
    postcode: string;
    consent: boolean;
    termsAndCons: boolean;
  }) => void;
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
      postcode: '',
    },
  });

  return (
    <div className="row:featured-left">
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
            <GoldrushForm
              callBack={false}
              isSubmitting={isSubmitting}
              isPostcodeVisible
              isTextInVisible
              onSubmit={values => {
                createOpportunity({
                  variables: {
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    fullName: values.fullName,
                    opportunityType: OpportunityTypeEnum.QUOTE,
                    postcode: values.postcode || DEFAULT_POSTCODE,
                    marketingPreference: Boolean(values.consent),
                    termsAndConditions: Boolean(values.termsAndCons),
                    opportunityType: OpportunityTypeEnum.CALLBACK,
                  },
                });
              }}
            />
          </Form>
        )}
      </div>
    </div>
  );
};

export default InsuranceFormSection;
