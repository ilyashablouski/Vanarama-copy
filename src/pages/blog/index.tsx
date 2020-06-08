import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';

const BlogPage: NextPage = () => (
  <>
    <div className="row:title">
      <BreadCrumbs />
      <Heading tag="h1" size="xlarge" color="black">
        Blog Archive Page
      </Heading>
    </div>
    <div className="row:featured-left">
      <Image
        size="expand"
        src="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/KiaProceed0219_4_bpoxte.jpg"
      />
      <div>
        <Heading tag="span" size="large" color="black">
          Featured Article Title
        </Heading>
        <Text tag="p" size="lead" color="darker">
          Reprehenderit veniam minim id laboris commodo id laboris minim enim
          consequat adipisicing proident adipisicing exercitation
        </Text>
        <Text tag="p" size="regular" color="darker">
          Do enim nulla consectetur non tempor pariatur eu excepteur elit ea
          consectetur duis magna reprehenderit incididunt duis esse culpa ex ea
          qui et adipisicing incididunt nisi eiusmod excepteur nisi est
        </Text>
        <Text tag="p" size="regular" color="darker">
          Velit fugiat ea eu excepteur nisi et ut duis minim labore pariatur est
          eiusmod cupidatat ea consectetur occaecat pariatur officia
        </Text>
        <Button color="teal" size="regular" fill="clear" label="Read More" />
      </div>
    </div>
    <div className="row:bg-lighter -col-300">
      <Heading className="-a-center" tag="h3" size="large" color="black">
        Top Articles
      </Heading>
      <Slider className="-mh-auto" slidesToShow={3} gutter={16}>
        {[1, 2, 3, 4, 5].map(k => (
          <div key={k.toString()} style={{ width: 394 }}>
            <Card className="card__article">
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
          </div>
        ))}
      </Slider>
    </div>
    <div className="row:bg-lighter">
      <div className="row:cards-3col">
        <Heading size="large" color="black">
          Category Title
        </Heading>
        {[1, 2, 3, 4, 5, 6].map(v => (
          <div key={v.toString()}>
            <Card className="card__category">
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
                  size="xsmall"
                  color="teal"
                  fill="solid"
                  round
                  icon={<ArrowForwardSharp />}
                  iconColor="white"
                  iconPosition="after"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default BlogPage;
