import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import { ApolloError } from '@apollo/client';
import AboutUs from '../AboutUs';
import { GetAboutUsPageData_aboutUsLandingPage as AboutUsLandingPage } from '../../../../generated/GetAboutUsPageData';

jest.mock('../gql');
jest.mock('core/organisms/carousel', () => () => {
  return <div />;
});
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/about-us',
  }),
}));

const mocks = {
  loading: false,
  data: {
    aboutUsLandingPage: {
      id: '1TgvRkwkUiCAEF66ha3ao1',
      body:
        "Vanarama is an award-winning personal and commercial vehicle leasing company. Whether you're looking for your dream [car](https://beta.vanarama.com/car-leasing.html), a [new van](/van-leasing.html) for your business or a [pick-up truck](https://beta.vanarama.com/pickup-truck-leasing.html)... we've got you covered.\n\nBig things have small beginnings, and some days it's hard to believe that Vanarama started its journey in 2004 with a team of just 3 people in a porta cabin. Today, we employ around 230 people and Vanarama is the ultimate destination for your next vehicle.\n\n## What We Do\n\nWe all want the latest technology with the option to regularly upgrade - just like a mobile phone. At Vanarama we understand that your vehicle is a statement about you and we want to make it as easy to upgrade as you would your phone! Our aim is to get you moving in the most cost-effective, simple way possible, so we'll be there every step of the way - from choosing your new vehicle to delivery straight to your door.\n\nWith the largest panel of funders, Vanarama has the largest buying power around and this enables us to offer you the best leasing deals for whatever your needs. And as well as a huge range of vehicles, we also provide a range of van leasing finance, [van insurance](https://beta.vanarama.com/van-insurance.html) and maintenance packages.\n\n## Customer Support\n\nOur dedicated customer support team is always on-hand to help, keeping you up to date all the way from order through to delivery. We're here to answer any queries you have as quickly as possible and even if you found us online, you can always come and visit us at our head office!\n\nTo further enhance your customer service experience, Vanarama is a member of the Institute of Customer Service (ICS). We like to think that this investment and commitment in our staff is one of the reasons that 95% of our customers would not only recommend us, but also use us again.\n\n## Our Opening Hours\n\n- **Monday-Friday** 9am-9pm\n\n- **Saturday & Sunday** 11am-9pm\n\n\n\n## Our Awards\n\nVanarama has been confirmed as a Sunday Times 100 Best Small Company To Work For in the UK in 2016, [2017](https://beta.vanarama.com/latest-news/the-sunday-times-100-best-small-companies-to-work-for.html) and 2018, with Andy Alderson (CEO) being named [Best Leader at the 2017 awards ceremony](https://beta.vanarama.com/latest-news/the-sunday-times-100-best-small-companies-to-work-for.html).We're delighted to have been recognised by The Sunday Times as one of the [Best Small Companies To Work For in the UK](https://beta.vanarama.com/latest-news/the-sunday-times-100-best-small-companies-to-work-for.html).\n\n**![Sunday Time Best Small Companies to work for award 2018](/assets/careers/sunday-times-best-small-companies-to-work-for-award-2018.jpg)**The company provides industry-leading customer service and has found investing in that service, and the staff that provide it, to be a successful formula for success. From sector awards to national awards you will be dealing with a business that has had scrutiny at the highest level in industry. In 2015, Vanarama won the highly prestigious Lloyds National Business Award for Best Small to Medium Sized Business 2015, an accolade that recognised our commitment to training, customer service and innovation. Read our [latest customer reviews](https://beta.vanarama.com/about-us/customer-testimonials.html).\n\nWe also sponsor The Vanarama National League and through a charity partnership with Prostate Cancer UK, we won the BT Sport Industry Sponsorship Campaign Of The Year 2019, Business Charity Awards - Campaign Of The Year 2019 and Football Business Awards - Silver For Sponsorship Of The Year and Gold for Brand Activation for the Manarama campaign which saw us rename the League to support the charity and raise £150k.\n\n## One Of The Best Companies To Work For\n\nInterested in working at Vanarama? Check out our [Careers page](https://beta.vanarama.com/careers.html).\n\n_Vanarama is regulated by the British Vehicle Rental Leasing Association (BVRLA) and the Financial Conduct Authority (FCA), as well as being a member of the Institute of Customer Service with a distinction grading._\n\n",
      featuredImage: {
        file: {
          url: '',
        },
      },
      metaData: {
        name: 'About Us',
        schema: {
          itemListElement: [
            {
              item: 'https://www.vanarama.com/',
              name: 'Home',
              position: 1,
            },
          ],
        },
        breadcrumbs: null,
      },
      sections: {
        rowText: {
          heading: 'Want To Be Part Of The Vanarama Team?',
          subHeading: null,
          body: 'Start Your Journey with Us Here',
        },
        cards: {
          name: 'About Us Links',
          cards: [
            {
              titleTag: 'p',
              name: 'Meet The Directors',
              title: 'Meet The Directors',
              body:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n[Learn More](https://beta.vanarama.com/about-us/meet-the-directors.html)',
            },
            {
              titleTag: 'p',
              name: 'Meet The Team',
              title: 'Meet The Team',
              body:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n[Learn More](https://www.vanarama.com/about-us/meet-your-support-team.html)\n',
            },
          ],
        },
        carousel: {
          name: 'Awards',
          cards: [
            {
              titleTag: 'p',
              name: 'Award 1',
              title:
                'Sunday Times 100 Best Small Company To Work For in the UK ',
              body:
                'Vanarama has been confirmed as a Sunday Times 100 Best Small Company To Work For in the UK in 2016, 2017 and 2018, with Andy Alderson (CEO) being named Best Leader at the 2017 awards ceremony.',
            },
            {
              titleTag: 'p',
              name: 'Award 2',
              title: 'Lloyds National Business Award',
              body:
                'In 2015, Vanarama won the highly prestigious Lloyds National Business Award for Best Small to Medium Sized Business 2015, an accolade that recognised our commitment to training, customer service and innovation',
            },
            {
              titleTag: 'p',
              name: 'Award 3',
              title: 'Football Business Awards',
              body:
                'Silver For Sponsorship Of The Year and Gold for Brand Activation for the Manarama campaign which saw us rename the League to support the charity and raise £150k.',
            },
          ],
        },
      },
    } as AboutUsLandingPage,
  },
  error: undefined,
};

const resetMocks = () => {
  return mocks;
};

const mockData = resetMocks();

describe('<AboutUs />', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await preloadAll();
  });
  it('renders correctly with data', async () => {
    const getComponent = () => {
      return renderer
        .create(
          <AboutUs
            data={mockData.data}
            loading={mockData.loading}
            error={mockData.error}
          />,
        )
        .toJSON();
    };

    const tree = await getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', async () => {
    const getComponent = () => {
      return renderer
        .create(
          <AboutUs
            data={mockData.data}
            loading={mockData.loading}
            error={{ message: 'Error' } as ApolloError}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with loading', async () => {
    const getComponent = () => {
      return renderer
        .create(<AboutUs data={mockData.data} loading error={mockData.error} />)
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
