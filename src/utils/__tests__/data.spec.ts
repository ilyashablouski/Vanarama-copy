import { decodeData, encodeData, normalizeString } from '../data';

describe('decodeData/encodeData', () => {
  const originalObj = {
    genericPage: {
      __typename: 'GenericPage',
      body: null,
      featuredImage: null,
      id: '7FMjlP1ubrM6u3xEsnP6PY',
      intro: null,
      metaData: {
        __typename: 'Meta',
        breadcrumbs: [{ href: '/', label: 'Home' }, { label: 'Car Guides' }],
        canonicalUrl: 'https://www.vanarama.com/guides/cars',
        legacyUrl: null,
        metaDescription:
          'Discover the latest reviews, stories, helpful features and advice to help you find you new lease of life at Vanarama.',
        metaRobots: null,
        name: 'Car Guides, Features & Reviews',
        pageType: 'Guides Hub',
        publishedOn: null,
        slug: 'guides/cars',
        title: 'Car Guides, Features & Reviews | Vanarama',
      },
      sections: {
        __typename: 'Sections',
        cards: {
          __typename: 'Cards',
          cards: [
            {
              __typename: 'Card',
              body:
                "Here's our pick of the best cars for under £250 per month... ",
              image: {
                __typename: 'Image',
                description: '',
                file: {
                  __typename: 'File',
                  fileName: 'SEATIbiza0721 (1).jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/3wHbTFi5iKahX9afIjE27l/79ff5b653c1be5c25a2d7c446dd0a827/SEATIbiza0721__1_.jpg',
                },
                title: 'SEATIbiza0721 (1)',
              },
              link: {
                __typename: 'Link',
                legacyUrl: null,
                text: 'Read More',
                url: 'guides/cars/best-cars-for-under-250',
              },
              name: 'The Best Cars You Could Drive For Under £250 A Month',
              title: 'The Best Cars You Could Drive For Under £250 A Month',
              titleTag: 'h3',
            },
            {
              __typename: 'Card',
              body:
                'Find the perfect shade for your next lease car - a Ford Puma',
              image: {
                __typename: 'Image',
                description: 'Grey Ford Puma',
                file: {
                  __typename: 'File',
                  fileName: 'FordPuma-thumb.jpg',
                  url:
                    '//images.ctfassets.net/3xid768u5joa/3Y3qER02XsrofPwAXJXaVX/3bf85319eb20ca6a84fc937cec826d7b/FordPuma-thumb.jpg',
                },
                title: 'FordPuma-thumb',
              },
              link: {
                __typename: 'Link',
                legacyUrl: null,
                text: 'Read More',
                url: 'guides/cars/ford-puma-colour-guide',
              },
              name: 'Ford Puma Colour Guide',
              title: 'Ford Puma Colour Guide',
              titleTag: null,
            },
          ],
          description: null,
          name: null,
          position: 2,
          title: null,
          titleTag: 'h2',
        },
      },
      sectionsAsArray: null,
    },
  };
  const encodedObj = {
    genericPage: {
      __typename: 'GenericPage',
      body: null,
      featuredImage: null,
      id: '7FMjlP1ubrM6u3xEsnP6PY',
      intro: null,
      metaData: {
        __typename: 'Meta',
        breadcrumbs: [{ href: '/', label: 'Home' }, { label: 'Car Guides' }],
        canonicalUrl: 'https://www.vanarama.com/guides/cars',
        legacyUrl: null,
        metaDescription:
          'Discover the latest reviews, stories, helpful features and advice to help you find you new lease of life at Vanarama.',
        metaRobots: null,
        name: 'Car Guides, Features & Reviews',
        pageType: 'Guides Hub',
        publishedOn: null,
        slug: 'Z3VpZGVzL2NhcnM=',
        title: 'Car Guides, Features & Reviews | Vanarama',
      },
      sections: {
        __typename: 'Sections',
        cards: {
          __typename: 'Cards',
          cards: [
            {
              __typename: 'Card',
              body:
                "Here's our pick of the best cars for under £250 per month... ",
              image: {
                __typename: 'Image',
                description: '',
                file: {
                  __typename: 'File',
                  fileName: 'SEATIbiza0721 (1).jpg',
                  url:
                    'Ly9pbWFnZXMuY3RmYXNzZXRzLm5ldC8zeGlkNzY4dTVqb2EvM3dIYlRGaTVpS2FoWDlhZklqRTI3bC83OWZmNWI2NTNjMWJlNWMyNWEyZDdjNDQ2ZGQwYTgyNy9TRUFUSWJpemEwNzIxX18xXy5qcGc=',
                },
                title: 'SEATIbiza0721 (1)',
              },
              link: {
                __typename: 'Link',
                legacyUrl: null,
                text: 'Read More',
                url: 'Z3VpZGVzL2NhcnMvYmVzdC1jYXJzLWZvci11bmRlci0yNTA=',
              },
              name: 'The Best Cars You Could Drive For Under £250 A Month',
              title: 'The Best Cars You Could Drive For Under £250 A Month',
              titleTag: 'h3',
            },
            {
              __typename: 'Card',
              body:
                'Find the perfect shade for your next lease car - a Ford Puma',
              image: {
                __typename: 'Image',
                description: 'Grey Ford Puma',
                file: {
                  __typename: 'File',
                  fileName: 'FordPuma-thumb.jpg',
                  url:
                    'Ly9pbWFnZXMuY3RmYXNzZXRzLm5ldC8zeGlkNzY4dTVqb2EvM1kzcUVSMDJYc3JvZlB3QVhKWGFWWC8zYmY4NTMxOWViMjBjYTZhODRmYzkzN2NlYzgyNmQ3Yi9Gb3JkUHVtYS10aHVtYi5qcGc=',
                },
                title: 'FordPuma-thumb',
              },
              link: {
                __typename: 'Link',
                legacyUrl: null,
                text: 'Read More',
                url: 'Z3VpZGVzL2NhcnMvZm9yZC1wdW1hLWNvbG91ci1ndWlkZQ==',
              },
              name: 'Ford Puma Colour Guide',
              title: 'Ford Puma Colour Guide',
              titleTag: null,
            },
          ],
          description: null,
          name: null,
          position: 2,
          title: null,
          titleTag: 'h2',
        },
      },
      sectionsAsArray: null,
    },
  };
  it('decodeData', () => {
    expect(decodeData(encodedObj)).toEqual(originalObj);
  });

  it('encodeData', () => {
    expect(encodeData(originalObj)).toEqual(encodedObj);
  });

  describe('normalizeString', () => {
    it('with capital letters', () => {
      const str = 'footer_footer-column_ABOUT US_heading';
      const result = 'footer_footer-column_about-us_heading';

      expect(normalizeString(str)).toEqual(result);
    });

    it('with capital letters and special characters', () => {
      const str = 'Vans & Trucks';
      const result = 'vans-trucks';

      expect(normalizeString(str)).toEqual(result);
    });
  });
});
