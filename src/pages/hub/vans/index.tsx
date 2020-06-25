import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import League from '@vanarama/uibook/lib/components/organisms/league';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ProductCard from '@vanarama/uibook/lib/components/molecules/cards/ProductCard/ProductCard';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Price from '@vanarama/uibook/lib/components/atoms/price';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';

import {
  HubVanPageData,
  HubVanPageData_hubVanPage_sections_tiles_tiles as TileData,
  HubVanPageData_hubVanPage_sections_cards_cards as CardData,
  HubVanPageData_hubVanPage_sections_steps_steps as StepData,
} from '../../../../generated/HubVanPageData';
import { HUB_VAN_CONTENT } from '../../../gql/hubVanPage';
import withApollo from '../../../hocs/withApollo';

import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import DealOfMonth from '../../../components/DealOfMonth';
import RouterLink from '../../../components/RouterLink/RouterLink';
import useSliderProperties from '../../../hooks/useSliderProperties';

const VansPage: NextPage = () => {
  const { itemWidth, slidesToShow } = useSliderProperties(345, 345, 310);
  const { data, loading, error } = useQuery<HubVanPageData>(HUB_VAN_CONTENT);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Hero>
        <HeroHeading>{data?.hubVanPage.sections.hero?.title}</HeroHeading>
        <br />
        <HeroTitle>{data?.hubVanPage.sections.hero?.body}</HeroTitle>
        <Button
          size="lead"
          fill="outline"
          label=" View Special Offers"
          color="white"
        />
        <br />
        <Image
          className="hero--image"
          plain
          size="expand"
          src={
            data?.hubVanPage.sections.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
      </Hero>
      <div className="row:lead-text">
        <Heading size="xlarge" color="black">
          {data?.hubVanPage.sections.leadText?.heading}
        </Heading>
        <Text tag="span" size="lead" color="darker">
          {data?.hubVanPage.sections.leadText?.description}
        </Text>
      </div>
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
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Small Vans
            </span>
          </Heading>
          <Slider className="-mh-auto" gutter={16} slidesToShow={slidesToShow}>
            {[1, 2, 3, 4, 5].map(k => (
              <div key={k.toString()} style={{ width: itemWidth }}>
                <ProductCard
                  header={{
                    accentIcon:
                      slidesToShow > 2 ? (
                        <Icon icon={<Flame />} color="white" />
                      ) : (
                        ''
                      ),
                    accentText: slidesToShow > 2 ? 'Hot Deal' : '',
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
              </div>
            ))}
          </Slider>
          <div className="-justify-content-row -pt-500">
            <Button label="View All Vans" color="teal" />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Medium Vans
            </span>
          </Heading>
          <Slider className="-mh-auto" gutter={16} slidesToShow={slidesToShow}>
            {[1, 2, 3, 4, 5].map(k => (
              <div key={k.toString()} style={{ width: itemWidth }}>
                <ProductCard
                  header={{
                    accentIcon:
                      slidesToShow > 2 ? (
                        <Icon icon={<Flame />} color="white" />
                      ) : (
                        ''
                      ),
                    accentText: slidesToShow > 2 ? 'Hot Deal' : '',
                    text: 'In Stock - 14-21 Days Delivery',
                  }}
                  imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
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
                  onCompare={() => true}
                  onWishlist={() => true}
                  title={{
                    title: '',
                    link: (
                      <a href="/#" className="heading -large -black">
                        Peugeot 208
                      </a>
                    ),
                    description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                    score: 4.5,
                  }}
                >
                  <div className="-flex-h">
                    <Price
                      price={233.95}
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
              </div>
            ))}
          </Slider>
          <div className="-justify-content-row -pt-500">
            <Button label="View All Vans" color="teal" />
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div>
          <Heading size="large" color="black">
            <span
              style={{ textAlign: 'center', display: 'block' }}
              className="-mb-400"
            >
              Large Vans
            </span>
          </Heading>
          <Slider className="-mh-auto" gutter={16} slidesToShow={slidesToShow}>
            {[1, 2, 3, 4, 5].map(k => (
              <div key={k.toString()} style={{ width: itemWidth }}>
                <ProductCard
                  header={{
                    accentIcon:
                      slidesToShow > 2 ? (
                        <Icon icon={<Flame />} color="white" />
                      ) : (
                        ''
                      ),
                    accentText: slidesToShow > 2 ? 'Hot Deal' : '',
                    text: 'In Stock - 14-21 Days Delivery',
                  }}
                  imageSrc="https://source.unsplash.com/collection/2102317/1000x650?sig=403440"
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
                  onCompare={() => true}
                  onWishlist={() => true}
                  title={{
                    title: '',
                    link: (
                      <a href="/#" className="heading -large -black">
                        Peugeot 208
                      </a>
                    ),
                    description: '1.0 IG-T 100 Tekna 5dr Xtronic [Leather]',
                    score: 4.5,
                  }}
                >
                  <div className="-flex-h">
                    <Price
                      price={233.95}
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
              </div>
            ))}
          </Slider>
          <div className="-justify-content-row -pt-500">
            <Button label="View All Vans" color="teal" />
          </div>
        </div>
      </div>

      <div className="row:bg-lighter ">
        <div className="row:cards-4col">
          <Heading size="large" color="black">
            {data?.hubVanPage.sections.cards?.name}
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            {data?.hubVanPage.sections.cards?.description}
          </Text>
          {data?.hubVanPage.sections.cards?.cards?.map(
            (card: CardData, idx) => (
              <Card
                key={card.title || idx}
                title={{
                  title: '',
                  withBtn: true,
                  link: (
                    <RouterLink
                      link={{ href: '#', label: card.title || '' }}
                      className="heading"
                      classNames={{ size: 'lead', color: 'black' }}
                    >
                      {card.body}
                    </RouterLink>
                  ),
                }}
                imageSrc={card.image?.file?.url}
                description={card.body || ''}
              />
            ),
          )}
        </div>
      </div>

      <section className="row:steps-4col">
        <Heading className="-a-center -mb-400" size="large" color="black">
          {data?.hubVanPage.sections.steps?.heading}
        </Heading>
        {data?.hubVanPage.sections.steps?.steps?.map((step: StepData, idx) => (
          <Step
            key={step.title || idx}
            heading={step.title || ''}
            step={idx + 1}
            text={step.body || ''}
          />
        ))}
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            {data?.hubVanPage.sections.featured1?.title}
          </Heading>
          <Text tag="p" size="regular" color="darker">
            {data?.hubVanPage.sections.featured1?.body}
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
            data?.hubVanPage.sections.featured1?.image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      </section>

      <section className="row:featured-left">
        <div>
          <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
        </div>
        <div className="-inset -middle -col-400">
          <div>
            <Heading size="large" color="black">
              {data?.hubVanPage.sections.featured2?.title}
            </Heading>
            <Text tag="p" size="regular" color="darker">
              {data?.hubVanPage.sections.featured2?.body}
            </Text>
          </div>
        </div>
      </section>

      <hr className="fullWidth" />
      <section className="row:text">
        <Heading size="large" color="black">
          {data?.hubVanPage.sections.rowText?.heading}
        </Heading>
        <div>
          <Text tag="p" size="regular" color="darker">
            {data?.hubVanPage.sections.rowText?.body}
          </Text>
          <Heading size="regular" color="black">
            {data?.hubVanPage.sections.rowText?.subHeading}
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
        {data?.hubVanPage.sections.tiles?.tiles?.map((tile: TileData, idx) => (
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
        ))}
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

export default withApollo(VansPage, { getDataFromTree });
