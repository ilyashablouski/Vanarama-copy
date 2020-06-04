import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
// import ReviewTile from '@vanarama/uibook/lib/components/organisms/review-tile';

const reviewTiles = [
  {
    name: 'John Smith',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    rating: 4.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    name: 'John Smith',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    rating: 4.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    name: 'John Smith',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    rating: 4.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
];

const CustomersReviews: FC = () => (
  <section className="section -bg-lighter">
    <div className="container">
      <Heading className="-mb-400 -a-center" size="large" color="black">
        Customer Reviews
      </Heading>
      <Slider className="-mh-auto" gutter={16}>
        {reviewTiles.map((reviewTile, index) => (
          <div key={index.toString()} style={{ width: 345 }}>
            <div />
            {/* TODO: ReviewTile seems to have been deleted. Needs fixing */}
            {/* <ReviewTile
              name={reviewTile.name}
              description={reviewTile.description}
              timeStamp={reviewTile.timeStamp}
              reviews={reviewTile.reviews}
              src={reviewTile.src}
              rating={reviewTile.rating}
            /> */}
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

export default CustomersReviews;
