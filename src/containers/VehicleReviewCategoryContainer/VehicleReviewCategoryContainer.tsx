import React, { FC, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import { ReviewsHubCategoryQuery_genericPage_sections as Sections } from '../../../generated/ReviewsHubCategoryQuery';
import { getMarkdownRenderers } from './Utils';

interface IProps {
  sections: Sections | null;
  title: string | null;
  body: string | null;
  crumbs: { href: string; label: string }[];
}

const VehicleReviewCategoryContainer: FC<IProps> = ({
  body,
  title,
  sections,
  crumbs,
}) => {
  const [reviewsExpanded, setReviewsExpanded] = useState(12);
  const router = useRouter();

  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
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
      {sections?.cards?.cards?.length && (
        <>
          <div className="row:cards-3col -pt-300">
            {sections.cards?.cards
              .slice(0, reviewsExpanded)
              .map((reviewCard, idx) => (
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
              ))}
          </div>
          <div className="pagination">
            {sections?.cards.cards.length > reviewsExpanded && (
              <Button
                color="teal"
                fill="outline"
                label="Load More"
                onClick={() => {
                  setReviewsExpanded(reviewsExpanded + 12);
                }}
                size="regular"
                dataTestId="LoadMore"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default VehicleReviewCategoryContainer;
