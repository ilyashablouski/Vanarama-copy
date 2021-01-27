import React, { FC, memo } from 'react';
import cx from 'classnames';

import Link from '../../atoms/link';
import Text from '../../atoms/text';
import Logo from '../../atoms/logo';

import { IHeaderProps } from './interfaces';
import Button from '../../atoms/button';
import Icon from '../../atoms/icon';
import Heading from '../../atoms/heading';

import Call from '../../assets/icons/Call';
import Menu from '../../assets/icons/Menu';
import ChevronDown from '../../assets/icons/ChevronDown';
import IvanCta from '../../molecules/ivan-cta';
import { ILink } from '../../interfaces/link';

const Header: FC<IHeaderProps> = memo(props => {
  const { className, topBarLinks, loginLink, showIvan, message } = props;

  const renderChildrenMenu = (childrenLinks: ILink[]) => {
    return (
      <nav>
        <ul>
          {childrenLinks.map((link: ILink) => (
            <li key={link.label}>
              <Link
                href={link.href}
                size="large"
                color="black"
                className="button -clear"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderMenu = () => {
    return (
      <div className="header--menu">
        <nav className="header--menu-nav">
          {typeof topBarLinks !== 'undefined' &&
            topBarLinks.length > 0 &&
            topBarLinks.map(entry => (
              <Button
                key={entry.label}
                className="-multiple"
                color="inherit"
                fill="clear"
                label={
                  <>
                    <Link href={entry.href}>
                      <Heading size="lead" color="inherit">
                        {entry.label}
                      </Heading>
                      {!!entry.children?.length && (
                        <Icon color="dark" icon={<ChevronDown />} />
                      )}
                    </Link>
                    {!!entry.children?.length &&
                      renderChildrenMenu(entry.children)}
                  </>
                }
              />
            ))}
          {loginLink && (
            <>
              <span className="header--vertical-rule" />
              <Button
                key={loginLink.label}
                color="inherit"
                fill="clear"
                label={
                  <Text key="login-text" size="lead" color="inherit">
                    {loginLink.label}
                  </Text>
                }
              />
            </>
          )}
        </nav>
      </div>
    );
  };

  const renderCta = () => {
    if (showIvan) {
      return (
        <IvanCta
          isCompact
          body="We're open again at 8:30am. Why not chat to iVan?"
          title=""
          imageSrc={`${process.env.HOST_DOMAIN}/assets/images-optimised/header-ivan.svg`}
        />
      );
    }
    return (
      <Link
        href="tel:01442838195"
        size="large"
        color="inherit"
        className="button -clear"
      >
        01442 838195
      </Link>
    );
  };

  return (
    <header className={cx('header', className)}>
      <div className="header--logo">
        <Link href="/" color="orange" plain>
          <Logo asset="vanarama" />
        </Link>
      </div>
      {renderMenu()}
      <div className="header--compact-menu">
        <Button
          className="header--responsive-icon"
          color="orange"
          fill="clear"
          iconPosition="before"
          label={<Icon icon={<Call />} size="small" name="call-sharp" />}
        />
        <Button
          className="header--responsive-icon"
          color="orange"
          fill="clear"
          iconPosition="before"
          label={<Icon icon={<Menu />} size="small" />}
        />
      </div>
      <div>
        <div className="header--cta">{renderCta()}</div>
        {!!message && (
          <div className="header--notice">
            <Text tag="p" color="darker">
              {message}
            </Text>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
