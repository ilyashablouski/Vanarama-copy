import React, { FC, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import {
  GenericPageQuery_genericPage_sections as Section,
  GenericPageQuery_genericPage_sections_cards_cards as Cards,
} from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import useMediaQuery from '../../hooks/useMediaQuery';
import { onMadeLineBreaks } from '../SearchPageContainer/helpers';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
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
}

const LeasingExplainedContainer: FC<IProps> = ({ title, sections }) => {
  const cards = getSectionsData(['cards', 'cards'], sections);
  const featured = sections?.featured;
  const leadText = sections?.leadText;
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const titleWithBreaks = useMemo(() => onMadeLineBreaks(title || ''), [title]);

  return (
    <>
      <div className="row:title">
        <Heading size="xlarge" color="black" tag="h1">
          {isDesktopOrTablet
            ? title
            : titleWithBreaks.map(line => (
                <>
                  {line} <br />
                </>
              ))}
        </Heading>
      </div>
      <div className="row:bg-black">
        <div className="row:featured-right">
          <div>
            <Heading tag="span" size="large" color="white">
              {featured?.title || ''}
            </Heading>
            <div className="markdown -lighter">
              <ReactMarkdown
                allowDangerousHtml
                source={featured?.body || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </div>
            {featured?.link && (
              <RouterLink
                classNames={{ color: 'teal', solid: true, size: 'regular' }}
                className="button"
                link={{
                  href: featured?.link?.legacyUrl || featured?.link?.url || '',
                  label: featured?.link?.text || '',
                }}
              >
                <div className="button--inner">{featured?.link?.text}</div>
              </RouterLink>
            )}
          </div>
          <Media
            noLazy
            src={featured?.video || ''}
            width="100%"
            height="360px"
          />
        </div>
      </div>
      <div className="row:lead-text">
        <Heading size="large" color="black">
          {leadText?.heading}
        </Heading>
        <Text size="regular" color="darker">
          {leadText?.description}
        </Text>
      </div>
      <div className="row:bg-lighter -thin">
        <div className="row:results">
          <div className="row:cards-3col">
            {cards?.map((el: Cards, ind: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={`${el?.title}_${el?.name || ind}`}
                title={{
                  title: el?.title || '',
                  link: (
                    <RouterLink
                      withoutDefaultClassName
                      className="heading"
                      classNames={{ color: 'black', size: 'lead' }}
                      link={{
                        href: el.link?.legacyUrl || el.link?.url || '',
                        label: el.title || '',
                      }}
                    >
                      {el.title}
                    </RouterLink>
                  ),
                }}
                imageSrc={el.image?.file?.url}
                description={el?.body || ''}
              >
                <RouterLink
                  classNames={{ color: 'teal', solid: true, size: 'small' }}
                  className="button -mt-400"
                  link={{
                    href: el.link?.legacyUrl || el.link?.url || '',
                    label: el?.link?.text || '',
                  }}
                >
                  <div className="button--inner">{el.link?.text}</div>
                </RouterLink>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeasingExplainedContainer;
