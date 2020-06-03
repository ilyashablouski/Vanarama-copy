import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Card, {
  CardContent,
  CardMedia,
} from '@vanarama/uibook/lib/components/molecules/card';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';

const BlogPost: NextPage = () => (
  <>
    <div className="row:title">
      <BreadCrumbs />
      <Heading tag="h1" size="xlarge" color="black">
        Blog Post
      </Heading>
    </div>
    <div className="row:bg-black -compact">
      <div className="row:featured-image">
        <Image
          size="expand"
          src="https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538983/cars/BMWX70419_4_bvxdvu.jpg"
        />
        <Text tag="span" size="regular" color="inherit" className="-caption">
          Photo credit — Jocelyn Bell Burnell
        </Text>
      </div>
    </div>
    <div className="row:article">
      <article className="markdown">
        <b>
          While 2020 has been a strange year, vans &amp; pickup trucks are still
          being bought &amp; leased. The people who use them - tradespeople,
          delivery drivers, cleaners &amp; more - are keeping the UK&apos;s
          wheels turning, so now is an especially interesting time to find out
          from Vanarama&apos;s Tom Roberts which vans &amp; pickup trucks are
          the top 10 best selling of 2020 so far.
        </b>
        <p>
          At the beginning of the year, the Society of Motor Manufacturers &amp;
          Traders (SMMT) were feeling confident that the UK&apos;s light
          commercial vehicle (LCV) market would see the registration of 348,000
          vans in 2020. Now, with the Covid-19 outbreak locking the trade down,
          that figure has changed to 263,000.
        </p>
        <hr />
        <h2>Lorem Ipsum Dolor Sit Amet Consectetur</h2>
        <a href="https://youtu.be/QYdWYha0w0E">https://youtu.be/QYdWYha0w0E</a>
        <p>
          At the beginning of the year, the Society of Motor Manufacturers &amp;
          Traders (SMMT) were feeling confident that the UK&apos;s light
          commercial vehicle (LCV) market would see the registration of 348,000
          vans in 2020. Now, with the Covid-19 outbreak locking the trade down,
          that figure has changed to 263,000.
        </p>
      </article>
      <div>
        <Heading tag="span" size="large" color="black">
          Related Articles
        </Heading>
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
    </div>
  </>
);

export default BlogPost;
