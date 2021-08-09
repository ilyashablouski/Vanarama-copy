import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import { getFeaturedClassPartial } from 'utils/layout';
import Media from 'core/atoms/media';
import getTitleTag from 'utils/getTitleTag';
import IconList, { IconListItem } from 'core/organisms/icon-list';
import {
  Partner_partner_featured,
  Partner_partner_featured_iconList,
} from '../../../../generated/Partner';

const PartnershipFeatureSection = ({
  featured,
}: {
  featured: Partner_partner_featured;
}) => {
  const Image = dynamic(() => import('core/atoms/image'), {
    loading: () => <Skeleton count={3} />,
  });
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
  });
  const Text = dynamic(() => import('core/atoms/text'), {
    loading: () => <Skeleton count={1} />,
  });
  const RouterLink = dynamic(() => import('../../RouterLink/RouterLink'));
  const { title, titleTag, body, image, video, iconList } = featured;

  return (
    <section className={`row:${getFeaturedClassPartial(featured)}`}>
      {video ? (
        <Media src={video || ''} width="100%" height="360px" />
      ) : (
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={
            image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      )}

      <div>
        <Heading
          size="large"
          color="black"
          tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
        >
          {title}
        </Heading>
        <div className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
          {iconList?.length && (
            <IconList>
              {iconList.map(
                (
                  el: Partner_partner_featured_iconList | null,
                  index: number,
                ) => (
                  <IconListItem
                    iconColor="orange"
                    key={index.toString()}
                    listStyle="none"
                  >
                    {el?.text}
                  </IconListItem>
                ),
              )}
            </IconList>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnershipFeatureSection;
