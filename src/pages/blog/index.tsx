import { NextPage } from 'next';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Carousel from '@vanarama/uibook/lib/components/organisms/carousel';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import ReactMarkdown from 'react-markdown';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import BreadCrumbs from '../../containers/BreadCrumbContainer/BreadCrumbContainer';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import { useGenericPage } from '../../gql/genericPage';
import { getFeaturedClassPartial } from '../../utils/layout';
import withApollo from '../../hocs/withApollo';
import getTitleTag from '../../utils/getTitleTag';

const BlogPage: NextPage = () => {
  const { data, loading, error } = useGenericPage('/latest-news');

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const featured = data?.genericPage?.sections?.featured;
  const carousel = data?.genericPage?.sections?.carousel;
  const tiles = data?.genericPage?.sections?.tiles;
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage.featuredImage}
        />
      )}
      <div className="row:title">
        <BreadCrumbs />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name}
        </Heading>
      </div>
      {featured && (
        <div className={`row:${getFeaturedClassPartial(featured)}`}>
          <Image size="expand" src={featured.image?.file?.url || ''} />
          <div>
            <Heading tag="span" size="large" color="black">
              {featured.title}
            </Heading>
            <Text tag="p" size="regular" color="darker">
              <ReactMarkdown
                source={featured.body || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </Text>
          </div>
        </div>
      )}
      {carousel && carousel.cards?.length && (
        <div className="row:bg-lighter -col-300">
          <Heading className="-a-center" tag="h3" size="large" color="black">
            {carousel.title}
          </Heading>
          {carousel.cards.length > 1 ? (
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
                      <Text color="dark" size="regular" tag="span">
                        <ReactMarkdown
                          source={card.body || ''}
                          disallowedTypes={['paragraph']}
                          unwrapDisallowed
                          renderers={{
                            link: props => {
                              const { href, children } = props;
                              return (
                                <RouterLink link={{ href, label: children }} />
                              );
                            },
                          }}
                        />
                      </Text>
                    </Card>
                  ),
              )}
            </Carousel>
          ) : (
            <Card
              className="card__article"
              imageSrc={carousel.cards[0]!.image?.file?.url || ''}
              title={{
                title: '',
                link: (
                  <RouterLink
                    link={{ href: '#', label: carousel.cards[0]!.title || '' }}
                    className="card--link"
                    classNames={{ color: 'black', size: 'regular' }}
                  />
                ),
              }}
            >
              <Text color="dark" size="regular" tag="span">
                <ReactMarkdown
                  source={carousel.cards[0]!.body || ''}
                  disallowedTypes={['paragraph']}
                  unwrapDisallowed
                  renderers={{
                    link: props => {
                      const { href, children } = props;
                      return <RouterLink link={{ href, label: children }} />;
                    },
                  }}
                />
              </Text>
              <Button
                label="Read More"
                color="teal"
                size="small"
                fill="solid"
                className="-mt-400"
              />
            </Card>
          )}
        </div>
      )}
      {tiles && (
        <div className="row:bg-lighter">
          <div className="row:cards-3col">
            <Heading
              size="large"
              color="black"
              tag={getTitleTag(tiles.titleTag) as keyof JSX.IntrinsicElements}
            >
              {tiles.tilesTitle}
            </Heading>
            {tiles.tiles?.length &&
              tiles.tiles.map((tile, indx) => (
                <Card
                  key={indx.toString()}
                  className="card__category"
                  imageSrc={tile.image?.file?.url || ''}
                  title={{
                    title: '',
                    link: (
                      <RouterLink
                        link={{ href: '#', label: tile.title || '' }}
                        className="card--link"
                        classNames={{ color: 'black', size: 'regular' }}
                      />
                    ),
                    withBtn: true,
                  }}
                >
                  <Text tag="span" size="regular" color="dark">
                    <ReactMarkdown
                      source={tile.body || ''}
                      disallowedTypes={['paragraph']}
                      unwrapDisallowed
                      renderers={{
                        link: props => {
                          const { href, children } = props;
                          return (
                            <RouterLink link={{ href, label: children }} />
                          );
                        },
                      }}
                    />
                  </Text>
                </Card>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default withApollo(BlogPage);
