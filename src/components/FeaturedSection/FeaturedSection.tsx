import React, { useState, useMemo } from 'react';
import { gql } from '@apollo/client';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import ImageV2 from 'core/atoms/image/ImageV2';
import FCWithFragments from '../../utils/FCWithFragments';
import { getFeaturedClassPartial } from '../../utils/layout';
// import { GenericPageQuery_genericPage_sections_featured as IFeatured } from '../../../generated/GenericPageQuery';
import { GenericPageQueryFeatured as IFeatured } from '../../../generated/GenericPageQueryFeatured';
import getTitleTag from '../../utils/getTitleTag';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink/RouterLink';
import { IMAGE_FILE_FRAGMENT } from '../../gql/image';
import { Nullish } from '../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={2} />,
});
const IconList = dynamic(() => import('core/organisms/icon-list'), {
  loading: () => <Skeleton count={3} />,
});
// @ts-ignore
const IconListItem = dynamic(() =>
  import('core/organisms/icon-list').then(mod => mod.IconListItem),
);

interface IFeaturedEx {
  id?: string;
  featured: Nullish<IFeatured>;
  videoWidth?: string | number;
  videoHeight?: string | number;
  videoClassName?: string;
  dataUiTestId?: string;
}

const FeaturedSection: FCWithFragments<IFeaturedEx> = ({
  featured,
  videoClassName,
  videoWidth,
  videoHeight,
  id,
  dataUiTestId,
}) => {
  const {
    video,
    image,
    title,
    titleTag,
    body,
    layout,
    defaultHeight,
    iconList,
    targetId,
  } = (featured as IFeatured) || {};
  const isReadMoreIncluded = useMemo(() => layout?.includes('Read More'), [
    layout,
  ]);
  const [readmore, setReadMore] = useState(isReadMoreIncluded);
  return (
    <section
      className={`row:${getFeaturedClassPartial({ layout })}`}
      id={targetId || id}
    >
      {video && (
        <Media
          className={videoClassName}
          width={videoWidth ?? '100%'}
          height={videoHeight ?? '360px'}
          src={video || ''}
        />
      )}

      {image && (
        <ImageV2
          quality={60}
          width={image?.file?.details.image.width ?? 1000}
          height={image?.file?.details.image.height ?? 650}
          src={
            image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
          dataUiTestId={dataUiTestId}
        />
      )}

      {iconList?.length && (
        <IconList>
          {iconList.map((el, index) => (
            <IconListItem iconColor="orange" key={index.toString()}>
              {el?.text}
            </IconListItem>
          ))}
        </IconList>
      )}

      <div className="-inset -middle -col-400">
        {title && (
          <Heading
            size="large"
            color="black"
            tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
            dataUiTestId={dataUiTestId ? `${dataUiTestId}_heading` : undefined}
          >
            {title}
          </Heading>
        )}
        <div
          className={readmore ? '-truncate' : ''}
          style={{
            height:
              layout?.includes('Read More') && readmore
                ? defaultHeight || 100
                : '',
          }}
        >
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
                  <Heading {...props} size="lead" color="darker" tag="h3" />
                ),
                p: props => (
                  <Text {...props} size="regular" color="darker" tag="p" />
                ),
              }}
            />
          </div>
          {featured?.link && (
            <RouterLink
              link={{
                href: featured.link.url || '',
                label: featured.link.text || '',
              }}
              className="button -teal -regular -outline -mt-500"
              withoutDefaultClassName
            >
              <div className="button--inner">{featured.link.text}</div>
            </RouterLink>
          )}
        </div>
        {isReadMoreIncluded && (
          <Button
            size="small"
            color="teal"
            fill="clear"
            label={readmore ? 'Read More' : 'Read Less'}
            onClick={() => setReadMore(!readmore)}
          />
        )}
      </div>
    </section>
  );
};

FeaturedSection.fragments = {
  featured: gql`
    ${IMAGE_FILE_FRAGMENT}
    fragment GenericPageQueryFeatured on Featured {
      layout
      body
      title
      titleTag
      video
      targetId
      defaultHeight
      iconList {
        text
      }
      link {
        url
        text
        legacyUrl
      }
      title
      cards {
        name
        title
        image {
          title
          description
          file {
            fileName
            ...imageFile
          }
        }
        body
        link {
          text
          url
          legacyUrl
        }
      }
      image {
        title
        description
        file {
          fileName
          ...imageFile
        }
      }
      testimonials {
        customerName
        summary
        rating
      }
    }
  `,
};

export default FeaturedSection;
