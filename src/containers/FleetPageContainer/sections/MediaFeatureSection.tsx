import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as IMediaFeature } from '../../../../generated/GetFleetLandingPage';
import LayoutTypes from '../../../models/enum/LayoutTypes';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={image.file.url}
          alt={image?.title || ''}
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
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={image.file.url}
          alt={image?.title || ''}
        />
      ) : null}
    </div>
  );
};

export default MediaFeatureSection;
