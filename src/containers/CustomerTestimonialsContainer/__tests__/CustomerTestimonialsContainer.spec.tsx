import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import CustomerTestimonialsContainer from '../CustomerTestimonialsContainer';
import { TestimonialsData } from '../../../../generated/TestimonialsData';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));
jest.mock('../../../hooks/useMediaQuery');

// ARRANGE
const METADATA = {
  __typename: 'Meta',
  title: 'Customer Testimonials & Reviews for Vanarama',
  name: 'Vanarama Reviews and Customer Testimonials',
  metaRobots: null,
  metaDescription:
    'Customer Testimonials - Please take the time to read what our customers have to say about the service we offer.',
  publishedOn: null,
  legacyUrl: 'https://www.vanarama.com/about-us/customer-testimonials.html',
  pageType: 'Testimonials',
  canonicalUrl: 'https://www.vanarama.com/about-us/customer-testimonials.html',
  slug: '/about-us/customer-testimonials',
  schema: {
    '@type': 'BreadcrumbList',
    '@context': 'https://schema.org',
    itemListElement: [
      {
        item: 'https://www.vanarama.com/',
        name: 'Home',
        '@type': 'ListItem',
        position: 1,
      },
      {
        item: 'https://www.vanarama.com/about-us.html',
        name: 'About Us',
        '@type': 'ListItem',
        position: 2,
      },
    ],
  },
};
const BODY = ``;

const SECTIONS = {
  __typename: 'Sections',
  tiles1: {
    __typename: 'Tiles',
    name: null,
    titleTag: null,
    tiles: [
      {
        __typename: 'Tile',
        title: 'Extra Protection',
        body:
          'Redundancy & Life Event Cover included free with every car lease*.',
        image: {
          __typename: 'Image',
          title: 'redundancy-life-event-cover',
          description: 'redundancy-life-event-cover',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3kTJFwdjcWkVHexxDcRSju/d94c9af10e343bfc271e2ed3204b56e0/redundancy.jpg',
            contentType: 'image/jpeg',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
      {
        __typename: 'Tile',
        title: 'No Hidden Fees',
        body: 'We don’t charge admin fees & have a free 30-day returns policy.',
        image: {
          __typename: 'Image',
          title: 'Vanarama-Price-Promise-Icon',
          description: null,
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/4v2ALClaL6YnE0NYRsd8uc/7e92f2b83eb9e594ced8269152961026/Icon-PricePromise-RGB.png',
            contentType: 'image/png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
      {
        __typename: 'Tile',
        title: 'Expert Advice',
        body: 'Our experts are on hand for any info you need about leasing.',
        image: {
          __typename: 'Image',
          title: 'Insurance-Icon',
          description: 'Insurance-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3KhuHOZWIeppLEsCTcouiY/a384211adc3f246728f3c5fd9d8cf637/Insurance-Icon.png',
            contentType: 'image/png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
    ],
  },
  tiles2: {
    __typename: 'Tiles',
    name: 'Why Choose Leasing?',
    titleTag: 'h2',
    tiles: [
      {
        __typename: 'Tile',
        title: 'Affordable Monthly Payments',
        body: "With set monthly payments, you'll always know where you stand.",
        image: {
          __typename: 'Image',
          title: 'Fleet-Icon',
          description: 'Fleet-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
            contentType: 'image/png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
      {
        __typename: 'Tile',
        title: 'Brand New Vehicles',
        body: 'All our vehicles are brand new with zero mileage.',
        image: {
          __typename: 'Image',
          title: 'Fleet-Icon',
          description: 'Fleet-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
            contentType: 'image/png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
      {
        __typename: 'Tile',
        title: 'Peace Of Mind',
        body:
          'All our vehicles come with 3-year manufacturer warranty and MOT included.',
        image: {
          __typename: 'Image',
          title: 'Fleet-Icon',
          description: 'Fleet-Icon',
          file: {
            __typename: 'File',
            url:
              '//images.ctfassets.net/3xid768u5joa/3a609lEJL2WBF9fBG9V6N6/9bbcee8eba6f7deecfbbab92582283e2/Fleet-Icon.png',
            contentType: 'image/png',
            details: {
              image: {
                width: 100,
                height: 100,
              },
            },
          },
        },
        link: null,
      },
      {
        __typename: 'Tile',
        title: 'Flexible Options',
        body:
          'Choose the mileage, length of contract and initial payment to suit you.',
        image: null,
        link: null,
      },
    ],
  },
  featured: {
    __typename: 'Featured',
    layout: null,
    body:
      "Vanarama is an award-winning vehicle leasing company and the leading destination to get you driving the vehicle you want for less. \nWe started out in 2004 leasing vans (hence the name) but since then we’ve grown & grown and now, whether you're looking for your dream car, a new van or even a pickup truck... we've got you covered.\n\nAt Vanarama, we understand that your vehicle is a statement about you and so we wanted to make it as easy to upgrade as you would your mobile phone! We’ll get you moving in the most cost-effective, simple way possible & we'll be there every step of the way - from choosing your new car to delivery straight to your door.",
    title: 'About Vanarama',
    video: null,
    link: null,
    image: null,
  },
} as any;

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

describe('<CustomerTestimonialsContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it.skip('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <CustomerTestimonialsContainer
          initialTestimonials={undefined}
          sections={SECTIONS}
          title={METADATA.title}
          body={BODY}
          breadcrumbsItems={[]}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Cheaper than buying')).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
