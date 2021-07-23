import React, { useCallback, useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';
import Modal from 'core/molecules/modal';
import FormGroup from 'core/molecules/formgroup';
import ChoiceBoxes from 'core/atoms/choiceboxes';

import { ICompanyDetailsFormValues } from './interfaces';

const fieldName = 'previouslyTradingSoletrader';

function PreviouslySoleTrader() {
  const [showModal, setShowModal] = useState(false);

  const { control, errors, watch } = useFormContext<
    ICompanyDetailsFormValues
  >();

  const fieldValue = watch(fieldName);
  const toggleModalVisibility = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const choices = useMemo(
    () => [
      { label: 'Yes', value: 'true', active: fieldValue === true },
      { label: 'No', value: 'false', active: fieldValue === false },
    ],
    [fieldValue],
  );

  return (
    <div className="olaf--previously-trading">
      <FormGroup
        controlId={fieldName}
        error={errors.previouslyTradingSoletrader?.message?.toString()}
        label={
          <>
            It seems you have been trading less than 3 years. Were you
            previously trading as a sole trader?{' '}
            <Button
              onClick={toggleModalVisibility}
              label="Learn More"
              fill="clear"
              color="primary"
            />
          </>
        }
      >
        <Controller
          name={fieldName}
          control={control}
          rules={{
            validate: value =>
              typeof value !== 'boolean'
                ? 'Please select "Yes" or "No"'
                : undefined,
          }}
          as={({ onChange }) => (
            <ChoiceBoxes
              choices={choices}
              className="button-group"
              boxClassName="button -small -primary -outline"
              labelClassName="button--inner"
              onSubmit={choice => {
                onChange(choice.value === 'true');
              }}
            />
          )}
        />
      </FormGroup>
      {showModal && (
        <Modal
          show
          title="Why are we asking this?"
          onRequestClose={toggleModalVisibility}
        >
          <Text tag="p" color="darker" size="regular">
            It looks like the LTD company on the application has been trading
            less than 3 years. If you have been previously trading as a
            Soletrader and have converted your business to a Limited Company, it
            is likely lenders will ask to see proof of your trading activity as
            a Soletrader to approve your application. If the LTD company has
            been trading less than 3 years and there is no previous trading
            activity as a Soletrader, it is unlikely your application will be
            accepted. If you would like to discuss this, please give us a call.
          </Text>
          <Text tag="p" color="darker" size="regular">
            The following documents can be used to prove your business activity
            as a Soletrader:
            <br />
            <strong>End of year accounts for at least 3 years.</strong>
          </Text>
          <Text tag="p" color="darker" size="regular">
            One of our representatives will be in touch after you submit
            application to request additional documents from you.
          </Text>
        </Modal>
      )}
    </div>
  );
}

export default PreviouslySoleTrader;
