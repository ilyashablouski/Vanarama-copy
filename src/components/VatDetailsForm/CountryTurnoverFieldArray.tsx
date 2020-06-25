import { gql, useQuery } from '@apollo/client';
import AddSharp from '@vanarama/uibook/lib/assets/icons/AddSharp';
import CloseSharp from '@vanarama/uibook/lib/assets/icons/CloseSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import OptionsWithFavourites from '../OptionsWithFavourites/OptionsWithFavourites';
import { VatDetailsFormValues as FormValues } from './interfaces';
import { useTotalPercentageValidation, useTurnoverErrorMessage } from './utils';
import { GetVatDetailsCountries } from '../../../generated/GetVatDetailsCountries';

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
  const { fields, append, remove } = useFieldArray({ control, name: 'trade' });
  useTotalPercentageValidation();
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
      <Formgroup
        label="Countries of Trade and % of Turnover"
        error={turnoverError}
      >
        <div className="olaf--country-turnover">
          {fields.map((_, index) => (
            <React.Fragment key={_.id}>
              <Select
                aria-label={`Country ${index + 1}`}
                id={`trade[${index}].country`}
                name={`trade[${index}].country`}
                ref={register({ required: true })}
              >
                <OptionsWithFavourites options={countriesExceptUK} />
              </Select>
              <TextInput
                aria-label={`Percentage for country ${index + 1}`}
                id={`trade[${index}].percentage`}
                name={`trade[${index}].percentage`}
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
      </Formgroup>
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
