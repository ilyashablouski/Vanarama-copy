import { NextPage } from 'next';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import Slider from '@vanarama/uibook/lib/components/organisms/slider';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import ProductCard from '@vanarama/uibook/lib/components/organisms/product-card';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import BluetoothSharp from '@vanarama/uibook/lib/assets/icons/BluetoothSharp';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import CheckmarkCircleSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp';
import CompassSharp from '@vanarama/uibook/lib/assets/icons/CompassSharp';
import SnowSharp from '@vanarama/uibook/lib/assets/icons/SnowSharp';
import WifiSharp from '@vanarama/uibook/lib/assets/icons/WifiSharp';
import Flame from '@vanarama/uibook/lib/assets/icons/Flame';

const styles = {
  hero: {
    backgroundImage: 'linear-gradient(150deg, #f3f5f7, #d5dce2)',
    backgroundColor: '#f3f5f7',
  },
  heroFlag: {
    maxWidth: 'max-content',
    padding: '.25ch 2ch .25ch 1ch',
    background: '#ec6409',
    clipPath: 'polygon(100% 0, calc(100% - 1ch) 50%, 100% 100%, 0 100%, 0 0)',
  },
  iconList: {
    marginTop: '1rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  iconListFirstLi: {
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  iconListLi: {
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
    borderTop: ' 1px solid #e7ebee',
    display: 'flex',
    alignItems: 'center',
  },
};

const tabs = [{ label: 'Vans' }, { label: 'Pickups' }, { label: 'Cars' }];

const HomePage: NextPage = () => (
  <main>
    <div className="hero" style={styles.hero}>
      <div
        className="container"
        style={{ paddingTop: '6vh', paddingBottom: '6vh' }}
      >
        <Grid lg="6" md="2" sm="2">
          <Column sm="row" md="1" lg="4">
            <div className="hero--flag" style={styles.heroFlag}>
              <Heading size="small" color="white">
                Over 100,000 Vehicles Leased
              </Heading>
            </div>
            <div className="hero--title -distribute-content">
              <Heading size="xlarge" color="black">
                The Vehicle Leasing Experts
              </Heading>
              <br />
              <Text size="large" color="darker">
                Drive Your Dream Vehicle For
                <br /> Less With Vanarama
              </Text>
            </div>
            <Image
              className="hero--image"
              plain
              size="expand"
              src="https://www.vanarama.com/Assets/images-optimised/home/vanilla/Vehicle-Hero-Image.png"
            />
          </Column>
          <Column className="-inset" sm="row" md="1" lg="2">
            <div className="hero--search">...</div>
          </Column>
        </Grid>
      </div>
      {/*       <svg
        id="hero--curve"
        className="hero--curve"
        data-name="curve"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 170.2"
      >
        <path
          className="hero--curve-background"
          d="M0,65.16v107H1920V113.35s-271.62,32.89-625.91,42.9C925.77,179.08,394.27,183,0,65.16Z"
          transform="translate(0 -2)"
        />
        <path
          className="hero--curve-foreground"
          d="M0,2V64.75c394.27,117.82,925.77,113.92,1294.09,91.08C874,167.71,337.57,147.42,0,2Z"
          transform="translate(0 -1)"
        />
      </svg>
      <svg
        id="hero--curve-m"
        className="hero--curve-m"
        data-name="curve"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 65.05"
      >
        <path
          style={{ fill: '#f3f5f7' }}
          className="hero--curve-foreground"
          d="M0,1.81v35c122.83,16.41,249.92,25.7,375,30V47.6C246.33,38.57,119.07,24,0,1.81Z"
          transform="translate(0 -1)"
        />
        <path
          style={{ fill: '#44596a' }}
          className="hero--curve-background"
          d="M0,66.86H375c-125.08-4.32-252.17-13.61-375-30Z"
          transform="translate(0 -1.81)"
        />
      </svg> */}
    </div>
    <section className="section">
      <div className="container">
        <Heading size="large" color="black">
          <span style={{ textAlign: 'center', display: 'block' }}>
            Hot Deals
          </span>
        </Heading>
        <Tabs active={0} tabs={tabs}>
          <div>
            <Slider className="" gutter={16}>
              {[1, 2, 3, 4, 5].map(k => (
                <div key={k} style={{ width: 345 }}>
                  <ProductCard
                    flag={{
                      accentIcon: <Icon icon={<Flame />} color="white" />,
                      accentText: 'Hot Deal',
                      text: 'In Stock - 14-21 Days Delivery',
                    }}
                    href="#"
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
                    rating={4.5}
                    subtitle="1.0 IG-T 100 Tekna 5dr Xtronic [Leather]"
                    title="Peugeot 208"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div>2</div>
          <div>3</div>
        </Tabs>
      </div>
    </section>
    <section style={{ background: '#f3f5f7' }} className="section">
      <div className="container">
        <Grid lg="3" md="1" sm="1">
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
          <Column md="1">
            <Card>
              <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
              <CardContent flex>
                <Heading tag="a" size="regular" color="black">
                  Vans
                </Heading>
                <Button
                  label=""
                  size="large"
                  color="teal"
                  fill="clear"
                  round
                  icon={<ArrowForwardSharp />}
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column className="-inset -middle" md="3">
            <div style={{ padding: '1rem' }}>
              <Heading size="large" color="black">
                Why Leasing ?
              </Heading>
              <Text tag="p" size="regular" color="darker">
                If you&apos;re looking to drive a brand new car, van or truck
                without any of the hassle - leasing might just be for you!
                It&apos;s affordable, simple and you&apos;re not left with a
                depreciating asset at the end of your contract.
              </Text>
              <ul className="icon-list -orange" style={styles.iconList}>
                <li style={styles.iconListFirstLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Choose your contract length &amp; agreed mileage
                </li>
                <li style={styles.iconListLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Pay an initial payment
                </li>
                <li style={styles.iconListLi}>
                  <Icon icon={<CheckmarkCircleSharp />} color="orange" />
                  &nbsp;&nbsp;Set up your agreed fixed monthly rental
                </li>
              </ul>
            </div>
          </Column>
          <Column md="3">
            <Media
              src="https://player.vimeo.com/video/263419265"
              vimeoConfig={{ color: 'EC6408', portrait: false }}
            />
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column md="3">
            <Image src="https://source.unsplash.com/collection/2102317/1000x650?sig=40349" />
          </Column>
          <Column className="-inset -middle" md="3">
            <div
              style={{
                height: '100%',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Heading size="large" color="black">
                What Makes Us The Lease Experts?
              </Heading>
              <Text tag="p" size="regular" color="darker">
                Vanarama is more than just a broker or leasing company,
                we&apos;ve been leading the market and putting our customers at
                the heart of everything we do for more than a decade.
                <br /> After 15 years of experience in business & personal van,
                pickup and car leasing, we&apos;re still pushing the industry
                forward & our vast buying power gives us access to a range of
                vehicles and lease deal pricing you can&apos;t get anywhere
                else.
              </Text>
            </div>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section">5</section>
    <section className="league section">6</section>
    <section className="logo-row section">7</section>
    <section className=" trust-pilot section">8</section>
  </main>
);

export default HomePage;
