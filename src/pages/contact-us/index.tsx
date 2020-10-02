import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown/with-html';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Map from '@vanarama/uibook/lib/components/atoms/map';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import { getFeaturedClassPartial } from '../../utils/layout';
import withApollo from '../../hocs/withApollo';
import {
  ContactUsPageData_contactUsLandingPage_sections_cards_cards as Cards,
  ContactUsPageData_contactUsLandingPage_sections_featured2_cards as Cards2,
} from '../../../generated/ContactUsPageData';
import RouterLink from '../../components/RouterLink/RouterLink';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../utils/getSectionsData';
import { useGenericPage } from '../../gql/genericPage';

export const ContactUsPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));
  const [show, setShow] = useState(false);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const COORDS = { lat: 51.762479, lng: -0.438241 };
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {metaData?.name}
        </Heading>
      </div>
      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured1'], data?.genericPage.sections),
        )}`}
      >
        <div>
          <Heading tag="span" size="large" color="black">
            {getSectionsData(
              ['featured1', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <ReactMarkdown
            escapeHtml={false}
            source={
              getSectionsData(
                ['featured1', 'body'],
                data?.genericPage.sections,
              ) || ''
            }
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
          <div className="button-group">
            <Button
              label="View Office"
              fill="solid"
              color="teal"
              onClick={() => Router.push('')}
            />
            <Button
              label="Regional Offices"
              fill="outline"
              color="teal"
              onClick={() => Router.push('/contact-us/locations')}
            />
          </div>
          <hr className="-fullwidth" />
          <Text tag="p" size="small" color="darker">
            Lorem nostrud irure sit consectetur
          </Text>
        </div>
        <Map
          apiKey="AIzaSyDwZ-btyncKZtsysSU-FnjRpydDBwAEwsM"
          center={COORDS}
          zoom={11}
        >
          {show && (
            <Map.InfoWindow
              onCloseClick={() => setShow(false)}
              position={COORDS}
            >
              <div>
                HP2 7DE Maylands Ave, Hemel Hempstead Industrial Estate, Hemel
                Hempstead
              </div>
            </Map.InfoWindow>
          )}
          <Map.Marker
            icon="http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png"
            onClick={() => setShow(true)}
            position={COORDS}
            title="Image title"
          />
        </Map>
      </section>
      <section className="row:bg-light">
        <div className="row:tiles">
          {(getSectionsData(
            ['cards', 'cards'],
            data?.genericPage.sections,
          ) as Cards[])?.map((c: Cards, idx) => (
            <Card key={c.title || idx}>
              <Heading size="large" color="black">
                {c.title}
              </Heading>
              <ReactMarkdown
                escapeHtml={false}
                source={c.body || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                  heading: props => (
                    <Text {...props} size="lead" color="darker" tag="h3" />
                  ),
                  paragraph: props => (
                    <Text {...props} tag="p" color="darker" />
                  ),
                }}
              />
            </Card>
          ))}
        </div>
      </section>
      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured2'], data?.genericPage.sections),
        )}`}
      >
        <div>
          <Heading size="large" color="black">
            {getSectionsData(
              ['featured2', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <ReactMarkdown
            escapeHtml={false}
            source={
              getSectionsData(
                ['featured2', 'body'],
                data?.genericPage.sections,
              ) || ''
            }
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </div>
        {(getSectionsData(
          ['featured2', 'cards'],
          data?.genericPage.sections,
        ) as Cards2[])?.map((c: Cards2 | null, idx) => (
          <Card inline key={c?.title || idx}>
            <Image className="card-image" src={c?.image?.file?.url || ''} />
            <CardTitle title={c?.title || ''} />
            <Text color="darker">{c?.body}</Text>
            <Button
              fill="clear"
              color="teal"
              label={c?.link?.text || ''}
              onClick={() => Router.push(c?.link?.url || '')}
            />
          </Card>
        ))}
      </section>
    </>
  );
};

export default withApollo(ContactUsPage, { getDataFromTree });
