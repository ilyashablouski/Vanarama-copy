import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import { getFeaturedClassPartial } from '../../../utils/layout';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_featured as IFeatured } from '../../../../generated/GenericPageQuery';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  featured: IFeatured;
  dataUiTestId?: string;
}

const ReadMoreBlock = ({ featured, dataUiTestId }: IProps) => {
  const isReadMoreIncluded = useMemo(
    () => featured?.layout?.includes('Read More'),
    [featured],
  );
  const [readMore, setReadMore] = useState(isReadMoreIncluded);

  return (
    <div className={`row:${getFeaturedClassPartial(featured)}`}>
      {!featured?.layout?.includes('Full Width') && (
        <div>
          <ImageV2
            quality={60}
            width={featured.image?.file?.details.image.width}
            height={featured.image?.file?.details.image.height}
            src={featured.image?.file?.url || ''}
            size="expand"
          />
        </div>
      )}
      <div>
        <div
          className={readMore ? '-truncate' : ''}
          style={{
            height:
              featured?.layout?.includes('Read More') && readMore
                ? featured?.defaultHeight || 100
                : '',
          }}
          data-uitestid={`${dataUiTestId}_block_read-more`}
        >
          <Heading
            tag={(featured.titleTag as keyof JSX.IntrinsicElements) || 'span'}
            size="large"
            color="black"
            className="-mb-300"
          >
            {featured.title}
          </Heading>
          <ReactMarkdown
            className="markdown"
            source={featured.body || ''}
            allowDangerousHtml
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
            }}
          />
        </div>
        {isReadMoreIncluded && (
          <Button
            size="small"
            color="teal"
            fill="clear"
            label={readMore ? 'Read More' : 'Read Less'}
            onClick={() => setReadMore(!readMore)}
            dataUiTestId={`${dataUiTestId}_button_read-more`}
          />
        )}
      </div>
    </div>
  );
};

export default ReadMoreBlock;
