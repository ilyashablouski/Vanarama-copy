import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, waitFor } from '@testing-library/react';
import LegalArticleContainer from '../LegalArticleContainer';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
  }),
}));

// ARRANGE
const BODY =
  '#### **By Paul Kirby, Vanarama Head Of EV & LCV**\n\n\n**If I was to scour the internet for the best lease deals on an electric van I would probably find only 4 electric vehicles available for sale.';

const SECTIONS = {
  legalStatement: {
    __typename: 'LegalStatement',
    name: null,
    title: null,
    body:
      " **Autorama UK is the UK's most-recognised vehicle leasing brand. Our principal business is brokering the sale of vehicles, finance and insurance to our customers. All of our directly employed staff are based in the UK.**\n\n \n\nWe seek to operate in an open, ethical manner in all our business dealings. We believe that modern slavery is an unacceptable issue. Our policy is to assess and address modern slavery laws within our own business and we expect those organisations with whom we do business to adopt and enforce policies to comply with the legislation.\n\n \n\n**Our policy on slavery and human trafficking**\n\n \n- Autorama UK Ltd is committed to preventing slavery and human trafficking in our business and our supply chains. \n- We seek to uphold the highest standards of honesty and integrity in all our business dealings and relationships. \n- We operate a zero-tolerance approach to modern slavery of any kind within our organisation and our supply chain.\n- Any instances of non-compliance of which Autorama UK LTD is made aware will be assessed on a case-by-case basis. Remedial action will be taken and tailored to suit the circumstances.\n- Autorama UK LTD will quickly and thoroughly investigate any claim or indication that any area of its business or supply chains is engaging in human trafficking or slave labour.\n- Any such claim coming to the attention of personnel within Autorama UK LTD should be reported to senior management in accordance with our Whistleblowing Policy. The board of directors will be informed of the issue including the findings and outcome of the investigation.\n \n\n**Our people**\n\n \n- We ensure all employees have the right to work in UK.\n- Our people are our most highly valued asset and are critical to Autorama UK LTD's success and growth. \n- Our Core Values set out guiding principles for members of staff which outlines they should always act lawfully and ethically. \n- All staff undertake mandatory compliance training courses which outline these values further. \n \n\n \n\n**Our supply chains**\n\n \n- We recognise that our business is exposed to greater risk when dealing with suppliers. \n- Our approach to managing this is to identify the level of risk.\n- Our supply chains are predominately funders (finance companies), vehicle dealers and vehicle manufacturers. We consider the sectors in which we operate and our supply chains to be at lower risk of modern slavery.\n- The vast majority of suppliers for our core business are registered and trade in the UK. \n- A review has been completed of our top suppliers, (who themselves are eligible to publish statements) and we have sufficiently concluded that their Modern Slavery Statements meet requirements under the Modern Slavery Act 2015. These statements will be reviewed periodically to ensure compliance.\n \n\n**Actions taken**\n\n \n- Our Modern-Day Slavery policy is published on our website and our intranet for easy accessibility for all members of staff and customers.\n- Review of our top suppliers in our supply chain completed to ensure compliance with the MSA 2015.\n- Risk Assessments were undertaken to highlight key areas for focus going in to 2020.\n- National Minimum Wage reviews were completed to ensure all employees were paid within legal requirements.\n- Employee induction and training provisions were created, all new members of staff would be aware of our obligations and where to find our statement. \n \n\n \n\n**Measuring Effectiveness**\n\n \n\nIn order to assess the effectiveness of the steps we are taking to ensure that modern slavery is not taking place within our business or supply chain we will continue to:\n\n \n- Complete internal and supplier risk assessments to highlight key areas for focus\n- Review our supply chain to ensure compliance with the MSA 2015\n- Ensure ongoing training and awareness for new and existing staff\n- Monitor reporting from staff, the public, law enforcement agencies and the media in relation to modern slavery for our business and our supply chain\n \n\n \n\n \n\n**Board Approval**\n\n \n\nThis statement will be reviewed and updated (if necessary) annually to reflect our ongoing commitment to ensuring that our business and supply chain have made provisions to aid in the prevention of Human Trafficking and Slavery.\n\n \n\n**This Statement is for the financial year ending 2020, it is approved by the board and signed on its behalf:**\n\n \n\n \n\n![](/assets/blog/modern slavery/andysignature.jpg)\n\n**Andy Alderson**\n\n \n\n**CEO, Autorama UK Ltd**\n\n \n\n \n\nThis statement is made on behalf of Autorama UK Ltd, its subsidiary companies and brands in accordance with Section 54(1) of the Modern Slavery Act 2015 ('the Act') in relation to the financial year ended 31 December 2020.\n\n \n\n",
  },
  legalStatement1: null,
  legalStatement2: null,
};

const NAME = 'Legal statement';

const IMAGE =
  '//images.ctfassets.net/3xid768u5joa/2FgrgR6JOuvUgIGRmV5rZg/648465d10d6aa137a720013270728029/maxus-top-electric-vans.jpg';

describe('<LegalArticleContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should match snapshot', async () => {
    // ACT
    const getComponent = render(
      <MockedProvider addTypename={false}>
        <LegalArticleContainer
          image={IMAGE}
          name={NAME}
          body={BODY}
          sections={SECTIONS}
        />
      </MockedProvider>,
    );
    // ASSERT
    await waitFor(() => {
      expect(screen.getByText(`Legal statement`)).toBeInTheDocument();
    });

    const tree = getComponent.baseElement;
    expect(tree).toMatchSnapshot();
  });
});
