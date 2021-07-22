import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';
import Modal from 'core/molecules/modal';
import Formgroup from 'core/molecules/formgroup';

import { ICompanyDetailsFormValues } from './interfaces';

const fieldName = 'previouslyTradingSoletrader';

function PreviouslySoleTrader() {
  const [showModal, setShowModal] = useState(false);

  const { control, errors } = useFormContext<ICompanyDetailsFormValues>();

  function toggleModalVisibility() {
    setShowModal(!showModal);
  }

  return (
    <div className="olaf--previously-trading">
      <Formgroup
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
            required: 'Please select "Yes" or "No"',
          }}
          as={({ name, value, onChange }) => (
            <div className="button-group">
              <input
                id="ptst-yes"
                type="radio"
                name={name}
                value="true"
                checked={value === 'true'}
                onChange={onChange}
                hidden
              />
              <label
                htmlFor="ptst-yes"
                className="button -primary -small -outline"
              >
                <span className="button--inner">Yes</span>
              </label>
              <input
                id="ptst-no"
                type="radio"
                name={name}
                value="false"
                checked={value === 'false'}
                onChange={onChange}
                hidden
              />
              <label
                htmlFor="ptst-no"
                className="button -primary -small -outline"
              >
                <span className="button--inner">No</span>
              </label>
            </div>
          )}
        />
      </Formgroup>
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
