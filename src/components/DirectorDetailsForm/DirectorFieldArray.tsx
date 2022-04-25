import dynamic from 'next/dynamic';
import Select from 'core/atoms/select';
import {
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
  FormikErrors,
  FormikTouched,
} from 'formik';
import React from 'react';
import { DirectorFieldsDropDownData } from '../../../generated/DirectorFieldsDropDownData';
import DirectorFields from './DirectorFields';
import { DirectorDetailsFormValues, DirectorFormValues } from './interfaces';
import Skeleton from '../Skeleton';
import {
  NOT_ENOUGH_DIRECTORS_ERROR_MESSAGE,
  TOO_LOW_ERROR_MESSAGE,
} from './helpers';

const Formgroup = dynamic(() => import('core/molecules/formgroup'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const mapErrorMessage = (
  errors: FormikErrors<DirectorDetailsFormValues>,
  touched: FormikTouched<DirectorDetailsFormValues>,
) => {
  const isTouched = touched.directors?.some(_ => _.shareOfBusiness);

  if (!isTouched) {
    return undefined;
  }

  if (errors.totalPercentage === NOT_ENOUGH_DIRECTORS_ERROR_MESSAGE) {
    return 'We require details of at least 2 director(s) with a combined shareholding of over 25%. Please add another director.';
  }

  if (errors.totalPercentage === TOO_LOW_ERROR_MESSAGE) {
    return 'We require details of a director(s) with a combined shareholding of over 25%. Please add another director.';
  }

  return undefined;
};

const createFullName = (director: DirectorFormValues) =>
  `${director.lastName}, ${director.firstName}`;

const optionsRender = (
  itemsToShow: DirectorFormValues[],
  selectedDirectors: string[],
) => {
  return itemsToShow?.map(item => {
    const fullName = createFullName(item);

    return (
      <option
        key={fullName}
        value={fullName}
        disabled={selectedDirectors.includes(fullName)}
      >
        {fullName}
      </option>
    );
  });
};

const handleDirectorSelected = (
  fullName: string,
  arrayHelpers: FieldArrayRenderProps,
  directors?: DirectorFormValues[],
) => {
  const [lastName, firstName] = fullName.split(', ');
  const selected = directors?.find(
    director =>
      director.firstName === firstName && director.lastName === lastName,
  );

  arrayHelpers.push(
    selected || {
      title: '',
      firstName,
      lastName,
      gender: '',
      shareOfBusiness: '',
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
      numberOfDependants: '',
      nationality: '',
      history: [],
    },
  );
};

type Props = {
  dropdownData: DirectorFieldsDropDownData;
  isEdited: boolean;
  directors?: DirectorFormValues[];
  officers?: DirectorFormValues[];
};

export default function DirectorFieldArray({
  dropdownData,
  directors,
  isEdited,
  officers,
}: Props) {
  const { errors, touched, values } = useFormikContext<
    DirectorDetailsFormValues
  >();
  const errorMessage = mapErrorMessage(errors, touched);
  const itemsToShow = (isEdited ? directors : officers) || [];
  const hasMultipleDirectors = itemsToShow.length > 1;
  const selectedDirectors = values.directors.map(createFullName);
  const showDirectorDropdown =
    hasMultipleDirectors && (errorMessage || values.directors.length === 0);

  return (
    <FieldArray name="directors">
      {arrayHelpers => (
        <>
          {values.directors.map((director, index) => (
            <DirectorFields
              index={index}
              key={createFullName(director)}
              dropDownData={dropdownData}
              canBeRemoved={hasMultipleDirectors}
              onRemoveClick={() => arrayHelpers.remove(index)}
            />
          ))}
          {errorMessage && (
            <Text tag="span" color="darker" size="regular">
              {errorMessage}
            </Text>
          )}
          {showDirectorDropdown && (
            <Formgroup error={errorMessage && 'Please select a director'}>
              <Select
                aria-label="Select director"
                placeholder="Select Director..."
                onChange={event =>
                  handleDirectorSelected(
                    event.target.value,
                    arrayHelpers,
                    directors,
                  )
                }
              >
                {optionsRender(itemsToShow, selectedDirectors)}
              </Select>
            </Formgroup>
          )}
        </>
      )}
    </FieldArray>
  );
}
