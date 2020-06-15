import { NextPage } from 'next';
// import { useQuery } from '@apollo/client';
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
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';
import Step from '@vanarama/uibook/lib/components/molecules/step';
import IconList, {
  IconListItem,
} from '@vanarama/uibook/lib/components/organisms/icon-list';
import Price from '@vanarama/uibook/lib/components/atoms/price';

import Hero, { HeroTitle, HeroHeading } from '../../../components/Hero';
import DealOfMonth from '../../../components/DealOfMonth';
import RouterLink from '../../../components/RouterLink/RouterLink';
import withApollo from '../../../hocs/withApollo';

const VansPage: NextPage = () => (
  <>
    <Hero>
      <HeroHeading>Best Van Lease Deals</HeroHeading>
      <br />
      <HeroTitle>
        Brand New Vans, In Stock Delivered Fast and Free
        <b> From Just £115pm</b>
      </HeroTitle>
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
        src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png"
      />
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
      <div>
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Large Vans
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
            Small Vans
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
        {[
          'Small Vans',
          'Medium Vans',
          'Large Vans',
          'Pick Up Trucks',
          'Tippers/Lutons',
          'Mini Bus',
          'Refrigerated Vans',
          'Other Vans',
        ].map(v => (
          <Card
            key={v}
            title={{
              title: '',
              withBtn: true,
              link: (
                <RouterLink
                  link={{ href: '#', label: v }}
                  className="heading"
                  classNames={{ size: 'lead', color: 'black' }}
                >
                  {v}
                </RouterLink>
              ),
            }}
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/CitroenBerlingo0718_4_xjonps.jpg"
            description="Cillum laborum commodo esse eu elit exercitation ea commodo enim occaecat occaecat ipsum pariatur laboris"
          />
        ))}
      </div>
    </div>

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
          Van Leasing Deals UK
        </Heading>
        <Text tag="p" size="regular" color="darker">
          If you&apos;re looking to drive a brand new car, van or truck without
          any of the hassle - leasing might just be for you! It&apos;s
          affordable, simple and you&apos;re not left with a depreciating asset
          at the end of your contract.
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
    </section>
    <section className="row:features-4col">
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
    </section>

    <section className="row:text">
      <Heading size="large" color="black">
        Not Sure How Van Leasing Works?
      </Heading>
      <div>
        <Text tag="p" size="regular" color="darker">
          Leasing a Van is really simple. You drive a brand new vehicle and pay
          fixed monthly rentals over 2-5 years after paying an initial rental at
          the start of your contract. At the end of your agreement, you simply
          hand the van back and choose which vehicle to upgrade to.
        </Text>
        <Heading size="regular" color="black">
          Everything you need to know is a click away in our easy to understand
          leasing guide
        </Heading>
        <Button
          className="-pt-200"
          label="Veiw Leasing Guides"
          color="teal"
          fill="clear"
          size="regular"
        />
      </div>
    </section>

    <section className="row:features-4col">
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

export default withApollo(VansPage, { getDataFromTree });
