import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import { useCreatePerson, usePersonalInformationData } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

const dataEx = {
  data: {
    partyByUuid: {
      uuid: "eef3eade-3110-4e77-8330-a313e6647cb3",
      person: {
        firstName: "Richard",
        lastName: "Wester"
      },
      emailAddresses: [
        {
          primary: true,
          value: "richard.wester@test.com"
        }
      ],
      telephoneNumbers: [
        {
          primary: true,
          value: "077898989890"
        }
      ],
      addresses: [
        {
          serviceId: "GB|RM|B|52438237|A1",
          lineOne: "City Gate East",
          lineTwo: "Tollhouse Hill",
          lineThree: "",
          city: "Nottingham",
          postcode: "NG1 5FS",
          country: "GB"
        }
      ]
    }
  }
}

const PersonalInformationContainer: React.FC<IProps> = ({ onCompleted, personUuid }) => {
  const [createDetailsHandle] = useCreatePerson(onCompleted);
  const { data, loading, error } = usePersonalInformationData(personUuid);
  console.log('data', data)
  // if (loading) {
  //   return <Loading size="large" />;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // if (!data || !data.allDropDowns) {
  //   return null;
  // }

  return (
    <PersonalInformation
      dropdownData={data ? data.allDropDowns : []}
      person={dataEx.data.partyByUuid}
      submit={values =>
        createDetailsHandle({
          variables: {
            input: formValuesToInput(values),
          },
        })
      }
    />
  );
};

export default PersonalInformationContainer;
