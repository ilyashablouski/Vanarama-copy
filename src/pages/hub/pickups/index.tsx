import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';

import {
  HubPickupPageData,
  HubPickupPageData_hubPickupPage_sections_tiles_tiles as TileData,
  HubPickupPageData_hubPickupPage_sections_steps_steps as StepData,
  HubPickupPageData_hubPickupPage_sections_accessories_accessories as AccessoryData,
} from '../../../../generated/HubPickupPageData';
import { HUB_PICKUP_CONTENT } from '../../../gql/hubPickupPage';
import withApollo from '../../../hocs/withApollo';

import DealOfMonth from '../../../components/DealOfMonth';
import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import RouterLink from '../../../components/RouterLink/RouterLink';

export const PickupsPage: NextPage = () => {
  const { data, loading, error } = useQuery<HubPickupPageData>(
    HUB_PICKUP_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Hero>
        <HeroHeading text={data?.hubPickupPage.sections.hero?.title || ''} />
        <br />
        <HeroTitle text={data?.hubPickupPage.sections.hero?.body || ''} />
        <br />
        <Image
          className="hero--image"
          plain
          size="expand"
          src={
            data?.hubPickupPage.sections.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/hilux-removebg-preview.png'
          }
        />
      </Hero>

      <section className="row:lead-text">
        <Heading size="xlarge" color="black">
          {data?.hubPickupPage.sections.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {data?.hubPickupPage.sections.leadText?.description}
        </Text>
      </section>
      <hr className="-fullwidth" />

      <div className="row:featured-product">
        <DealOfMonth
          imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg"
          vehicle="Ford Ranger"
          specification="Pick Up Double Cab Wildtrak 3.2 EcoBlue 200 Auto"
          price={180}
          rating={4.5}
        />
      </div>

      <div className="row:bg-lighter">
        <section className="row:cards-3col">
          {Array.from(Array(9).keys()).map(val => (
            <ProductCard
              key={val}
              header={{
                accentIcon: <Icon icon={<Flame />} color="white" />,
                accentText: 'Hot Deal',
                text: 'In Stock - 14-21 Days Delivery',
              }}
              features={[
                {
                  icon: <Icon icon={<SnowSharp />} color="dark" />,
                  label: 'Aircon',
                },
                {
                  icon: <Icon icon={<BluetoothSharp />} color="dark" />,
                  label: 'Bluetooth',
                },
                {
                  icon: <Icon icon={<CompassSharp />} color="dark" />,
                  label: 'Navigation',
                },
                {
                  icon: <Icon icon={<WifiSharp />} color="dark" />,
                  label: 'Sensors',
                },
              ]}
              imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/v1581538983/cars/PeugeotRifter0718_7_lqteyc.jpg"
              onCompare={() => true}
              onWishlist={() => true}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{ href: '#', label: 'Peugeot 208' }}
                    className="heading"
                    classNames={{ size: 'large', color: 'black' }}
                  />
                ),
                description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                score: 4.5,
              }}
            >
              <div className="-flex-h">
                <Price
                  price={209}
                  size="large"
                  separator="."
                  priceDescription="Per Month Exc.VAT"
                />
                <Button
                  color="teal"
                  fill="solid"
                  label="View Offer"
                  onClick={() => true}
                  size="regular"
                />
              </div>
            </ProductCard>
          ))}

          <Button label="View All Pickups" size="large" color="teal" />
        </section>
      </div>

      <section className="row:steps-4col">
        <Heading className="-a-center -mb-400" size="large" color="black">
          {data?.hubPickupPage.sections.steps?.heading}
        </Heading>
        {data?.hubPickupPage.sections.steps?.steps?.map(
          (step: StepData, idx: number) => (
            <Step
              className="-mh-auto"
              key={step.title || idx}
              heading={step.title || ''}
              step={idx + 1}
              text={step.body || ''}
            />
          ),
        )}
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            {data?.hubPickupPage.sections.featured1?.title}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              source={data?.hubPickupPage.sections.featured1?.body || ''}
            />
          </Text>
          <IconList>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Choose your contract length &amp; agreed mileage
            </IconListItem>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Pay an initial payment
            </IconListItem>
            <IconListItem iconColor="orange">
              &nbsp;&nbsp;Set up your agreed fixed monthly rental
            </IconListItem>
          </IconList>
        </div>
        <Image
          src={
            data?.hubPickupPage.sections.featured1?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      </section>

      <section className="row:featured-left">
        <Image
          src={
            data?.hubPickupPage.sections.featured2?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
        <div className="-inset -middle -col-400">
          <Heading size="large" color="black">
            {data?.hubPickupPage.sections.featured2?.title}
          </Heading>
          <Text className="markdown" tag="div" size="regular" color="darker">
            <ReactMarkdown
              source={data?.hubPickupPage.sections.featured2?.body || ''}
            />
          </Text>
        </div>
      </section>

      <section className="row:accessories">
        <Heading size="large" color="black">
          {data?.hubPickupPage.sections.accessories?.name}
        </Heading>
        {data?.hubPickupPage.sections.accessories?.accessories?.map(
          (acc: AccessoryData, idx: number) => (
            <div key={acc.title || idx}>
              <Image
                size="expand"
                src={
                  acc.image?.file?.url ||
                  'https://source.unsplash.com/collection/2102317/500x325?sig=403450'
                }
              />
              <Heading size="regular" color="black">
                {acc.title}{' '}
              </Heading>
              <Text tag="div" size="regular" color="darker">
                {acc.body}
              </Text>
            </div>
          ),
        )}
      </section>

      <hr className="fullWidth" />
      <section className="row:text">
        <Heading size="large" color="black">
          {data?.hubPickupPage.sections.rowText?.heading}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {data?.hubPickupPage.sections.rowText?.body}
          </Text>
          <Heading size="regular" color="black">
            {data?.hubPickupPage.sections.rowText?.subHeading}
          </Heading>
          <Button
            className="-pt-200"
            label="Veiw Leasing Guides"
            color="teal"
            fill="clear"
            size="regular"
            icon={<ArrowForwardSharp />}
            iconPosition="after"
          />
        </div>
      </section>
      <hr className="fullWidth" />

      <section className="row:features-4col">
        {data?.hubPickupPage.sections.tiles?.tiles?.map(
          (tile: TileData, idx: number) => (
            <div key={tile.title || idx}>
              <Tile className="-plain -button -align-center" plain>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    inline
                    round
                    size="large"
                    src={
                      tile.image?.file?.url ||
                      'https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                    }
                  />
                </div>
                <a className="tile--link" href="##">
                  <Heading tag="span" size="regular" color="black">
                    {tile.title}
                  </Heading>
                </a>
                <Text tag="p">{tile.body}</Text>
              </Tile>
            </div>
          ),
        )}
      </section>

      <section className="row:manufacturer-grid">
        <Heading size="large" color="black" className="-a-center -mb-500">
          Search By Manufacturer
        </Heading>
        <div>
          {[
            'Mercedez-Benz',
            'Mitsubishi',
            'Nissan',
            'Volkswagen',
            'Fiat',
            'Ford',
            'Toyota',
            'BMW',
            'Isuzu',
            'Porche',
          ].map(n => (
            <Button key={n} color="teal" size="large" label={n} />
          ))}
        </div>
      </section>

      <section className="row:league">
        <League altText="vanarama national league" />
      </section>

      <section className="row:featured-logos">
        <Heading tag="span" size="small" color="darker">
          AS FEATURED ON
        </Heading>
        <div>
          {[
            {
              label: 'bbc',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/bbc.png',
            },
            {
              label: 'btsport',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/btsport.png',
            },
            {
              label: 'dailymail',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymail.png',
            },
            {
              label: 'dailymirror',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymirror.png',
            },
            {
              label: 'itv',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/itv.png',
            },
            {
              label: 'metro',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/metro.png',
            },
            {
              label: 'thesun',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/thesun.png',
            },
            {
              label: 'sky',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/sky.png',
            },
            {
              label: 'thetelegraph',
              href:
                'https://www.vanarama.com/Assets/images-optimised/home/featured/thetelegraph.png',
            },
          ].map(({ href, label }) => (
            <Image key={label} src={href} alt={label} size="expand" plain />
          ))}
        </div>
      </section>
      <section className="row:trustpilot">
        <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
      </section>
    </>
  );
};

export default withApollo(PickupsPage, { getDataFromTree });
