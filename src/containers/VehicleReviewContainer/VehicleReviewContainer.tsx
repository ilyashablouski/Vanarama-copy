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
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const onChangeTab = (index: number) => {
    // reset active slide to 0 after changing tab
    if (index === 1) {
      setActiveSlide(0);
    }
    setActiveTab(index);
  };
  //const carousel = sections?.cards;
  // const questionSet = sections?.questionSet;
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
          <section className="tabs-wrap">
            <Tabs
              className="-p-000"
              activeIndex={activeTab}
              onChange={index => onChangeTab(index)}
              //variant="alternative"
              // align="center"
            >
              <TabPanels className="-p-000">
                <TabPanel index={0}>
                  {/* <ImageCarousel
                    images={[
                      sections?.vehicleReviewMedia?.reviewPhoto?.file?.url ||
                        '',
                    ]}
                    activeSlide={activeSlide}
                    changeSlideHandler={setActiveSlide}
                  /> */}
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
          </section>
          <ReactMarkdown
            className="-mt-500"
            source={body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
            }}
          />
        </article>
        <div>
          <Heading size="lead" color="black">
            {'Expert review'}
          </Heading>
        </div>
      </div>
    </>
  );
};

export default VehicleReviewContainer;
