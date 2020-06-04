import React, { useState } from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Form from '@vanarama/uibook/lib/components/organisms/form';
import { gql } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import FCWithFragments from '../../utils/FCWithFragments';
import validationSchema from './PersonalInformation.validation';
import { IPersonalInformationValues, IProps } from './interface';
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
  } = useForm<IPersonalInformationValues>({
    mode: 'onBlur',
    validationSchema,
    defaultValues: responseToInitialFormValues(person),
  });

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Heading color="black" size="large" dataTestId="aboutHeading">
        Personal Information
      </Heading>
      <section>
        <div className="structured-list-row">
          <Grid sm="1" md="2" lg="5" className="-pb-000 -pt-000">
            <Column sm="row" md="1" lg="2" className=" -middle -col-200">
              <div className="structured-list-td structured-list-content--nowrap">
                First Name
              </div>
            </Column>
            <Column sm="1" md="2" lg="3" className="-middle">
              {!editData && <div className="structured-list-td">Kira</div>}
              {editData && (
                <FormGroup
                  className="structured-list-td structured-list-content --inline-preserved -pt-100"
                  controlId="firstName"
                  error={errors?.firstName?.message?.toString()}
                >
                  <TextInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    dataTestId="aboutFirstName"
                    ref={register}
                    width={28}
                  />
                </FormGroup>
              )}
            </Column>
          </Grid>
        </div>

        <div className="structured-list-row">
          <Grid sm="1" md="2" lg="5">
            <Column sm="row" md="1" lg="2" className="-middle">
              <div className="structured-list-td structured-list-content--nowrap">
                Last Name
              </div>
            </Column>
            <Column sm="1" md="2" lg="3" className="-middle">
              {!editData && <div className="structured-list-td">Kira</div>}
              {editData && (
                <FormGroup
                  className="structured-list-td structured-list-content --inline-preserved -pt-100"
                  controlId="lastName"
                  error={errors?.lastName?.message?.toString()}
                >
                  <TextInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    dataTestId="aboutLastName"
                    ref={register}
                    width={28}
                  />
                </FormGroup>
              )}
            </Column>
          </Grid>
        </div>

        <div className="structured-list-row ">
          <Grid sm="1" md="2" lg="5" className="-pb-000 -pt-000">
            <Column sm="row" md="1" lg="2" className="-middle" gap-block>
              <div className="structured-list-td structured-list-content--nowrap">
                Telephone
              </div>
            </Column>
            <Column sm="1" md="2" lg="3" className="-middle  -col-200">
              {!editData && <div className="structured-list-td">Kira</div>}
              {editData && (
                <FormGroup
                  className="structured-list-td structured-list-content --inline-preserved -pt-100"
                  controlId="mobile"
                  error={errors?.mobile?.message?.toString()}
                >
                  <TextInput
                    id="mobile"
                    name="mobile"
                    type="tel"
                    dataTestId="aboutMobile"
                    ref={register}
                    width={28}
                  />
                </FormGroup>
              )}
            </Column>
          </Grid>
        </div>

        <div className="structured-list-row ">
          <Grid sm="1" md="2" lg="5" className="-pb-000 -pt-000">
            <Column sm="row" md="1" lg="2" className=" -middle">
              <div className="structured-list-td structured-list-content--nowrap">
                Email
              </div>
            </Column>
            <Column sm="1" md="2" lg="3" className="-middle">
              {!editData && <div className="structured-list-td">Kira</div>}
              {editData && (
                <FormGroup
                  className="structured-list-td structured-list-content --inline-preserved -pt-100"
                  controlId="email"
                  error={errors?.email?.message?.toString()}
                >
                  <TextInput
                    id="email"
                    name="email"
                    type="enail"
                    dataTestId="aboutEmail"
                    ref={register}
                    width={28}
                  />
                </FormGroup>
              )}
            </Column>
          </Grid>
        </div>
      </section>
      <Button
        type="button"
        label={formState.isSubmitting ? 'Saving...' : 'Edit Personal Details'}
        color="primary"
        onClick={() => {
          setEditData(!editData);
          return false;
        }}
        disabled={formState.isSubmitting}
        dataTestId="aboutSubmit"
      />
    </Form>
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
  person: gql`
    fragment AboutFormPerson on PersonType {
      __typename
      uuid
      title
      firstName
      lastName
      emailAddresses {
        __typename
        uuid
        primary
        value
      }
      telephoneNumbers {
        __typename
        uuid
        kind
        value
      }
      dateOfBirth
      countryOfBirth
      nationality
      maritalStatus
      noOfAdultsInHousehold
      noOfDependants
      emailConsent
    }
  `,
};

export default PersonalInformation;
