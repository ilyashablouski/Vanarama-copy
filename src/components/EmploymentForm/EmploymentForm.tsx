import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from 'apollo-boost';
import React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { EmploymentFormDropDownData } from '../../../generated/EmploymentFormDropDownData';
import FCWithFragments from '../../utils/FCWithFragments';
import EmploymentFormFields from './EmploymentFormFields';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  dropDownData: EmploymentFormDropDownData;
}

const EmploymentForm: FCWithFragments<IProps> = ({ dropDownData }) => {
  const methods = useForm<IEmploymentFormValues>({
    defaultValues: {
      history: [{ status: '' }],
    },
    mode: 'onBlur',
  });

  return (
    <Form onSubmit={methods.handleSubmit(console.log)}>
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
        <EmploymentFormFields dropDownData={dropDownData} />
      </FormContext>
      <Button
        color="primary"
        dataTestId="employment-history-submit"
        icon={<Icon color="light" icon={<ChevronForwardSharp />} />}
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
      ...EmploymentFormFieldsDropDownData
    }
    ${EmploymentFormFields.fragments.dropDownData}
  `,
};

export default EmploymentForm;
