import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';
import AddSharp from '@vanarama/uibook/lib/assets/icons/AddSharp';
import CloseSharp from '@vanarama/uibook/lib/assets/icons/CloseSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import { GetVatDetailsCountries } from '../../../generated/GetVatDetailsCountries';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { VatDetailsFormValues as FormValues } from './interfaces';
import { useCustomValidation, useTurnoverErrorMessage } from './utils';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

export const GET_VAT_DETAILS_COUNTRIES = gql`
  query GetVatDetailsCountries {
    allDropDowns {
      countries {
        data
        favourites
      }
    }
  }
`;

const CountryTurnoverFieldArray: React.FC = () => {
  const { control, register } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'markets',
  });

  useCustomValidation();
  const turnoverError = useTurnoverErrorMessage();

  const { data, loading, error } = useQuery<GetVatDetailsCountries>(
    GET_VAT_DETAILS_COUNTRIES,
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Could not load list of countries</p>;
  }

  if (!data || !data.allDropDowns) {
    return null;
  }

  const exceptUK = (_: string) => _ !== 'United Kingdom';
  const countriesExceptUK = {
    data: data.allDropDowns.countries.data.filter(exceptUK),
    favourites: data.allDropDowns.countries.favourites.filter(exceptUK),
  };

  return (
    <>
      <FormGroup
        label="Countries of Trade and % of Turnover"
        error={turnoverError}
      >
        <div className="olaf--country-turnover">
          {fields.map((_, index) => (
            <React.Fragment key={_.id}>
              <Select
                defaultValue={_.country}
                aria-label={`Country ${index + 1}`}
                id={`markets[${index}].country`}
                name={`markets[${index}].country`}
                ref={register({ required: true })}
              >
                <OptionsWithFavourites options={countriesExceptUK} />
              </Select>
              <NumericInput
                defaultValue={_.percentage}
                aria-label={`Percentage for country ${index + 1}`}
                id={`markets[${index}].percentage`}
                min="0"
                name={`markets[${index}].percentage`}
                ref={register({ required: true, min: 1, max: 100 })}
                suffix="%"
                type="number"
              />
              {fields.length > 1 && (
                <Button
                  aria-label={`Remove country ${index + 1}`}
                  color="teal"
                  fill="clear"
                  icon={<CloseSharp />}
                  iconColor="teal"
                  iconPosition="after"
                  onClick={() => remove(index)}
                  round
                  size="regular"
                  type="button"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </FormGroup>
      <Button
        color="teal"
        fill="solid"
        icon={<AddSharp />}
        iconColor="white"
        iconPosition="before"
        label="add country"
        onClick={() => append({ country: '', percentage: '' })}
        size="xsmall"
        type="button"
      />
    </>
  );
};

export default CountryTurnoverFieldArray;
