import React from 'react';
import preloadAll from 'jest-next-dynamic';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

describe('<Footer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('renders correctly with body', () => {
    const getComponent = () => {
      return renderer
        .create(
          <Footer
            primaryFooter={{
              id: '2zfD36955SlVBcnHfpsxnK',
              linkGroups: [
                {
                  name: 'GET IN TOUCH WITH US',
                  body:
                    '- __Phone__ 01442 838 195\n- __Monday–Thursday__ 8:30am–7pm\n- __Friday__ 9am–5pm\n- __Saturday__ 9am–3pm\n- __Sunday__ Closed\n- [enquiries@vanarama.co.uk](mailto:enquiries@vanarama.co.uk "enquiries@vanarama.co.uk")\n\n- Vanarama on Facebook\n- Vanarama on Twitter\n- Vanarama on Instagram\n- Vanarama on LinkedIn\n- Vanarama on Youtube\n\n- BVRLA SVG Logo',
                  links: null,
                  linkGroups: [
                    {
                      name: 'Phone',
                      links: [
                        {
                          text: '01442 838 195',
                          url: '01442 838 195',
                        },
                      ],
                    },
                    {
                      name: 'Monday–Thursday',
                      links: [
                        {
                          text: '8:30am–7pm',
                          url: null,
                        },
                      ],
                    },
                    {
                      name: 'Friday',
                      links: [
                        {
                          text: '9am–5pm',
                          url: null,
                        },
                      ],
                    },
                    {
                      name: 'Saturday ',
                      links: [
                        {
                          text: '9am–3pm',
                          url: null,
                        },
                      ],
                    },
                    {
                      name: 'Sunday',
                      links: [
                        {
                          text: 'Closed',
                          url: null,
                        },
                      ],
                    },
                    {
                      name: null,
                      links: [
                        {
                          text: 'enquiries@vanarama.co.uk',
                          url: 'enquiries@vanarama.co.uk',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'VANS & TRUCKS',
                  body:
                    '- Van Leasing\n- Pickup Truck Leasing\n- Van Reviews\n- Van News\n- Compare Vans\n- Van Leasing Explained\n- Ask Us A Question\n- Advanced Breakdown Cover\n- Service Plus\n- Van Insurance\n- Van Insurance FAQs',
                  links: [
                    {
                      url: 'https://beta.vanarama.com/van-leasing.html',
                      text: 'Van Leasing',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/pickup-truck-leasing.html',
                      text: 'Pickup Truck Leasing',
                    },
                    {
                      url: 'https://beta.vanarama.com/van-reviews.html',
                      text: 'Van Reviews',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/latest-news/category/van-news.html',
                      text: 'Van News',
                    },
                    {
                      url: 'https://www.vanarama.com/compare-vans.html',
                      text: 'Compare Vans',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/van-leasing-explained.html',
                      text: 'Van Leasing Explained',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/van-leasing-questions.html',
                      text: 'Customer Leasing Questions',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/advanced-breakdown-cover.html',
                      text: 'Advanced Breakdown Cover',
                    },
                    {
                      url: 'https://beta.vanarama.com/serviceplus.html',
                      text: 'Service Plus',
                    },
                    {
                      url: 'https://beta.vanarama.com/van-insurance.html',
                      text: 'Van Insurance',
                    },
                    {
                      url: 'https://beta.vanarama.com/van-insurance/faq.html',
                      text: 'Van Insurance FAQs',
                    },
                  ],
                  linkGroups: null,
                },
                {
                  name: 'CARS',
                  body: null,
                  links: [
                    {
                      url: 'https://beta.vanarama.com/car-leasing.html',
                      text: 'Car Leasing',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/car-leasing/blog/category/car-news.html',
                      text: 'Car News',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/car-leasing-explained.html',
                      text: 'Car Leasing Explained ',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/redundancy-and-life-event-cover.html',
                      text: 'Redundancy & Life Event Cover',
                    },
                    {
                      url: 'https://beta.vanarama.com/eligibility-checker.html',
                      text: 'Eligability Checker',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/car-leasing-explained/given-company-cash-allowance-vs-company-car.html',
                      text: 'Company Cash Allowance',
                    },
                  ],
                  linkGroups: null,
                },
                {
                  name: 'ABOUT US & CONTACT',
                  body:
                    '- Our Price Promise\n- 5 Star Service Promise\n- Customer Leasing Reviews\n- Award Winning Leasing\n- Careers\n- Our Local Representatives\n- Community\n- FCA Initial Disclosure Document\n- Complaints Policy\n- Cookie & Privacy Policy\n- Terms & Conditions\n- Modern Slavery Statement\n- Sitemap',
                  links: [
                    {
                      url:
                        'https://beta.vanarama.com/about-us/price-protection-guarantee.html',
                      text: 'Our Price Promise',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/about-us/five-star-service.html',
                      text: '5 Star Service Promise',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/about-us/customer-testimonials.html',
                      text: 'Customer Leasing Reviews',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/latest-news/the-sunday-times-100-best-small-companies-to-work-for.html',
                      text: 'Award Winning Leasing',
                    },
                    {
                      url: 'https://beta.vanarama.com/careers.html',
                      text: 'Careers',
                    },
                    {
                      url: 'https://beta.vanarama.com/locations.html',
                      text: 'Our Local Representatives',
                    },
                    {
                      url: 'https://beta.vanarama.com/community.html',
                      text: 'Community',
                    },
                    {
                      url: 'https://beta.vanarama.com/fca.html',
                      text: 'FCA Initial Disclosure Document',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/contact-us/complaints-procedure.html',
                      text: 'Complaints Policy',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/legal/privacy-policy.html',
                      text: 'Cookie & Privacy Policy',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/legal/terms-and-conditions.html',
                      text: 'Terms & Conditions',
                    },
                    {
                      url:
                        'https://beta.vanarama.com/legal/modern-slavery-statement.html',
                      text: 'Modern Slavery Statement',
                    },
                    {
                      url: 'https://beta.vanarama.com/sitemap.html',
                      text: 'Sitemap',
                    },
                  ],
                  linkGroups: null,
                },
              ],
              legalStatement: {
                name: 'Global Disclaimer',
                title: '©2020 Autorama UK LTD. All rights reserved.',
                body:
                  'Autorama UK Ltd Registered in England and Wales with registered number: 05137709 Registered office: Vanarama, Maylands Avenue, Hemel Hempstead, HP2 7DE, United Kingdom. Vanarama, Vanarama Cars, Pickup Trucks Direct, Vanarama Short Term Leasing and Vanarama Insurance Services are trading styles of Autorama UK Ltd, who are authorised and regulated by the Financial Conduct Authority (Our Financial Conduct Authority Register number is 630748). VAT number GB842814720. Autorama UK Ltd is a Credit Broker not a Lender, we can introduce you to a selected group of Lenders. Calls are recorded for compliance and training purposes.',
              },
            }}
          />,
        )
        .toJSON();
    };

    const tree = getComponent();
    expect(tree).toMatchSnapshot();
  });
});
