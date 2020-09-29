import React, { FC, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Pagination from '@vanarama/uibook/lib/components/atoms/pagination';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import {
  ReviewsHubCategoryQuery_genericPage_sections as Sections,
  ReviewsHubCategoryQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/ReviewsHubCategoryQuery';
import { getMarkdownRenderers } from './Utils';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { getSectionsData } from '../../utils/getSectionsData';

interface IProps {
  sections: Sections | null;
  title: string | null;
  body: string | null;
}

const VehicleReviewCategoryContainer: FC<IProps> = ({
  body,
  title,
  sections,
}) => {
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();
  const cards = getSectionsData(['cards', 'cards'], sections);

  const countPages = () => Math.ceil((cards.length || 0) / 12);

  // create array with number of page for pagination
  const pages = [...Array(countPages())].map((_el, i) => i + 1);

  const renderCards = () => {
    const indexOfLastOffer = activePage * 12;
    const indexOfFirstOffer = indexOfLastOffer - 12;
    // we get the right amount of cards for the current page
    const showCards = (cards as Cards[])
      .slice()
      .slice(indexOfFirstOffer, indexOfLastOffer);
    return showCards?.map((reviewCard, idx) => (
      <Card
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
        <Breadcrumb />
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
