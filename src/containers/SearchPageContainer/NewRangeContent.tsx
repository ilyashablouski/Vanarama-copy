import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Image from 'core/atoms/image';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from 'core/atoms/heading';
import dynamic from 'next/dynamic';
import Media from 'core/atoms/media';
import Accordion from 'core/molecules/accordion/Accordion';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_carousel,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import ThreeColumnSection from '../../components/ThreeColumnSection/ThreeColumnSection';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink';
import ReviewsTwoColumn from '../../components/ReviewsTwoColumn/ReviewsTwoColumn';
import NewRangeCarousel from './NewRangeCarousel';
import Skeleton from '../../components/Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

type NewRangeContentProps = {
  pageData: GenericPageQuery;
  newCarousel: GenericPageQuery_genericPage_sections_carousel;
  isNewPage: boolean;
  isRangePage: boolean;
};

interface ItemAccordion {
  id: number;
  title: string;
  children: string;
}

const NewRangeContent: React.FC<NewRangeContentProps> = ({
  pageData,
  isNewPage,
  newCarousel,
  isRangePage,
}) => {
  let countListAccordion = 0;

  const getDataAccordion = (treeGetData: string[], pageDatas: any) => {
    if (isNewPage && isRangePage) {
      return getSectionsData(treeGetData, pageDatas).map((item: any) => {
        countListAccordion += 1;
        return {
          id: countListAccordion,
          title: item.name,
          children: item.entryBody,
        } as ItemAccordion;
      });
    }
    return false;
  };

  return (
    <>
      <div className="row:default">
        <ThreeColumnSection
          title={getSectionsData(
            ['sectionsAsArray', 'cards', '0', 'name'],
            pageData?.genericPage,
          )}
          cards={getSectionsData(
            ['sectionsAsArray', 'cards', '0', 'cards'],
            pageData?.genericPage,
          )}
        />

        <section className="row:featured-left">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={getSectionsData(
                ['sectionsAsArray', 'featured', '1', 'image', 'file', 'url'],
                pageData?.genericPage,
              )}
            />
            <div>
              <Heading
                size="large"
                color="black"
                tag={
                  getTitleTag(
                    getSectionsData(
                      ['sectionsAsArray', 'featured', '1', 'titleTag'],
                      pageData?.genericPage,
                    ) || 'p',
                  ) as keyof JSX.IntrinsicElements
                }
              >
                {getSectionsData(
                  ['sectionsAsArray', 'featured', '1', 'title'],
                  pageData?.genericPage,
                )}
              </Heading>
              <div className="markdown">
                <ReactMarkdown
                  allowDangerousHtml
                  source={getSectionsData(
                    ['sectionsAsArray', 'featured', '1', 'body'],
                    pageData?.genericPage,
                  )}
                  renderers={{
                    link: props => {
                      const { href, children } = props;
                      return <RouterLink link={{ href, label: children }} />;
                    },
                  }}
                />
              </div>
            </div>
          </LazyLoadComponent>
        </section>

        <section className="row:featured-left">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <div>
              <Heading
                size="large"
                color="black"
                tag={
                  getTitleTag(
                    getSectionsData(
                      ['sectionsAsArray', 'featured', '2', 'titleTag'],
                      pageData?.genericPage,
                    ) || 'p',
                  ) as keyof JSX.IntrinsicElements
                }
              >
                {getSectionsData(
                  ['sectionsAsArray', 'featured', '2', 'title'],
                  pageData?.genericPage,
                )}
              </Heading>
              <div className="markdown">
                <ReactMarkdown
                  allowDangerousHtml
                  source={
                    getSectionsData(
                      ['sectionsAsArray', 'featured', '2', 'body'],
                      pageData?.genericPage,
                    ) || ''
                  }
                  renderers={{
                    link: props => {
                      const { href, children } = props;
                      return <RouterLink link={{ href, label: children }} />;
                    },
                  }}
                />
              </div>
            </div>

            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={getSectionsData(
                ['sectionsAsArray', 'featured', '2', 'image', 'file', 'url'],
                pageData?.genericPage,
              )}
            />
          </LazyLoadComponent>
        </section>

        <section className="row:featured-left">
          <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={getSectionsData(
                ['sectionsAsArray', 'featured', '3', 'image', 'file', 'url'],
                pageData?.genericPage,
              )}
            />
            <div>
              <Heading
                size="large"
                color="black"
                tag={
                  getTitleTag(
                    getSectionsData(
                      ['sectionsAsArray', 'featured', '3', 'titleTag'],
                      pageData?.genericPage,
                    ) || 'p',
                  ) as keyof JSX.IntrinsicElements
                }
              >
                {getSectionsData(
                  ['sectionsAsArray', 'featured', '3', 'title'],
                  pageData?.genericPage,
                )}
              </Heading>
              <div className="markdown">
                <ReactMarkdown
                  allowDangerousHtml
                  source={
                    getSectionsData(
                      ['sectionsAsArray', 'featured', '3', 'body'],
                      pageData?.genericPage,
                    ) || ''
                  }
                  renderers={{
                    link: props => {
                      const { href, children } = props;
                      return <RouterLink link={{ href, label: children }} />;
                    },
                  }}
                />
              </div>
            </div>
          </LazyLoadComponent>
        </section>
      </div>

      <div className="row:default">
        <div className="tilebox">
          <Accordion
            items={getDataAccordion(
              ['sectionsAsArray', 'accordion', '0', 'accordionEntries'],
              pageData?.genericPage,
            )}
          />
        </div>
      </div>

      <div className="row:default">
        <Heading
          className="-a-center -mb-500"
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(
                ['sectionsAsArray', 'featured', '4', 'titleTag'],
                pageData?.genericPage,
              ) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {getSectionsData(
            ['sectionsAsArray', 'featured', '4', 'title'],
            pageData?.genericPage,
          )}
        </Heading>

        <div className="markdown full-width">
          <ReactMarkdown
            allowDangerousHtml
            source={getSectionsData(
              ['sectionsAsArray', 'featured', '4', 'body'],
              pageData?.genericPage,
            )}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} className="large" color="darked" tag="h3" />
              ),

              paragraph: props => (
                <Text
                  {...props}
                  tag="span"
                  className="-big"
                  size="full-width"
                  color="darked"
                />
              ),
            }}
          />
        </div>
      </div>

      <section className="row:featured-left">
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            src={getSectionsData(
              ['sectionsAsArray', 'featured', '5', 'image', 'file', 'url'],
              pageData?.genericPage,
            )}
          />
          <div>
            <Heading
              size="large"
              color="black"
              tag={
                getTitleTag(
                  getSectionsData(
                    ['sectionsAsArray', 'featured', '5', 'titleTag'],
                    pageData?.genericPage,
                  ) || 'p',
                ) as keyof JSX.IntrinsicElements
              }
            >
              {getSectionsData(
                ['sectionsAsArray', 'featured', '5', 'title'],
                pageData?.genericPage,
              )}
            </Heading>
            <div className="markdown">
              <ReactMarkdown
                allowDangerousHtml
                source={getSectionsData(
                  ['sectionsAsArray', 'featured', '5', 'body'],
                  pageData?.genericPage,
                )}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </div>
          </div>
        </LazyLoadComponent>
      </section>

      <div className="row:default">
        <Media
          src={getSectionsData(
            ['sectionsAsArray', 'featured', '6', 'video'],
            pageData?.genericPage,
          )}
          width="100%"
          height="670px"
        />
      </div>

      <ReviewsTwoColumn
        reviews={
          getSectionsData(
            ['sectionsAsArray', 'reviews', '0', 'reviews'],
            pageData?.genericPage,
          ) || []
        }
      />

      <div className="row:default">
        <div className="markdown full-width">
          <ReactMarkdown
            allowDangerousHtml
            source={getSectionsData(
              ['sectionsAsArray', 'featured', '7', 'body'],
              pageData?.genericPage,
            )}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} className="large" color="darked" tag="h3" />
              ),

              paragraph: props => (
                <Text
                  {...props}
                  tag="span"
                  className="-big"
                  size="full-width"
                  color="darked"
                />
              ),
            }}
          />
        </div>
      </div>

      <div className="row:default">
        <div className="tilebox">
          <Accordion
            items={getDataAccordion(
              ['sectionsAsArray', 'accordion', '1', 'accordionEntries'],
              pageData?.genericPage,
            )}
          />
        </div>
      </div>

      <NewRangeCarousel newCarousel={newCarousel} />
    </>
  );
};

export default NewRangeContent;
