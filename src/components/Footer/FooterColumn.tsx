import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import LogoFacebookV2 from 'core/assets/icons/LogoFacebookV2';
import Icon from 'core/atoms/icon/Icon';
import LogoTwitterV2 from 'core/assets/icons/LogoTwitterV2';
import LogoInstagramV2 from 'core/assets/icons/LogoInstagramV2';
import LogoLinkedinV2 from 'core/assets/icons/LogoLinkedinV2';
import LogoYouTubeV2 from 'core/assets/icons/LogoYouTubeV2';
import Logo from 'core/atoms/logo';
import { PrimaryFooter_primaryFooter_linkGroups as LinkGroups } from '../../../generated/PrimaryFooter';
import RouterLink from '../RouterLink/RouterLink';
import { LinkTypes } from '../../models/enum/LinkTypes';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IFooterColumn {
  linkGroup: LinkGroups | null;
  dataUiTestId?: string;
}

const socialButtons = [
  {
    id: 'facebook',
    link: 'https://www.facebook.com/vanarama/',
    icon: <LogoFacebookV2 />,
  },
  {
    id: 'twitter',
    link: 'https://twitter.com/Vanarama',
    icon: <LogoTwitterV2 />,
  },
  {
    id: 'instagram',
    link: 'https://www.instagram.com/vanaramauk/',
    icon: <LogoInstagramV2 />,
  },
  {
    id: 'linkedin',
    link: 'https://www.linkedin.com/company/vanarama',
    icon: <LogoLinkedinV2 />,
  },
  {
    id: 'youtube',
    link: 'https://www.youtube.com/user/vanaramauk',
    icon: <LogoYouTubeV2 />,
  },
];

const FooterColumn: FC<IFooterColumn> = ({ linkGroup, dataUiTestId }) => {
  if (linkGroup) {
    return (
      <div
        className="footer--column"
        key={linkGroup.name || ''}
        data-uitestid={dataUiTestId}
      >
        <Heading
          color="medium"
          tag="span"
          size="small"
          dataUiTestId={`${dataUiTestId}_heading`}
        >
          {linkGroup.name}
        </Heading>
        {!(linkGroup.links?.length || linkGroup.linkGroups?.length) &&
          linkGroup.body && <ReactMarkdown source={linkGroup.body} />}
        {linkGroup.links && (
          <ul>
            {linkGroup.links?.map(link => (
              <li key={link?.text || ''}>
                <RouterLink
                  link={{ href: link?.url || '', label: link?.text || '' }}
                  classNames={{ color: 'white', size: 'small' }}
                  dataUiTestId={`${dataUiTestId}_link_${link?.text}`}
                />
              </li>
            ))}
          </ul>
        )}
        {linkGroup.linkGroups && (
          <>
            <ul>
              {linkGroup.linkGroups?.map(el => (
                <li className={el?.links ? '-mb-300' : ''} key={el?.name || ''}>
                  <Text size="small" color="medium" tag="span">
                    {el?.name}
                  </Text>{' '}
                  {el?.links?.map(link =>
                    link?.url ? (
                      <RouterLink
                        key={link?.text || ''}
                        link={{
                          href: link?.url || '',
                          label: link?.text || '',
                          linkType: LinkTypes.external,
                        }}
                        classNames={{ color: 'white', size: 'small' }}
                        withoutSilentReplacements
                      />
                    ) : (
                      <Text
                        size="small"
                        color="white"
                        tag="span"
                        key={link?.text || ''}
                      >
                        {link?.text}
                      </Text>
                    ),
                  )}
                </li>
              ))}
            </ul>

            <div className="footer--social-icons">
              {socialButtons.map(item => (
                <div
                  key={item.id}
                  className="button -white -small -outline -round"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    className="button--inner"
                    data-uitestid={`${dataUiTestId}_${item.id}-social-link`}
                    rel="noreferrer"
                  >
                    <div>
                      <Icon size="small" color="white" icon={item.icon} />
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <Logo assetName="bvrla" dataUiTestId={dataUiTestId} />
          </>
        )}
      </div>
    );
  }
  return <></>;
};

export default React.memo(FooterColumn);
