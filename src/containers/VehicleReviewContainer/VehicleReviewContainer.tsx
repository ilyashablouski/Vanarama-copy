import React, { FC, useState } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import BreadCrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import ReactMarkdown from 'react-markdown';
import ArrowForwardSharp from '@vanarama/uibook/lib/assets/icons/ArrowForwardSharp';
import Accordion from '@vanarama/uibook/lib/components/molecules/accordion/Accordion';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import { ReviewsPageQuery_reviewsPage_sections as Section } from '../../../generated/ReviewsPageQuery';
import CarouselCards from './CarouselCards';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import TabList from '@vanarama/uibook/lib/components/molecules/tabs/TabList';
import Tab from '@vanarama/uibook/lib/components/molecules/tabs/Tab';
import TabPanels from '@vanarama/uibook/lib/components/molecules/tabs/TabPanels';
import TabPanel from '@vanarama/uibook/lib/components/molecules/tabs/TabPanel';
import MediaGallery from '@vanarama/uibook/lib/components/organisms/media-gallery';
import ImageCarousel from '@vanarama/uibook/lib/components/organisms/media-gallery/ImageCarousel';
import Media from '@vanarama/uibook/lib/components/atoms/media';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReviewCard from '@vanarama/uibook/lib/components/molecules/cards/ReviewCard/ReviewCard';
import { mapToReviewCard } from './helpers';
import Modal from '@vanarama/uibook/lib/components/molecules/modal';
import GoldrushForm from 'components/GoldrushForm/GoldrushForm';
import GoldrushFormContainer from 'containers/GoldrushFormContainer';
import {
  VehicleTypeEnum,
  OpportunityTypeEnum,
} from '../../../generated/globalTypes';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  crumbs: { href: string; label: string }[];
}

const VehicleReviewContainer: FC<IProps> = ({
  body,
  title,
  sections,
  crumbs,
}) => {
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [
    isModalGetYourFreeQuoteExpanded,
    setIsModalGetYourFreeQuoteExpanded,
  ] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const expertName = sections?.vehicleReview?.author?.length
    ? sections?.vehicleReview?.author[0]?.name || ''
    : '';
  const expertMark = Number(sections?.vehicleReview?.rating || 0);
  return (
    <>
      <div className="row:title">
        <BreadCrumb items={crumbs} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
      </div>
      <div className="row:article">
        <article>
          <Tabs activeIndex={activeTab} onChange={index => setActiveTab(index)}>
            <TabPanels className="-p-000">
              <TabPanel index={0}>
                <Image
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
          <ReactMarkdown
            className="markdown -mt-500"
            source={body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
          <div className="button-group">
            <Button
              color="teal"
              size="regular"
              fill="solid"
              label={'Leave a review'}
              onClick={() => {}}
            />
             <Button
              color="teal"
              size="regular"
              fill="outline"
              label={'Latest Deals'}
              onClick={() => {}}
            />
          </div>
        </article>
        <div>
          <Heading tag="h2" color="black" size="lead">
            {'Expert Review'}
          </Heading>
          <ReviewCard
            key="ExpertRevew"
            review={{
              text: sections?.vehicleReview?.summary || '',
              author: expertName,
              score: expertMark,
            }}
          />
          <Heading tag="h2" color="black" size="lead">
            {'Customer Reviews'}
          </Heading>
          {sections?.reviews?.reviews
            ?.slice(0, reviewsExpanded ? 10 : 2)
            .map((reviewTile, index) => (
              <ReviewCard
                key={index.toString()}
                review={{ ...mapToReviewCard(reviewTile) }}
              />
            ))}
          <Button
            className={'-fullwidth '}
            color="teal"
            size="regular"
            fill="solid"
            label={reviewsExpanded ? 'Read Less Reviews' : 'Read More Reviews'}
            onClick={() => setReviewsExpanded(!reviewsExpanded)}
          />
          <hr className="-fullwidth -mv-500" />
          <Heading color="black" size="large">
            {'Berlingo quote'}
          </Heading>
          <Button
            className={'-fullwidth '}
            color="teal"
            size="regular"
            fill="solid"
            label={'Get My Quote Now'}
            onClick={() => setIsModalGetYourFreeQuoteExpanded(true)}
          />
        </div>
      </div>
      <Modal
        show={isModalGetYourFreeQuoteExpanded}
        onRequestClose={() => setIsModalGetYourFreeQuoteExpanded(false)}
      >
        <Heading color="black" size="large">
          {'Get Your Free Quote From Our Experts'}
        </Heading>

        <GoldrushForm
          callBack={false}
          isPostcodeVisible={true}
          onSubmit={() => {}}
        />
        {/* NOTE: If same backend-connection functionality is required - use GoldrushFormContainer */}
        {/* <GoldrushFormContainer 
          termsAndConditions
          isPostcodeVisible={true}
          capId={capId}
          opportunityType={OpportunityTypeEnum.QUOTE}
          vehicleType={VehicleTypeEnum.LCV}
        /> */}
      </Modal>
    </>
  );
};

export default VehicleReviewContainer;
