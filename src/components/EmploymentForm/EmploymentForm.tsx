import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from 'apollo-boost';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import HistoryFieldArray from '../HistoryFieldArray/HistoryFieldArray';
import EmploymentSubForm from './EmploymentSubForm';
import { IEmploymentFormProps, IEmploymentFormValues } from './interfaces';
import validationSchema from './validationSchema';

const EmploymentForm: FCWithFragments<IEmploymentFormProps> = ({
  dropDownData,
  onSubmit,
}) => {
  const methods = useForm<IEmploymentFormValues>({
    defaultValues: {
      history: [{ status: '' }],
    },
    mode: 'onBlur',
    validationSchema,
  });

  return (
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
      <Heading
        dataTestId="employment-history-heading"
        tag="span"
        size="xlarge"
        color="black"
      >
        Employment History
      </Heading>
      <Text
        dataTestId="employment-history-lead"
        size="lead"
        color="darker"
        tag="span"
      >
        Thanks, we also need your employment history for the past 3 years so the
        funder can check your status.
      </Text>
      <FormContext {...methods}>
        <HistoryFieldArray<IEmploymentFormValues>
          initialState={{ status: '', month: '', year: '' }}
          messageFormat="We need another %s of employment history."
          requiredMonths={36}
        >
          {(_, index) => (
            <EmploymentSubForm dropDownData={dropDownData} index={index} />
          )}
        </HistoryFieldArray>
      </FormContext>
      <Button
        color="primary"
        dataTestId="employment-history-submit"
        icon={<ChevronForwardSharp />}
        iconColor="white"
        iconPosition="after"
        label="Continue"
        type="submit"
      />
    </Form>
  );
};

EmploymentForm.fragments = {
  dropDownData: gql`
    fragment EmploymentFormDropDownData on DropDownType {
      ...EmploymentSubFormDropDownData
    }
    ${EmploymentSubForm.fragments.dropDownData}
  `,
};

export default EmploymentForm;
