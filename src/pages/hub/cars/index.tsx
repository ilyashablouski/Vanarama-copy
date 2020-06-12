import { getDataFromTree } from '@apollo/react-ssr';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import EligibiltyScore from '@vanarama/uibook/lib/components/atoms/score';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import League from '@vanarama/uibook/lib/components/organisms/league';
import { NextPage } from 'next';
import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import ProductCard from '../../../components/ProductCard/ProductCard';
import RouterLink from '../../../components/RouterLink/RouterLink';
import withApollo from '../../../hocs/withApollo';

export const CarsPage: NextPage = () => {
  return (
    <>
      <Hero>
        <HeroHeading>Best Car Lease Deals</HeroHeading>
        <br />
        <HeroTitle>
          Brand New Vans, In Stock Delivered Fast and Free
          <b> From Just £115pm</b>
        </HeroTitle>
        <br />
        <Image
          className="hero--image"
          plain
          size="expand"
          src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Audi-Hero-Image-removebg-preview.png"
        />
      </Hero>

      <section className="row:lead-text">
        <Heading size="xlarge" color="black">
          Large Sales Heading
        </Heading>
        <Text tag="span" size="lead" color="darker">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          aspernatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </Text>
      </section>

      <section className="row:eligibility-checker-cta">
        <div>...choiceboxes</div>
        <div>
          <EligibiltyScore score={75} />
          <Heading size="large" color="black">
            Check Your Eligibility For A New Car Lease
          </Heading>
          <Button
            label="Check My Eligibility"
            size="lead"
            fill="solid"
            color="teal"
          />
        </div>
        <div>
          <Image
            src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Help-Me-Choose2.jpg"
            plain
            size="expand"
          />
          <Heading size="large" color="black">
            Not Sure Which Vehicle Is Best For You?
          </Heading>
          <Button
            label="Help Me Choose"
            size="lead"
            fill="solid"
            color="teal"
          />
        </div>
      </section>

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
            onViewOffer={() => true}
            onWishlist={() => true}
            price={209}
            priceDescription="Per Month Exc.VAT"
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
          />
        ))}

        <Button label="View All Cars" size="large" color="teal" />
      </section>

      <section className="row:steps-3col">
        <Heading className="-a-center -mb-400" size="large" color="black">
          Leasing - The Simple Way To Get Your Brand New Car
        </Heading>
        <Step
          heading="Choose"
          step={1}
          text="Get the car you want from our range of manufacturers - from something sporty to something for all the family."
        />
        <Step
          heading="Apply"
          step={2}
          text="To lease your new car, we'll just need a few details to apply for finance from one of our funding partners."
        />
        <Step
          heading="Drive"
          step={3}
          text="And that's it - once you've been approved, your brand new car will be delivered direct to your door."
        />
      </section>

      <section className="row:featured-right">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            Car Leasing With Vanarama?
          </Heading>
          <Text tag="p" size="regular" color="darker">
            If you&apos;re looking to drive a brand new car, van or truck
            without any of the hassle - leasing might just be for you! It&apos;s
            affordable, simple and you&apos;re not left with a depreciating
            asset at the end of your contract.
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
        <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
      </section>

      <section className="row:featured-left">
        <div>
          <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
        </div>
        <div className="-inset -middle -col-400">
          <div>
            <Heading size="large" color="black">
              How Does Car Leasing Work?
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Vanarama is more than just a broker or leasing company, we&apos;ve
              been leading the market and putting our customers at the heart of
              everything we do for more than a decade.
              <br /> After 15 years of experience in business & personal van,
              pickup and car leasing, we&apos;re still pushing the industry
              forward & our vast buying power gives us access to a range of
              vehicles and lease deal pricing you can&apos;t get anywhere else.
            </Text>
          </div>
        </div>
      </section>

      <section className="row:features-4col">
        {[
          'Price Protection',
          'Customer Reviews',
          'Quote On line',
          'Confused About Leasing?',
        ].map(t => (
          <div key={t}>
            <Tile className="-plain -button -align-center" plain>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  inline
                  round
                  size="large"
                  src="https://source.unsplash.com/collection/2102317/1000x650?sig=403411"
                />
              </div>
              <a className="tile--link" href="##">
                <Heading tag="span" size="regular" color="black">
                  {t}
                </Heading>
              </a>
              <Text tag="p">
                Pretium facilisi etiam pretium, cras interdum enim, nullam.
              </Text>
            </Tile>
          </div>
        ))}
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

export default withApollo(CarsPage, { getDataFromTree });
