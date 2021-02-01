import React, { FC, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../utils/getTitleTag';
import mapToReviewCard from './helpers';
import { ReviewsPageQuery_reviewsPage_sections as Sections } from '../../../generated/ReviewsPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const Tabs = dynamic(() => import('core/molecules/tabs'), {
  loading: () => <Skeleton count={1} />,
});
const Tab = dynamic(() => import('core/molecules/tabs/Tab'), {
  loading: () => <Skeleton count={1} />,
});
const TabList = dynamic(() => import('core/molecules/tabs/TabList'));
const TabPanel = dynamic(() => import('core/molecules/tabs/TabPanel'), {
  loading: () => <Skeleton count={1} />,
});
const TabPanels = dynamic(() => import('core/molecules/tabs/TabPanels'), {
  loading: () => <Skeleton count={3} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={3} />,
});
const ReviewCard = dynamic(
  () => import('core/molecules/cards/ReviewCard/ReviewCard'),
  {
    loading: () => <Skeleton count={3} />,
  },
);
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IProps {
  sections: Sections | null;
  title: string | null;
  body: string | null;
  breadcrumbsItems: any;
}

const VehicleReviewContainer: FC<IProps> = ({
  body,
  title,
  sections,
  breadcrumbsItems,
}) => {
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const expertName = sections?.vehicleReview?.author?.length
    ? sections?.vehicleReview?.author[0]?.name || ''
    : '';
  const expertMark = Number(sections?.vehicleReview?.rating || 0);

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      <div className="row:article">
        <article>
          <Tabs
            activeIndex={activeTab}
            onChange={index => setActiveTab(index)}
            key="tabs"
          >
            <TabPanels className="-p-000">
              <TabPanel index={0}>
                <Image
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  src={
                    sections?.vehicleReviewMedia?.reviewPhoto?.file?.url || ''
                  }
                />
              </TabPanel>
              <TabPanel index={1}>
                <div className="media">
                  <Media
                    responsive
                    src={sections?.vehicleReviewMedia?.reviewVideo || ''}
                    vimeoConfig={{ color: 'EC6408', portrait: false }}
                    className="media-player"
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </TabPanel>
            </TabPanels>
            <TabList className="lead">
              <Tab index={0}>Photo</Tab>
              <Tab index={1}>Video</Tab>
            </TabList>
          </Tabs>
          <div>
            <div className="markdown -mt-500" key="markdown">
              <ReactMarkdown
                allowDangerousHtml
                source={body || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </div>
            <div className="button-group">
              <RouterLink
                classNames={{ color: 'teal', size: 'regular' }}
                className="button"
                link={{
                  href: sections?.link?.legacyUrl || sections?.link?.url || '',
                  label: sections?.link?.text || '',
                }}
              >
                <div className="button--inner">{sections?.link?.text}</div>
              </RouterLink>
            </div>
          </div>
        </article>
        <div>
          <Heading tag="h2" color="black" size="lead">
            Expert Review
          </Heading>
          <ReviewCard
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            key="ExpertRevew"
            review={{
              text: sections?.vehicleReview?.summary || '',
              author: expertName,
              score: expertMark,
            }}
          />
          <Heading tag="h2" color="black" size="lead">
            Customer Reviews
          </Heading>
          {sections?.reviews?.reviews
            ?.slice(0, reviewsExpanded ? 10 : 2)
            .map((reviewTile, index) => (
              <ReviewCard
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={index.toString()}
                review={{ ...mapToReviewCard(reviewTile) }}
              />
            ))}
          <Button
            className="-fullwidth "
            color="teal"
            size="regular"
            fill="solid"
            label={reviewsExpanded ? 'Read Less Reviews' : 'Read More Reviews'}
            onClick={() => setReviewsExpanded(!reviewsExpanded)}
          />
          <hr className="-fullwidth -mv-500" />
          <Heading
            tag={
              getTitleTag(
                sections?.rowText?.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            color="black"
            size="large"
          >
            {sections?.rowText?.heading}
          </Heading>
          <RouterLink
            classNames={{ color: 'teal', solid: true, size: 'regular' }}
            className="button -fullwidth"
            link={{
              href:
                sections?.rowText?.link?.legacyUrl ||
                sections?.rowText?.link?.url ||
                '',
              label: sections?.rowText?.link?.text || '',
            }}
          >
            <div className="button--inner">{sections?.rowText?.link?.text}</div>
          </RouterLink>
        </div>
      </div>
    </>
  );
};

export default VehicleReviewContainer;
