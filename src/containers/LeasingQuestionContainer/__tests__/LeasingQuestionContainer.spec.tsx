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
          'Depending on the amount of damage done to the vehicle, the best thing to do is speak with your' +
          ' insurance company directly and arrange for the repair to be carried out by an approved body shop. If the damage is more of a scrape or scuff, then you could contact a mobile smart repairer who can come to you and repair the vehicle on-site or at your home address.',
        image: null,
        link: null,
        name: 'Question 2',
        title: 'I Have Damaged My Van, What Do I Need To Do Next?',
        titleTag: 'h3',
      },
      {
        body:
          'You can have your van serviced at any independent garage providing they are VAT registered, qualified' +
          " to work on your vehicle & use genuine manufacturer parts for the service. Doing this will keep the vehicle's warranty valid until its standard expiry date.",
        image: null,
        link: null,
        name: 'Question 3',
        title: 'What Type Of Garage Should I Use For Servicing My Van?',
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
      );
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
