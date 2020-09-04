import { gql } from '@apollo/client';
import { Formik } from 'formik';
import React from 'react';
import ChevronForwardSharp from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import DirectorFieldArray from './DirectorFieldArray';
import {
  initialFormValues,
  validate,
  validationSchema,
  combineDirectorsData,
  initialEditedFormValues,
} from './helpers';
import { DirectorDetailsFormValues } from './interfaces';
import { GetCompanyDirectorDetailsQuery_allDropDowns as CompanyDirectorDetails } from '../../../generated/GetCompanyDirectorDetailsQuery';

type IDirectorDetailsFormProps = {
  dropdownData: CompanyDirectorDetails;
  onSubmit: (values: DirectorDetailsFormValues) => Promise<void>;
  isEdited: boolean;
  directorUuid?: string;
  defaultValues?: DirectorDetailsFormValues;
  officers: any;
};

const selectButtonLabel = (isSubmitting: boolean, isEdited: boolean) => {
  if (isSubmitting) {
    return 'Saving...';
  }
  return isEdited ? 'Save & Return' : 'Continue';
};

const DirectorDetailsForm: React.FC<IDirectorDetailsFormProps> = ({
  onSubmit,
  dropdownData,
  isEdited,
  directorUuid,
  defaultValues,
  officers,
}) => {
  const directors =
    combineDirectorsData(officers, defaultValues?.directors) || [];

  const initialValues = isEdited
    ? initialEditedFormValues(directors, directorUuid)
    : defaultValues || initialFormValues(officers);

  return (
    <Formik<DirectorDetailsFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Heading color="black" size="xlarge">
            Director Details
          </Heading>
          <Text color="black" size="regular">
            Select Directors that combined represent at least 25% of company
            ownership:
          </Text>
          <DirectorFieldArray
            directors={directors}
            dropdownData={dropdownData}
            officers={officers}
            isEdited={isEdited}
          />
          <Button
            color="primary"
            dataTestId="vat-details_continue"
            disabled={isSubmitting}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={selectButtonLabel(isSubmitting, isEdited)}
            size="large"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DirectorDetailsForm;
