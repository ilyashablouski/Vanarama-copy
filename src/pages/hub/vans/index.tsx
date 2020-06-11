import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Media from '@vanarama/uibook/lib/components/atoms/media';
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
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Price from '@vanarama/uibook/lib/components/atoms/price';

import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import DealOfMonth from '../../../components/DealOfMonth';
import RouterLink from '../../../components/RouterLink/RouterLink';

const VansPage: NextPage = () => (
  <div>
    <Hero>
      <HeroHeading>Vans Hub Page</HeroHeading>
      <br />
      <HeroTitle>
        Drive Your Dream Vehicle For
        <br /> Less With Vanarama
      </HeroTitle>
    </Hero>
    <div className="row:lead-text">
      <Heading size="xlarge" color="black">
        Large Sales Heading
      </Heading>
      <Text tag="span" size="lead" color="darker">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        aspernatur fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
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
      <div className="container">
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Van Special Offers
          </span>
        </Heading>
        <Slider className="-mh-auto" gutter={16}>
          {[1, 2, 3, 4, 5].map(k => (
            <div key={k.toString()} style={{ width: 345 }}>
              <ProductCard
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
            </div>
          ))}
        </Slider>
        <div className="-justify-content-row -pt-500">
          <Button label="View All Vans" color="teal" />
        </div>
      </div>
    </div>

    <div className="row:bg-lighter ">
      <div className="container">
        <div className="-a-center">
          <Heading size="large" color="black">
            What Type Of Van Do You Need?
          </Heading>
          <Text
            className="-justify-content-row -mb-400"
            tag="p"
            size="regular"
            color="darker"
          >
            Choose from Small, Medium and Large vans, or Tippers/Lutons,
            Crew/Minibus, Pickups and Refrigerated Vans - whatever you need,
            we&apos;ve got it.
          </Text>
        </div>
        <div className="row:cards-4col">
          <Card
            className="-a-center"
            title={{ title: 'Small Vans' }}
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg"
            description="Get the car you want from our range of manufacturers - from something sporty to something for all the family"
          >
            <Button label="Search Vans" color="teal" fill="solid" />
          </Card>
          <Card
            className="-a-center"
            title={{ title: 'Large Vans' }}
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg"
            description="Get the car you want from our range of manufacturers - from something sporty to something for all the family"
          >
            <Button label="Search Vans" color="teal" fill="solid" />
          </Card>
          <Card
            className="-a-center"
            title={{ title: 'Medium Vans' }}
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg"
            description="Get the car you want from our range of manufacturers - from something sporty to something for all the family"
          >
            <Button label="Search Vans" color="teal" fill="solid" />
          </Card>
          <Card
            className="-a-center"
            title={{ title: 'Other Vans' }}
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg"
            description="Get the car you want from our range of manufacturers - from something sporty to something for all the family"
          >
            <Button label="Search Vans" color="teal" fill="solid" />
          </Card>
        </div>
      </div>
    </div>

    <div className="row:steps-3col">
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
    </div>

    <div className="row:featured-right">
      <div className="-inset -middle">
        <div style={{ padding: '1rem' }}>
          <Heading size="large" color="black">
            Why Leasing ?
          </Heading>
          <Text tag="p" size="regular" color="darker">
            If you&apos;re looking to drive a brand new car, van or truck
            without any of the hassle - leasing might just be for you! It&apos;s
            affordable, simple and you&apos;re not left with a depreciating
            asset at the end of your contract.
          </Text>
          <IconList>
            <IconListItem iconColor="orange">
              Choose your contract length &amp; agreed mileage
            </IconListItem>
            <IconListItem iconColor="orange">
              Pay an initial payment
            </IconListItem>
            <IconListItem iconColor="orange">
              Set up your agreed fixed monthly rental
            </IconListItem>
          </IconList>
        </div>
      </div>
      <div>
        <div className="player-wrapper">
          <Media
            responsive
            src="https://player.vimeo.com/video/263419265"
            vimeoConfig={{ color: 'EC6408', portrait: false }}
            className="media-player"
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
    <div className="row:featured-left">
      <div>
        <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
      </div>
      <div className="-inset -middle -col-400">
        <div>
          <Heading size="large" color="black">
            Why Choose Vanarama For Your Van?
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
    </div>
    <div className="row:features-4col">
      <div>
        <Image
          size="expand"
          src="https://source.unsplash.com/collection/2102317/1000x650?sig=403410"
        />
        <Heading className="-mt-300" size="lead" color="black">
          Hard Tops
        </Heading>
        <Text tag="p" size="regular" color="darker">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          provident magni quaerat, culpa repudiandae minima quo nobis error
          laboriosam ipsa.
        </Text>
      </div>
      <div>
        <Image
          size="expand"
          src="https://source.unsplash.com/collection/2102317/1000x650?sig=4034228"
        />
        <Heading className="-mt-300" size="lead" color="black">
          Bed Liners
        </Heading>
        <Text tag="p" size="regular" color="darker">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          provident magni quaerat, culpa repudiandae minima quo nobis error
          laboriosam ipsa.
        </Text>
      </div>
      <div>
        <Image
          size="expand"
          src="https://source.unsplash.com/collection/2102317/1000x650?sig=403422"
        />
        <Heading className="-mt-300" size="lead" color="black">
          Storage Systems
        </Heading>
        <Text tag="p" size="regular" color="darker">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          provident magni quaerat, culpa repudiandae minima quo nobis error
          laboriosam ipsa.
        </Text>
      </div>
      <div>
        <Image
          size="expand"
          src="https://source.unsplash.com/collection/2102317/1000x650?sig=403418"
        />
        <Heading className="-mt-300" size="lead" color="black">
          Roller Covers
        </Heading>
        <Text tag="p" size="regular" color="darker">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          provident magni quaerat, culpa repudiandae minima quo nobis error
          laboriosam ipsa.
        </Text>
      </div>
    </div>
    <div className="row:text">
      <div className="container">
        <div>
          <div className="-col-300">
            <Heading className="-mb-300" size="large" color="black">
              Not Sure How Van Leasing Works?
            </Heading>
            <Text tag="p" size="regular" color="darker">
              Leasing a Van is really simple. You drive a brand new vehicle and
              pay fixed monthly rentals over 2-5 years after paying an initial
              rental at the start of your contract. At the end of your
              agreement, you simply hand the van back and choose which vehicle
              to upgrade to.
            </Text>
            <Text className="-mt-500" tag="p" size="regular" color="black">
              <b>
                Everything you need to know is a click away in our easy to
                understand leasing guide
              </b>
            </Text>
            <Button
              className="-mt-100"
              label="Veiw Leasing Guides"
              color="teal"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="row:features-4col">
      <div>
        <Tile className="-plain -button -align-center">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              className="-inline"
              round
              size="large"
              src="https://source.unsplash.com/collection/2102317/1000x650?sig=403420"
            />
          </div>
          <a className="tile--link" href="##">
            <Heading tag="span" size="regular" color="black">
              Price Protection
            </Heading>
          </a>
          <Text tag="p">
            Pretium facilisi etiam pretium, cras interdum enim, nullam.
          </Text>
        </Tile>
      </div>
      <div>
        <Tile className="-plain -button -align-center">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              className="-inline"
              round
              size="large"
              src="https://source.unsplash.com/collection/2102317/1000x650?sig=403411"
            />
          </div>
          <a className="tile--link" href="##">
            <Heading tag="span" size="regular" color="black">
              Customer Reviews
            </Heading>
          </a>
          <Text tag="p">
            Pretium facilisi etiam pretium, cras interdum enim, nullam.
          </Text>
        </Tile>
      </div>
      <div>
        <Tile className="-plain -button -align-center">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              className="-inline"
              round
              size="large"
              src="https://source.unsplash.com/collection/2102317/1000x650?sig=403424"
            />
          </div>
          <a className="tile--link" href="##">
            <Heading tag="span" size="regular" color="black">
              Quote Online
            </Heading>
          </a>
          <Text tag="p">
            Pretium facilisi etiam pretium, cras interdum enim, nullam.
          </Text>
        </Tile>
      </div>
      <div>
        <Tile className="-plain -button -align-center">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              className="-inline"
              round
              size="large"
              src="https://source.unsplash.com/collection/2102317/1000x650?sig=403445"
            />
          </div>
          <a className="tile--link" href="##">
            <Heading tag="span" size="regular" color="black">
              Confused About Leasing?
            </Heading>
          </a>
          <Text tag="p">
            Pretium facilisi etiam pretium, cras interdum enim, nullam.
          </Text>
        </Tile>
      </div>
    </div>

    <div className="row:manufacturer-grid">
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
    </div>

    <div className="row:league">
      <League altText="vanarama national league" />
    </div>

    {/* <LogoRow
      className="-bg-lighter"
      urls={[
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
          label: 'dailymirror',
          href:
            'https://www.vanarama.com/Assets/images-optimised/home/featured/dailymail.png',
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
      ]}
    /> */}

    <div className="row:trustpilot">
      <TrustPilot src="https://widget.trustpilot.com/trustboxes/53aa8912dec7e10d38f59f36/index.html?templateId=53aa8912dec7e10d38f59f36&amp;businessunitId=594a982f0000ff0005a50d80#locale=en-GB&amp;styleHeight=130px&amp;styleWidth=100%25&amp;theme=light&amp;stars=4%2C5&amp;schemaType=Organization" />
    </div>
  </div>
);

export default VansPage;
