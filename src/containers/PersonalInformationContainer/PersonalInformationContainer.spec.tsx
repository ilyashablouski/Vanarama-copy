import React from 'react';
import renderer from 'react-test-renderer';
import PersonalInformation from './PersonalInformation';
import { usePersonalInformationData } from './gql';

jest.mock('./gql');

describe('<PersonalInformation />', () => {
  it('should prepopulate the form with existing data', async () => {
    (usePersonalInformationData as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        myAccountDetailsByPersonUuid: {
          address: {
            lineOne: 'Building 1000',
            lineTwo: 'Lakeside North Harbour',
            city: 'Portsmouth',
            postcode: 'PO6 3EN',
            serviceId: 'GB|RM|B|55855593',
            __typename: 'AddressType',
          },
          emailAddress: 'someone.testing.motorama+44@gmail.com',
          firstName: 'Robby',
          lastName: 'William',
          personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
          telephoneNumber: '07987654567d',
          __typename: 'MyAccountType',
        },
      },
      error: undefined,
    });

    // ACT
    const getComponent = () => {
      return renderer.create(<PersonalInformation personUuid="" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should prepopulate the form with existing data', async () => {
    (usePersonalInformationData as jest.Mock).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined,
    });

    // ACT
    const getComponent = () => {
      return renderer.create(<PersonalInformation personUuid="" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('should prepopulate the form with existing data', async () => {
    (usePersonalInformationData as jest.Mock).mockReturnValue({
      loading: false,
      data: undefined,
      error: { message: 'error' },
    });

    // ACT
    const getComponent = () => {
      return renderer.create(<PersonalInformation personUuid="" />).toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
