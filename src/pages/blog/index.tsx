import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Slider from '@vanarama/uibook/lib/components/organisms/slider';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';

const BlogPage: NextPage = () => (
  <>
    <section className="section -pb-500 -bg-white">
      <div className="container">
        <Grid className="-pb-400" lg="6" md="2" sm="2">
          <Column md="row">
            <BreadCrumbs />
          </Column>
          <Column className="-mb-400 -col-400" md="row">
            <Heading size="xlarge" color="black">
              Blog Archive Page
            </Heading>
          </Column>
          <Column md="3">
            <Image
              size="expand"
              src="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaProceed0219_4_bpoxte.jpg"
            />
          </Column>
          <Column className="-inset -middle -col-400" md="3">
            <div className="-col-400">
              <Heading tag="span" size="large" color="black">
                Featured Article Title
              </Heading>
              <Text tag="span" size="regular" color="darker">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Habitant morbi tristique senectus et netus et malesuada fames
                ac. Ultricies mi quis hendrerit dolor. Vestibulum lorem sed
                risus ultricies tristique nulla aliquet enim. Ut tellus
                elementum sagittis vitae et.
              </Text>
            </div>
            <Button
              color="teal"
              size="regular"
              fill="clear"
              label="Read More"
            />
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section -pb-500 -pt-500">
      <div className="container">
        <Heading size="large" color="black">
          <span
            style={{ textAlign: 'center', display: 'block' }}
            className="-mb-400"
          >
            Top Articles
          </span>
        </Heading>
        <Slider className="-mh-auto" gutter={16}>
          {[1, 2, 3, 4, 5].map(k => (
            <div key={k} style={{ width: 345 }}>
              <Card className="-a-left">
                <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg" />
                <div className="-p-300 -col-100">
                  <Heading
                    tag="a"
                    size="regular"
                    color="black"
                    className="card--link"
                  >
                    Article Name
                  </Heading>
                  <CardContent>
                    <Text tag="div" size="small" color="darker">
                      GLorem ipsum dolor sit amet adipisicing elit. Iste,
                      quaerat consequatur sapiente sed.
                    </Text>
                    <Button
                      label="Read More"
                      color="teal"
                      size="small"
                      fill="solid"
                      className="-mt-400"
                    />
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    <section className="section -pb-500 -pt-500 -bg-white">
      <div className="container">
        <Grid lg="6" md="2" sm="2" className="-pb-400 -pt-400">
          <Column className="-center" md="row">
            <Heading size="large" color="black">
              Category Title
            </Heading>
          </Column>
          {[1, 2, 3, 4, 5, 6].map(v => (
            <Column md="2" key={v}>
              <Card>
                <CardMedia imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg" />
                <CardContent flex className="-p-300">
                  <Heading
                    tag="a"
                    size="regular"
                    color="black"
                    className="card--link"
                  >
                    Category Name
                  </Heading>
                  <Button
                    label=""
                    size="regular"
                    color="teal"
                    fill="clear"
                    round
                    icon={<ArrowForwardSharp />}
                    iconPosition="after"
                  />
                </CardContent>
              </Card>
            </Column>
          ))}
        </Grid>
      </div>
    </section>
  </>
);

export default BlogPage;
