import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import Button from 'core/atoms/button/Button';
import Facebook from 'core/assets/icons/Facebook';
import Icon from 'core/atoms/icon/Icon';
import Twitter from 'core/assets/icons/Twitter';
import Instagram from 'core/assets/icons/Instagram';
import Linkedin from 'core/assets/icons/Linkedin';
import YouTube from 'core/assets/icons/YouTube';
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
}

const socialButton = [
  {
    link: '/',
    icon: <Facebook />,
  },
  {
    link: '/',
    icon: <Twitter />,
  },
  {
    link: '/',
    icon: <Instagram />,
  },
  {
    link: '/',
    icon: <Linkedin />,
  },
  {
    link: '/',
    icon: <YouTube />,
  },
];

const FooterColumn: FC<IFooterColumn> = props => {
  const { linkGroup } = props;

  if (linkGroup) {
    return (
      <div className="footer--column" key={linkGroup.name || ''}>
        <Heading color="medium" tag="span" size="small">
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
              {socialButton.map(item => (
                <div className="button -white -small -outline -round">
                  <a
                    href={item.link}
                    target="_blank"
                    className="button--inner"
                    rel="noreferrer"
                  >
                    <div>
                      <Icon size="small" color="white" icon={item.icon} />
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <a href="/" target="_blank">
              <Logo asset="bvrla" />
            </a>
          </>
        )}
      </div>
    );
  }
  return <></>;
};

export default React.memo(FooterColumn);
