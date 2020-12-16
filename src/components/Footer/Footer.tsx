import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown';
import { PrimaryFooter_primaryFooter as PrimaryFooter } from '../../../generated/PrimaryFooter';
import RouterLink from '../RouterLink/RouterLink';

const Text = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/text'),
);
const FooterColumn = dynamic(() => import('./FooterColumn'));

interface IFooter {
  primaryFooter: PrimaryFooter;
}

const Footer: FC<IFooter> = ({ primaryFooter }) => {
  const { linkGroups, legalStatement } = primaryFooter;

  return (
    <footer className="footer">
      {linkGroups?.map(linkGroup => (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <FooterColumn linkGroup={linkGroup} key={linkGroup?.name || ''} />
        </LazyLoadComponent>
      ))}
      <hr className="footer--divider -fullwidth" />
      {legalStatement?.title && (
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
          <Text color="white" size="xsmall" tag="p">
            {legalStatement?.title}
          </Text>
        </LazyLoadComponent>
      )}
      {legalStatement?.body && (
        <div className="-text-columns">
          <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
            <Text size="xsmall" color="medium">
              <ReactMarkdown
                source={legalStatement.body}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                }}
              />
            </Text>
          </LazyLoadComponent>
        </div>
      )}
    </footer>
  );
};

export default React.memo(Footer);
