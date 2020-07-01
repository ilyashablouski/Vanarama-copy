import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';
import RouterLink from '../../components/RouterLink/RouterLink';

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
      <Carousel className="-mh-auto" countItems={5}>
        {[1, 2, 3, 4, 5].map(k => (
          <Card
            key={k.toString()}
            className="card__article"
            imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg"
            title={{
              title: '',
              link: (
                <RouterLink
                  link={{ href: '#', label: 'Article Name' }}
                  className="card--link"
                  classNames={{ color: 'black', size: 'regular' }}
                />
              ),
            }}
            description="Lorem ipsum dolor sit amet adipisicing elit. Iste, quaerat consequatur sapiente sed."
          >
            <Button
              label="Read More"
              color="teal"
              size="small"
              fill="solid"
              className="-mt-400"
            />
          </Card>
        ))}
      </Carousel>
    </div>
    <div className="row:bg-lighter">
      <div className="row:cards-3col">
        <Heading size="large" color="black">
          Category Title
        </Heading>
        {[1, 2, 3, 4, 5, 6].map(v => (
          <div key={v.toString()}>
            <Card
              className="card__category"
              imageSrc="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ70719_2_kk0b0n.jpg"
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{ href: '#', label: 'Category Name' }}
                    className="card--link"
                    classNames={{ color: 'black', size: 'regular' }}
                  />
                ),
                withBtn: true,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </>
);

export default BlogPage;
