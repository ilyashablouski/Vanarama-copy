import { FC } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Slider from '@vanarama/uibook/lib/components/organisms/carousel';
import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';

const REVIEW_TILES = [
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 4,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 2.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
  {
    author: 'John Smith',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing ipsum dolor sit amet.',
    timeStamp: '12/02/2020',
    reviews: 87,
    score: 4.5,
    src: 'https://www.thispersondoesnotexist.com/image',
  },
];

const CustomersReviews: FC = () => (
  <div className="row:bg-lighter ">
    <div className="row:carousel">
      <Heading className="-mb-400 -a-center" size="large" color="black">
        Customer Reviews
      </Heading>
      <Slider className="-mh-000" slidesToShow={3} gutter={16}>
        {REVIEW_TILES.map((reviewTile, index) => (
          <div key={index.toString()} style={{ width: 345 }}>
            <ReviewCard review={{ ...reviewTile }} />
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default CustomersReviews;
