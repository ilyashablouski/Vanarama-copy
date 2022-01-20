import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import { FieldArray, Formik } from 'formik';
import { OlafContext } from '../../layouts/OLAFLayout/helpers';
import FCWithFragments from '../../utils/FCWithFragments';
import AddressFormFieldArray from './AddressFormFieldArray';
import {
  IAddressFormProps,
  IAddressFormValues as IFormValues,
} from './interfaces';
import { responseToInitialFormValues } from './mappers';
import validationSchema from './validationSchema';
import Skeleton from '../Skeleton';
import SecureOrder from '../../core/assets/icons/SecureOrder';

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
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Form = dynamic(() => import('core/organisms/form'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});

const AddressForm: FCWithFragments<IAddressFormProps> = ({
  addresses,
  dropDownData,
  onSubmit,
}) => {
  const context = useContext(OlafContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <Formik<IFormValues>
      initialValues={responseToInitialFormValues(addresses)}
      onSubmit={values => {
        setIsSubmit(true);
        onSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <Form onSubmit={formikProps.handleSubmit}>
          {isShowModal && (
            <Modal
              show
              onRequestClose={() => {
                setIsShowModal(false);
              }}
              title="Keeping Your Order Secure"
            >
              <Text color="darker" size="small">
                At Vanarama, we do everything we can to protect your privacy and
                security. Our website security features encrypt your information
                so it stays safe and your details will only be shared with our
                trusted funders and credit agencies for the purposes of your
                application - never with any third-parties.
              </Text>
            </Modal>
          )}
          <Heading
            dataTestId="address-history-heading"
            tag="h1"
            size="xlarge"
            color="black"
          >
            Address History
          </Heading>
          <Text
            dataTestId="address-history-lead"
            size="lead"
            color="darker"
            tag="span"
          >
            {`We just need your address history for the past ${context.requiredMonths /
              12} years to complete your order.`}
          </Text>
          <FieldArray name="history">
            {arrayHelpers => (
              <AddressFormFieldArray
                arrayHelpers={arrayHelpers}
                dropDownData={dropDownData}
                values={formikProps.values}
                requiredMonths={context.requiredMonths}
              />
            )}
          </FieldArray>
          <Button
            color="primary"
            dataTestId="address-history-submit"
            disabled={isSubmit}
            icon={<ChevronForwardSharp />}
            iconColor="white"
            iconPosition="after"
            label={isSubmit ? 'Saving...' : 'Continue'}
            type="submit"
          />
          <Button
            size="small"
            type="button"
            color="none"
            iconColor="white"
            iconPosition="before"
            withoutDefaultClass
            style={{ width: '35%', margin: '0 auto' }}
            label={
              <>
                <Icon icon={<SecureOrder />} color="teal" />
                <span
                  className="link -teal -regular -mt-100"
                  style={{ textDecoration: 'underline' }}
                >
                  Secure order
                </span>
              </>
            }
            dataTestId="secure-order"
            onClick={() => setIsShowModal(true)}
          />
        </Form>
      )}
    </Formik>
  );
};

AddressForm.fragments = {
  addresses: gql`
    fragment AddressFormAddresses on AddressType {
      __typename
      uuid
      serviceId
      lineOne
      lineTwo
      lineThree
      postcode
      country
      kind
      endedOn
      city
      propertyStatus
      startedOn
    }
  `,
  dropDownData: gql`
    fragment AddressFormDropDownData on DropDownType {
      ...AddressFormFieldArrayDownData
    }
    ${AddressFormFieldArray.fragments.dropDownData}
  `,
};

export default AddressForm;
