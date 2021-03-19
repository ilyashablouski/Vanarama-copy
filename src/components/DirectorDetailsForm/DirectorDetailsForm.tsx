import dynamic from 'next/dynamic';
import { Formik } from 'formik';
import React, { useCallback } from 'react';
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
  isEdit: boolean;
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
  isEdit,
  directorUuid,
  defaultValues,
  officers,
  funderId,
}) => {
  const directors =
    combineDirectorsData(officers, defaultValues?.directors) || [];

  const initialValues = isEdit
    ? initialEditedFormValues(directors, directorUuid)
    : defaultValues || initialFormValues(officers);

  const combineDirectorsOnSubmit = useCallback<
    (values: DirectorDetailsFormValues) => Promise<void>
  >(
    values => {
      if (isEdit) {
        const uuidsOfUpdatedDirectors = values.directors
          .map(director => director?.uuid)
          .filter(item => !!item);
        const directorsToLeave = directors.filter(
          director => !uuidsOfUpdatedDirectors.includes(director?.uuid),
        );

        return onSubmit({
          directors: [...directorsToLeave, ...values.directors],
          totalPercentage: values.totalPercentage,
        });
      }

      return onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <Formik<DirectorDetailsFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={values => validate(values, directors, isEdit, funderId)}
      onSubmit={combineDirectorsOnSubmit}
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
            isEdited={isEdit}
          />
          <Button
            color="primary"
            dataTestId="vat-details_continue"
            disabled={isSubmitting}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={selectButtonLabel(isSubmitting, isEdit)}
            size="large"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DirectorDetailsForm;
