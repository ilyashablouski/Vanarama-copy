/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ReactMarkdown from 'react-markdown';
import RouterLink from '../../components/RouterLink/RouterLink';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { ICategoryPage } from './interface';

const CategoryPageContainer: React.FC<ICategoryPage> = ({
  carousel,
  metaData,
}) => {
  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name}
        </Heading>
      </div>
      {carousel && carousel?.cards?.length && (
        <div className="row:bg-lighter -col-300">
          <Heading className="-a-center" tag="h3" size="large" color="black">
            {carousel.title}
          </Heading>
          {carousel?.cards.length > 1 && (
            <Carousel className="-mh-auto" countItems={5}>
              {carousel.cards.map(
                (card, indx) =>
                  card && (
                    <Card
                      key={`${card.name}_${indx.toString()}`}
                      className="card__article"
                      imageSrc={card.image?.file?.url || ''}
                      title={{
                        title: '',
                        link: (
                          <RouterLink
                            link={{ href: '#', label: card.title || '' }}
                            className="card--link"
                            classNames={{ color: 'black', size: 'regular' }}
                          />
                        ),
                      }}
                    >
                      <ReactMarkdown
                        escapeHtml={false}
                        source={card.body || ''}
                        renderers={{
                          link: props => {
                            const { href, children } = props;
                            return (
                              <RouterLink
                                link={{ href, label: children }}
                                classNames={{ color: 'teal' }}
                              />
                            );
                          },
                          heading: props => (
                            <Text
                              {...props}
                              size="lead"
                              color="darker"
                              tag="h3"
                            />
                          ),
                          paragraph: props => (
                            <Text {...props} tag="p" color="darker" />
                          ),
                        }}
                      />
                    </Card>
                  ),
              )}
            </Carousel>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryPageContainer;
