import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import dynamic from 'next/dynamic';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_featured as IFeatured } from '../../../generated/GenericPageQuery';

const Image = dynamic(() => import('core/atoms/image'), {
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
}

const ReadMoreBlock = ({ featured }: IProps) => {
  const isReadMoreIncluded = useMemo(
    () => featured?.layout?.includes('Read More'),
    [featured],
  );
  const [readmore, setReadMore] = useState(isReadMoreIncluded);
  return (
    <div className={`row:${getFeaturedClassPartial(featured)}`}>
      {!featured?.layout?.includes('Full Width') && (
        <div>
          <Image
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            size="expand"
            src={featured.image?.file?.url || ''}
          />
        </div>
      )}
      <div>
        <div
          className={readmore ? '-truncate' : ''}
          style={{
            height:
              featured?.layout?.includes('Read More') && readmore
                ? featured?.defaultHeight || 100
                : '',
          }}
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
            label={readmore ? 'Read More' : 'Read Less'}
            onClick={() => setReadMore(!readmore)}
          />
        )}
      </div>
    </div>
  );
};

export default ReadMoreBlock;
