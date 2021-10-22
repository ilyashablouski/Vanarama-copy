import { render, act, waitFor, RenderResult, screen } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import PersonalInformation from '../PersonalInformation';
import { useCreatePerson } from '../gql';

jest.mock('@apollo/client');
jest.mock('../gql');

(useLazyQuery as jest.Mock).mockReturnValue([
  () => {},
  { loading: false, error: false },
]);

(useCreatePerson as jest.Mock).mockReturnValue([() => {}]);

it('should render PersonalInformationContainer correctly', async () => {
  const getComponent = render(
    <PersonalInformation
      person={{
        personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
        firstName: 'Jack',
        lastName: 'Jones',
        address: {
          city: 'Edinburgh',
          lineOne: '220/1 Ferry Road',
          lineTwo: '',
          postcode: 'EH5 3AD',
          serviceId: 'GB|RM|B|8246937',
        },
        telephoneNumber: '01442838195',
        emailAddress: 'someone.testing.motorama+44@gmail.com',
        emailConsent: true,
        smsConsent: true,
      }}
      uuid="aa08cca2-5f8d-4b8c-9506-193d9c32e05f"
    />,
  );

  await waitFor(() => {
    expect(screen.getByText('Jones'));
  });
  const tree = getComponent.baseElement;
  expect(tree).toMatchSnapshot();
});
