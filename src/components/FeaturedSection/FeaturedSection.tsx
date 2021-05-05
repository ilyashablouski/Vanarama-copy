import { useState, useMemo } from 'react';
import { gql } from '@apollo/client';
import dynamic from 'next/dynamic';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import Image from 'core/atoms/image';
import FCWithFragments from '../../utils/FCWithFragments';
import { getFeaturedClassPartial } from '../../utils/layout';
// import { GenericPageQuery_genericPage_sections_featured as IFeatured } from '../../../generated/GenericPageQuery';
import { GenericPageQueryFeatured as IFeatured } from '../../../generated/GenericPageQueryFeatured';
import getTitleTag from '../../utils/getTitleTag';
import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink/RouterLink';

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
  featured: IFeatured | null | undefined;
  btnData?: { label: string; href: string };
}

const FeaturedSection: FCWithFragments<IFeaturedEx> = ({
  featured,
  id,
  btnData,
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
  } = featured as IFeatured;
  const isReadMoreIncluded = useMemo(() => layout?.includes('Read More'), [
    layout,
  ]);
  const [readmore, setReadMore] = useState(isReadMoreIncluded);
  return (
    <section
      className={`row:${getFeaturedClassPartial({ layout })}`}
      id={targetId || id}
    >
      {video && <Media src={video || ''} width="100%" height="360px" />}

      {image && (
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={
            image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      )}

      {iconList?.length && (
        <IconList>
          {iconList.map((el, indx) => (
            <IconListItem iconColor="orange" key={indx.toString()}>
              {el?.text}
            </IconListItem>
          ))}
        </IconList>
      )}

      <div className="-inset -middle -col-400">
        <Heading
          size="large"
          color="black"
          tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
        >
          {title}
        </Heading>
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
          {btnData && (
            <RouterLink
              link={{
                href: btnData?.href || '',
                label: btnData?.label || '',
              }}
              className="button -teal -regular -solid -mt-500"
              withoutDefaultClassName
            >
              <div className="button--inner">{btnData?.label}</div>
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
            url
            fileName
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
          url
          fileName
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
