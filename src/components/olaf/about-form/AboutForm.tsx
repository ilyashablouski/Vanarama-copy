import { useEffect } from 'react';
import ChevronForwardSharpIcon from '@vanarama/uibook/lib/assets/icons/ChevronForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button/';
import CheckBox from '@vanarama/uibook/lib/components/atoms/checkbox/';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Select from '@vanarama/uibook/lib/components/atoms/select/';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput/';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { gql } from 'apollo-boost';
import { useForm } from 'react-hook-form';
import FCWithFragments from '../../../utils/FCWithFragments';
import { genMonths, genYears } from '../../../utils/helpers';
import OptionsWithFavourites from '../../OptionsWithFavourites/OptionsWithFavourites';
import validationSchema from './AboutForm.validation';
import { IAboutFormValues, IProps } from './interface';

const AboutForm: FCWithFragments<IProps> = ({ dropdownData, submit }) => {
  const months: string[] = genMonths() || [];
  const years: number[] = genYears(100) || [];

  const {
    handleSubmit,
    reset,
    register,
    errors,
    watch,
    triggerValidation,
  } = useForm<IAboutFormValues>({
    mode: 'onBlur',
    validationSchema,
  });

  const day = watch('dayOfBirth');
  const mth = watch('monthOfBirth');
  const year = watch('yearOfBirth');

  useEffect(() => {
    if (day && mth && year) {
      triggerValidation(['dayOfBirth', 'yearOfBirth', 'monthOfBirth']);
    }
  }, [day, mth, year, triggerValidation]);

  const onSubmission = (values: IAboutFormValues) => {
    submit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmission)} id="aboutForm" className="form">
      <Heading color="black" size="xlarge">
        About You
      </Heading>
      <Text color="darker" size="lead">
        We just need some initial details for your credit check.
      </Text>
      <FormGroup
        controlId="title"
        label="Title"
        error={errors?.title?.message?.toString()}
      >
        <Select id="title" name="title" dataTestId="aboutTitle" ref={register}>
          <OptionsWithFavourites options={dropdownData.titles} />
        </Select>
      </FormGroup>

      <FormGroup
        controlId="firstName"
        label="First Name"
        error={errors?.firstName?.message?.toString()}
      >
        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          dataTestId="aboutFirstName"
          ref={register}
          width={45}
        />
      </FormGroup>

      <FormGroup
        controlId="lastName"
        label="Last Name"
        error={errors?.lastName?.message?.toString()}
      >
        <TextInput
          id="lastName"
          type="text"
          name="lastName"
          dataTestId="aboutLastName"
          ref={register}
          width={45}
        />
      </FormGroup>
      <FormGroup
        controlId="email"
        label="Email"
        error={errors?.email?.message?.toString()}
      >
        <TextInput
          id="email"
          type="email"
          name="email"
          dataTestId="aboutEmail"
          ref={register}
          width={35}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup
          controlId="mobile"
          label="Mobile"
          error={errors?.mobile?.message?.toString()}
        >
          <TextInput
            id="mobile"
            type="tel"
            name="mobile"
            dataTestId="aboutMobile"
            ref={register}
            width={35}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup
        controlId="dayOfBirth"
        label="Date of Birth"
        inline
        error={
          errors?.dayOfBirth?.message?.toString() ||
          errors?.monthOfBirth?.message?.toString() ||
          errors?.yearOfBirth?.message?.toString()
        }
      >
        <Select
          id="dayOfBirth"
          dataTestId="aboutSelectDOB"
          name="dayOfBirth"
          ref={register}
          placeholder="Day"
        >
          {[...Array(31)]
            .map((_, i) => i + 1)
            .map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </Select>
        <Select
          dataTestId="aboutSelectMOB"
          name="monthOfBirth"
          ref={register}
          placeholder="Month"
        >
          {months.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Select
          dataTestId="aboutSelectYOB"
          name="yearOfBirth"
          ref={register}
          placeholder="Year"
        >
          {years.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="countryOfBirth"
        label="Country of Birth"
        error={errors?.countryOfBirth?.message?.toString()}
      >
        <Select
          id="countryOfBirth"
          name="countryOfBirth"
          dataTestId="aboutSelectCOB"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.countries} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="nationality"
        label="Nationality"
        error={errors?.nationality?.message?.toString()}
      >
        <Select
          id="nationality"
          name="nationality"
          dataTestId="aboutNationality"
          ref={register}
        >
          <OptionsWithFavourites options={dropdownData.nationalities} />
        </Select>
      </FormGroup>
      <FormGroup
        controlId="maritalStatus"
        label="Marital Status"
        error={errors?.maritalStatus?.message?.toString()}
      >
        <Select
          id="maritalStatus"
          name="maritalStatus"
          dataTestId="aboutMaritalStatus"
          ref={register}
        >
          {dropdownData?.maritalStatuses?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="dependants"
        label="No. of Dependants"
        error={errors?.dependants?.message?.toString()}
      >
        <Select
          id="dependants"
          name="dependants"
          dataTestId="aboutDependants"
          ref={register}
        >
          {dropdownData?.noOfDependants?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        controlId="adultsInHousehold"
        label="No. of Adults in Household"
        error={errors?.adultsInHousehold?.message?.toString()}
      >
        <Select
          id="adultsInHousehold"
          name="adultsInHousehold"
          dataTestId="aboutAdultsInHouse"
          ref={register}
        >
          {dropdownData?.noOfAdultsInHousehold?.data.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup
        label="Please Confirm"
        error={errors?.termsAndCons?.message?.toString()}
      >
        <CheckBox
          id="consent"
          dataTestId="aboutConsent"
          name="consent"
          label="I wish to receive emails and SMS messages for updates on the latest deals, offers and promotions."
          ref={register}
        />
        <CheckBox
          id="termsAndCons"
          dataTestId="aboutTermsAndCons"
          name="termsAndCons"
          label="I agree to the terms and conditions."
          ref={register}
        />
      </FormGroup>
      <Button
        type="submit"
        label="Continue"
        color="primary"
        icon={<ChevronForwardSharpIcon />}
        iconColor="white"
        iconPosition="after"
      />
    </form>
  );
};

AboutForm.fragments = {
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
      propertyStatuses {
        __typename
        data
      }
      employmentStatuses {
        __typename
        data
      }
    }
  `,
};

export default AboutForm;
