import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import React from 'react';
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
import Skeleton from '../Skeleton';

const ChevronForwardSharp = dynamic(
  () => import('core/assets/icons/ChevronForwardSharp'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

type IDirectorDetailsFormProps = {
  dropdownData: CompanyDirectorDetails;
  onSubmit: (values: DirectorDetailsFormValues) => Promise<void>;
  isEdited: boolean;
  directorUuid?: string;
  defaultValues?: DirectorDetailsFormValues;
  officers: any;
  funderId?: string | null;
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
  funderId,
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
      validate={values => validate(values, officers, funderId)}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Heading color="black" size="xlarge" tag="h1">
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
