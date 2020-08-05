import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Map from '@vanarama/uibook/lib/components/atoms/map';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';

import withApollo from '../../hocs/withApollo';
import { ContactUsPageData } from '../../../generated/ContactUsPageData';
import { CONTACT_US_CONTENT } from '../../gql/contact-us/contactUs';

import BreadCrumbContainer from '../../containers/BreadCrumbContainer';

export const ContactUsPage: NextPage = () => {
  const { data, loading, error } = useQuery<ContactUsPageData>(
    CONTACT_US_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="row:title">
        <BreadCrumbContainer />
        <Heading size="xlarge" color="black">
          Contact Us
        </Heading>
      </div>
      <section className="row:featured-right">
        <div>
          <Heading size="large" color="black">
            {data?.contactUsLandingPage.sections.featured1?.title}
          </Heading>
          <ReactMarkdown
            escapeHtml={false}
            source={data?.contactUsLandingPage.sections.featured1?.body || ''}
          />
          <div className="button-group">
            <Button label="View Office" fill="solid" color="teal" />
            <Button label="Regional Offices" fill="outline" color="teal" />
          </div>
          <hr className="-fullwidth" />
          <Text tag="p" size="small" color="dark">
            Lorem nostrud irure sit consectetur
          </Text>
        </div>
        <Map apiKey="" />
      </section>
      <section className="row:bg-light">
        <div className="row:tiles">
          {data?.contactUsLandingPage.sections.cards?.cards?.map(item => (
            <Card>
              <Heading size="large" color="black">
                {item.title}
              </Heading>
              <ReactMarkdown escapeHtml={false} source={item.body || ''} />
            </Card>
          ))}
        </div>
      </section>
      <section className="row:featured-right">
        <div>
          <Heading size="large" color="black">
            {data?.contactUsLandingPage.sections.featured2?.title}
          </Heading>
          <ReactMarkdown
            escapeHtml={false}
            source={data?.contactUsLandingPage.sections.featured2?.body || ''}
          />
        </div>
        <Card inline>
          <Image
            className="card-image"
            src="https://www.vanarama.com/assets/images-optimised/header-ivan.svg"
          />
        </Card>
      </section>
    </>
  );
};

export default withApollo(ContactUsPage, { getDataFromTree });
