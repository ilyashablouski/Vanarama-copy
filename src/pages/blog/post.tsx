import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import { Grid, Column } from '@vanarama/uibook/lib/components/molecules/grid';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';

const BlogPost: NextPage = () => (
  <>
    <section className="section -pb-500 ">
      <div className="container">
        <Grid className="-pb-400" lg="6" md="2" sm="2">
          <Column md="row">
            <BreadCrumbs />
          </Column>
          <Column className="-mb-400 -col-400" md="row">
            <Heading size="xlarge" color="black">
              Blog Post
            </Heading>
          </Column>
        </Grid>
      </div>
    </section>
    <section className="-pt-000 -pb-000 -bg-lighter">
      <div className="container">
        <Grid className="-pt-000 -pb-000 -bg-lighter" lg="6" md="2" sm="2">
          <Column md="row" className="-a-center">
            <Image
              size="expand"
              src="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg"
            />
          </Column>
        </Grid>
      </div>
    </section>
    <section className="section -pt-500 -pb-500">
      <div className="container">
        <Grid lg="6" md="2" sm="2">
          <Column className="-col-400 -inset" md="4">
            <Text size="lead" color="darker">
              Accusamus reprehenderit ad illum aliquam, accusantium sed sapiente
              in similique veniam iusto, expedita ut facere illo modi
              praesentium sint nesciunt odio debitis!
            </Text>
          </Column>
          <Column className="-col-400 -inset" md="2">
            <Heading size="lead" color="black">
              Related Articles
            </Heading>
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
                    GLorem ipsum dolor sit amet adipisicing elit. Iste, quaerat
                    consequatur sapiente sed.
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
          </Column>
        </Grid>
      </div>
    </section>
  </>
);

export default BlogPost;
