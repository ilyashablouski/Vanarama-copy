import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ReactMarkdown from 'react-markdown';
import { PrimaryFooter_primaryFooter as PrimaryFooter } from '../../../generated/PrimaryFooter';
import RouterLink from '../RouterLink/RouterLink';
import { isServerRenderOrAppleDevice } from '../../utils/deviceType';
import { normalizeString } from '../../utils/data';

const Text = dynamic(() => import('core/atoms/text'));
const FooterColumn = dynamic(() => import('./FooterColumn'));

interface IFooter {
  primaryFooter: PrimaryFooter;
}

const Footer: FC<IFooter> = ({ primaryFooter }) => {
  const { linkGroups, legalStatement } = primaryFooter;

  return (
    <footer className="footer">
      <LazyLoadComponent
        visibleByDefault={isServerRenderOrAppleDevice}
        threshold={250}
      >
        {linkGroups?.map(linkGroup => (
          <FooterColumn
            key={linkGroup?.name || ''}
            dataUiTestId={`footer_footer-column_${normalizeString(
              linkGroup?.name,
            )}`}
            linkGroup={linkGroup}
          />
        ))}
        <hr className="footer--divider -fullwidth" />
        {legalStatement?.title && (
          <Text color="white" size="xsmall" tag="p">
            {legalStatement?.title}
          </Text>
        )}
        {legalStatement?.body && (
          <div className="-text-columns">
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
          </div>
        )}
      </LazyLoadComponent>
    </footer>
  );
};

export default React.memo(Footer);
