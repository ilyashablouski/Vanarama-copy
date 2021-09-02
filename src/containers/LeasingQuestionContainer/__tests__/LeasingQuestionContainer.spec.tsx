import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import LeasingQuestionContainer from '../LeasingQuestionContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANG
const METADATA = {
  title: 'Insurance, Tax & Vat Leasing Questions',
  metaRobots: null,
  metaDescription: 'Insurance Tax Vat',
  publishedOn: null,
  legacyUrl:
    'https://www.vanarama.com/van-leasing-questions/insurance-tax-vat.html',
  pageType: 'Customer Leasing Questions',
  __typename: 'Meta',
};
const BODY = ``;

const SECTIONS = {
  questionSet: {
    name: 'All Questions',
    questionAnswers: [
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
      {
        question:
          "I would like a large van, but still unsure what is the best purchase option? Also what is the best tax relief option through my limited company? I'm not VAT registered, so can I claim back my contract payments?",
        answer:
          'Our expert Mike answered... Hello Adrian, thank you very much for leaving your question on our website. There are various leasing options available depending on what you would like to achieve at the end of the contract. If you are not VAT registered then you will not be able to claim the VAT back on the rentals, however depending on which contract you decided to go for, the rentals may well be 100% tax deductible. If you would like to discuss any of these options in greater detail, the best thing to do is contact one of our specialists on 01442 838193 or alternatively please let us know the best contact number for you and when would be a convenient time to contact you. Many thanks once again for leaving your question. Kind regards, Mike Daly.',
      },
    ],
  },
  cards: {
    position: 2,
    name: 'Most Popular Questions',
    titleTag: null,
    description: null,
    cards: [
      {
        body:
          'Our advertised prices will not include servicing and it is your responsibility to make sure that the' +
          " vehicle is serviced in line with the vehicle's servicing schedule. However, we are able to offer you a optional package called Service Plus which covers all routine services, mechanical repairs, replacement tires, MOT if required, replacement brakes, wiper blades and bulbs (all subject to fair wear and tear). The additional cost of the Service Plus package depends on the annual mileage you select and how long you decide to lease the vehicle for.",
        image: null,
        link: null,
        name: 'Question 1',
        title: 'Am I Responsible For The Servicing Of My Leased Van?',
        titleTag: 'h3',
      },
      {
        body:
          'Our advertised prices will not include servicing and it is your responsibility to make sure that the' +
          " vehicle is serviced in line with the vehicle's servicing schedule. However, we are able to offer you a optional package called Service Plus which covers all routine services, mechanical repairs, replacement tires, MOT if required, replacement brakes, wiper blades and bulbs (all subject to fair wear and tear). The additional cost of the Service Plus package depends on the annual mileage you select and how long you decide to lease the vehicle for.",
        image: null,
        link: null,
        name: 'Question 1',
        title: 'Am I Responsible For The Servicing Of My Leased Van?',
        titleTag: 'h3',
      },
      {
        body:
          'Our advertised prices will not include servicing and it is your responsibility to make sure that the' +
          " vehicle is serviced in line with the vehicle's servicing schedule. However, we are able to offer you a optional package called Service Plus which covers all routine services, mechanical repairs, replacement tires, MOT if required, replacement brakes, wiper blades and bulbs (all subject to fair wear and tear). The additional cost of the Service Plus package depends on the annual mileage you select and how long you decide to lease the vehicle for.",
        image: null,
        link: null,
        name: 'Question 1',
        title: 'Am I Responsible For The Servicing Of My Leased Van?',
        titleTag: 'h3',
      },
    ],
  },
} as any;

describe('<LeasingQuestionContainer />', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <LeasingQuestionContainer
          sections={SECTIONS}
          title={METADATA.title}
          body={BODY}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(
        screen.getAllByText(
          `Am I Responsible For The Servicing Of My Leased Van?`,
        ),
      ).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
