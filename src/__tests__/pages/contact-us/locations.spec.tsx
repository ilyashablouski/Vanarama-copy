import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { LocationsPage } from '../../../pages/contact-us/locations';
import { LOCATIONS_PAGE_CONTENT } from '../../../gql/contact-us/contactUs';
import { LocationsPageData } from '../../../../generated/LocationsPageData';

jest.mock('../../../containers/BreadCrumbContainer', () => () => {
  return <div />;
});

const mocked: MockedResponse[] = [
  {
    request: {
      query: LOCATIONS_PAGE_CONTENT,
    },
    result: () => {
      return {
        data: {
          regionalOfficesPage: {
            id: '1p0BIbJUDnPfRLn0v6VNOZ',
            metaData: {
              title: 'Our Regional Locations - Vanarama',
              name: 'Vanarama Regional Offices in the UK',
              metaRobots: null,
              metaDescription:
                'Vanarama has 52 regional van and pickup leasing offices in the UK. Our head office is based in Hemel Hempstead, Hertfordshire. Contact us today to get a quote!',
              publishedOn: null,
              legacyUrl: 'https://www.vanarama.com/locations.html',
              pageType: 'Location',
              canonicalUrl: 'https://www.vanarama.com/locations.html',
              slug: '/locations',
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
                ],
              },
            },
            body:
              "With 50 regional offices throughout the United Kingdom and our head office in the heart of Hemel Hempstead, UK, Vanarama is a strong, established and trusted Great British brand.\n\nWhen you contact us for a pickup or [van lease](https://beta.vanarama.com/van-leasing.html) quotation you will be looked after by the regional office that covers your postcode area. If however we don't have a regional office responsible for your postcode area, one of our skilled, friendly and helpful leasing sales advisers based at our head office will be responsible for looking after you.\n\nYou can find out if there's a regional office in your area from the list below. Click on the link and you will be taken to a page that tells you more about the regional office. You will see a map further down the page. This shows the areas that particular office covers. **Contact them now!**\n\nIf you're unsure, don't hesitate to contact us now on **01442 838 195**.\n",
            intro:
              'Aute minim reprehenderit ad nulla commodo ullamco reprehenderit Lorem tempor',
            featuredImage: null,
            sections: {
              cards: {
                position: 0,
                name: null,
                titleTag: null,
                description: null,
                title: null,
                cards: [
                  {
                    title: 'Barnsley and Doncaster',
                    name: 'Barnsley and Doncaster',
                    image: null,
                    body:
                      'Tel: 01924 566089\n\n[More Information](https://beta.vanarama.com/locations/wakefield-barnsley-and-doncaster.html)\n',
                    titleTag: 'h3',
                    link: null,
                  },
                  {
                    title: 'Bath and Salisbury',
                    name: 'Bath and Salisbury',
                    image: null,
                    body:
                      'Tel: 07771501507\n\n[More Information](http[More Information](https://beta.vanarama.com/locations/bath-salisbury.html)\n',
                    titleTag: 'h3',
                    link: null,
                  },
                ],
              },
            },
          },
        } as LocationsPageData,
      };
    },
  },
];

describe('<LocationsPage />', () => {
  it('should successfully query LocationsPage data', async () => {
    render(
      <MockedProvider addTypename={false} mocks={mocked}>
        <LocationsPage />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Bath and Salisbury')).toBeInTheDocument();
    });
  });
});
