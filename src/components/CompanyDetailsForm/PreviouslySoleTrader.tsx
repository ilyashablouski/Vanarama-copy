import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Text from 'core/atoms/text';
import Button from 'core/atoms/button';
import Modal from 'core/molecules/modal';
import Heading from 'core/atoms/heading';
import Formgroup from 'core/molecules/formgroup';

import { ICompanyDetailsFormValues } from './interfaces';

function PreviouslySoleTrader() {
  const [showModal, setShowModal] = useState(false);

  const { register } = useFormContext<ICompanyDetailsFormValues>();

  function toggleModalVisibility() {
    setShowModal(!showModal);
  }

  return (
    <div className="olaf--previously-trading">
      <Formgroup
        controlId="previouslyTradingSoletrader"
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
        <div className="button-group">
          <input
            id="ptst-yes"
            type="radio"
            value="true"
            name="previouslyTradingSoletrader"
            ref={register}
            hidden
          />
          <label className="button -primary -small -outline" htmlFor="ptst-yes">
            <span className="button--inner">Yes</span>
          </label>
          <input
            id="ptst-no"
            type="radio"
            value="false"
            name="previouslyTradingSoletrader"
            ref={register}
            hidden
          />
          <label className="button -primary -small -outline" htmlFor="ptst-no">
            <span className="button--inner">No</span>
          </label>
        </div>
      </Formgroup>
      {showModal && (
        <Modal show onRequestClose={toggleModalVisibility}>
          <Heading tag="span" color="darker" size="lead">
            Why are we asking this?
          </Heading>
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
