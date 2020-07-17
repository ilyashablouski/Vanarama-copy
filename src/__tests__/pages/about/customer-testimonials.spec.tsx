import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { TestimonialsData } from '../../../../generated/TestimonialsData';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';
import { CustomerTestimonialPage } from '../../../pages/about-us/customer-testimonials';

/**
 * NOTE: Mock the BreadCrumbContainer for time being
 */
jest.mock('../../../containers/BreadCrumbContainer', () => () => {
  return <div />;
});

const mocked: MockedResponse[] = [
  {
    request: {
      query: TESTIMONIALS_DATA,
      variables: {
        page: 1,
        size: 4,
      },
    },
    result: {
      data: {
        testimonials: [
          {
            date: '2020-02-11',
            name: 'Steven Buckle',
            whyLease: 'Cheaper than buying',
            comments:
              "I can't really compare you with any of the other companies out there as I've not used them. I guess that speaks for itself!",
            overallRating: 3.9,
          },
        ],
      } as TestimonialsData,
    },
  },
];

describe('<CustomerTestimonialsPage />', () => {
  beforeEach(async () => {
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <CustomerTestimonialPage />
      </MockedProvider>,
    );
  });

  it('should successfully query testimonials data', async () => {
    await waitFor(() => {
      expect(screen.getByText('Cheaper than buying')).toBeInTheDocument();
    });
  });
});
