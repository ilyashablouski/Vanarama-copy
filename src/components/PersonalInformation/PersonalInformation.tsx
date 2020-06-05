import React, { useState } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import FCWithFragments from '../../utils/FCWithFragments';
import validationSchema from './PersonalInformation.validation';
import { IAboutFormValues, IProps } from './interface';
import { responseToInitialFormValues } from './mappers';

const PersonalInformation: FCWithFragments<IProps> = ({
  dropdownData,
  person,
  submit,
}) => {
  const [editData, setEditData] = useState(false);
  const {
    control,
    errors,
    handleSubmit,
    register,
    triggerValidation,
    watch,
    formState,
  } = useForm<IAboutFormValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(person),
  });

  console.log('person', person);

  return (
    <div className="my-details--form" style={{ gridColumnEnd: 6 }}>
      <form onSubmit={handleSubmit(submit)} className="form">
        <Heading color="black" size="large" dataTestId="aboutHeading">
          Personal Information
        </Heading>
        <section className="structured-list  -styled-headers">
          <div className="structured-list-tbody">
            <div className="structured-list-row">
              <div className="structured-list-td structured-list-content--nowrap  -midle">
                Firs Name
              </div>
              <div className="structured-list-td">
                {!editData && (
                  <>{person?.person?.firstName || 'No information'}</>
                )}
                {editData && (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved -pb-000 -pt-000 -pr-000"
                    controlId="firstName"
                    error={errors?.firstName?.message?.toString()}
                  >
                    <TextInput
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={person.person?.firstName}
                      dataTestId="aboutFirstName"
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row">
              <div className="structured-list-td structured-list-content--nowrap">
                Last Name
              </div>
              <div className="structured-list-td">
                {!editData && (
                  <>{person?.person?.lastName || 'No information'}</>
                )}
                {editData && (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved -pt-000 -pb-000 -pr-000"
                    controlId="lastName"
                    error={errors?.lastName?.message?.toString()}
                  >
                    <TextInput
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue={person?.person?.lastName}
                      dataTestId="aboutLastName"
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div className="structured-list-td structured-list-content--nowrap">
                Telephone
              </div>
              <div className="structured-list-td">
                {!editData && (
                  <>{person?.telephoneNumbers[0].value || 'No information'}</>
                )}
                {editData && (
                  <FormGroup
                    className="structured-list-td structured-list-content --inline-preserved  -pb-000 -pt-000 -pr-000"
                    controlId="mobile"
                    error={errors?.mobile?.message?.toString()}
                  >
                    <TextInput
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={person?.telephoneNumbers[0].value}
                      dataTestId="aboutMobile"
                      width={35}
                    />
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="structured-list-row ">
              <div className="structured-list-td structured-list-content--nowrap">
                Email
              </div>
              <div className="structured-list-td">
                {person?.emailAddresses[0].value}
              </div>
            </div>
          </div>
        </section>
        <Button
          type="button"
          label={formState.isSubmitting ? 'Saving...' : 'Edit Personal Details'}
          color="primary"
          onClick={() => {
            if (!editData) {
              setEditData(!editData);
              return false;
            }
            return true;
          }}
          disabled={formState.isSubmitting}
          dataTestId="aboutSubmit"
        />
      </form>
    </div>
  );
};

PersonalInformation.fragments = {
  dropdownData: gql`
    fragment AboutFormDropdownData on DropDownType {
      __typename
      titles {
        __typename
        data
        favourites
      }
      countries {
        __typename
        data
        favourites
      }
      nationalities {
        __typename
        data
        favourites
      }
      maritalStatuses {
        __typename
        data
      }
      noOfDependants {
        __typename
        data
      }
      noOfAdultsInHousehold {
        __typename
        data
      }
    }
  `,
};

export default PersonalInformation;
