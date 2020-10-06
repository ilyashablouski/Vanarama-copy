import React, { FC, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import {
  ReviewsHubCategoryQuery,
  ReviewsHubCategoryQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/ReviewsHubCategoryQuery';
import { getMarkdownRenderers } from './Utils';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  data: ReviewsHubCategoryQuery | undefined;
}

const VehicleReviewCategoryContainer: FC<IProps> = ({ data }) => {
  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );

  const [activePage, setActivePage] = useState(1);
  const router = useRouter();

  const countPages = () => Math.ceil((cards.length || 0) / 12);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const renderCards = () => {
    const indexOfLastOffer = activePage * 12;
    const indexOfFirstOffer = indexOfLastOffer - 12;
    // we get the right amount of cards for the current page
    const showCards = (cards as Cards[]).slice(
      indexOfFirstOffer,
      indexOfLastOffer,
    );
    return showCards?.map((reviewCard, idx) => (
      <Card
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        key={idx.toString()}
        title={{
          title: reviewCard.title || '',
          score: Number(reviewCard.reviewRating) || 0,
        }}
        description={reviewCard.body || ''}
        imageSrc={reviewCard.image?.file?.url || ''}
      >
        <Button
          color="teal"
          size="small"
          fill="clear"
          type="button"
          label="Read Review >"
          onClick={() => {
            router.push(reviewCard.link?.url || '#');
          }}
        />
      </Card>
    ));
  };

  return (
    <>
      <div className="row:title">
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      <div className="row:text -columns">
        <div>
          <ReactMarkdown
            source={body || ''}
            renderers={getMarkdownRenderers()}
          />
        </div>
      </div>
      {cards.length && (
        <>
          <div className="row:cards-3col -pt-300">{renderCards()}</div>
          <div className="row:pagination">
            <Pagination
              path=""
              pages={pages}
              onClick={el => {
                el.preventDefault();
                setActivePage(+(el.target as Element).innerHTML);
              }}
              onClickBackArray={el => {
                el.preventDefault();
                setActivePage(activePage - 1);
              }}
              onClickNextArray={el => {
                el.preventDefault();
                setActivePage(activePage + 1);
              }}
              selected={activePage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default VehicleReviewCategoryContainer;
