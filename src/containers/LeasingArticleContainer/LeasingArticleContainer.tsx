import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import getTitleTag from '../../utils/getTitleTag';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  image: string | null | undefined;
}

const LeasingArticleContainer: FC<IProps> = ({
  title,
  sections,
  image,
  body,
}) => {
  const cards = getSectionsData(['cards'], sections);

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {title}
        </Heading>
      </div>
      <div className="row:bg-black -compact">
        <div className="row:featured-image">
          {image && (
            <Image
              loadImage={false}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              className="-white"
              size="expand"
              src={image}
            />
          )}
        </div>
      </div>
      <div className="row:article">
        <article className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={body || ''}
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
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </article>
        <div>
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                cards?.titleTag || 'span',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {cards?.name}
          </Heading>
          {cards?.cards?.map((el: Cards, ind: number) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={`${el?.title}_${el?.name || ind}`}
              title={{
                title: el?.title || '',
              }}
              imageSrc={el.image?.file?.url}
              description={el?.body || ''}
            >
              <RouterLink
                classNames={{ color: 'teal' }}
                link={{
                  href: el.link?.legacyUrl || el.link?.url || '',
                  label: el.link?.text || '',
                }}
              >
                {el.link?.text}
              </RouterLink>
            </Card>
          ))}
        </div>
      </div>
      <div className="row:comments" />
    </>
  );
};

export default LeasingArticleContainer;
