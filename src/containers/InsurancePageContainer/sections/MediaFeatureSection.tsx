import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../../utils/getTitleTag';
import { GenericPageQuery_genericPage_sections_featured as IMediaFeature } from '../../../../generated/GenericPageQuery';
import LayoutTypes from '../../../models/enum/LayoutTypes';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const selectClassName = (selectedLayout: string) => {
  switch (selectedLayout) {
    case LayoutTypes.right: {
      return 'right';
    }
    case LayoutTypes.full: {
      return 'full';
    }
    case LayoutTypes.featuredProduct: {
      return 'product';
    }
    default: {
      return 'left';
    }
  }
};
export interface IMediaFeatureProps extends IMediaFeature {
  imageOnly?: boolean;
}

const MediaFeatureSection: React.FC<IMediaFeatureProps> = ({
  image,
  titleTag,
  title,
  body,
  layout,
  children,
  imageOnly,
}) => {
  const selectedLayout = (layout && layout[0]) || '';
  const className = selectClassName(selectedLayout);

  return (
    <div className={`row:featured-${className}`}>
      {selectedLayout !== LayoutTypes.right && image?.file?.url ? (
        <ImageV2
          quality={60}
          width={image.file.details.image.width}
          height={image.file.details.image.height}
          src={image.file.url}
          alt={image.title || ''}
        />
      ) : null}
      <div>
        {imageOnly ? (
          children
        ) : (
          <>
            <Heading
              size="large"
              color="black"
              tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}
            >
              {title}
            </Heading>
            <ReactMarkdown
              allowDangerousHtml
              source={body || ''}
              renderers={{
                heading: props => <Heading {...props} tag="h3" />,
                paragraph: props => <Text {...props} tag="p" color="darker" />,
                link: props => {
                  const { href } = props;
                  return (
                    <RouterLink
                      // eslint-disable-next-line react/destructuring-assignment
                      link={{ href, label: props.children }}
                      classNames={{ color: 'teal' }}
                    />
                  );
                },
              }}
            />
          </>
        )}
      </div>
      {selectedLayout === LayoutTypes.right && image?.file?.url ? (
        <ImageV2
          width={image.file.details.image.width}
          height={image.file.details.image.height}
          src={image.file.url}
          alt={image.title || ''}
        />
      ) : null}
    </div>
  );
};

export default React.memo(MediaFeatureSection);
