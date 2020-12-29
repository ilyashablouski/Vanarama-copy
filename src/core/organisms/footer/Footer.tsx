import React, { FC, memo } from 'react';
import cx from 'classnames';

import { ILink } from 'core/interfaces/link';
import Heading from '../../atoms/heading';
import Link from '../../atoms/link';
import Text from '../../atoms/text';
import Logo from '../../atoms/logo';

import { IFooterProps } from './interfaces';
import Button from '../../atoms/button';

import LogoFacebook from '../../assets/icons/LogoFacebook';
import LogoTwitter from '../../assets/icons/LogoTwitter';
import LogoInstagram from '../../assets/icons/LogoInstagram';
import LogoLinkedin from '../../assets/icons/LogoLinkedin';
import LogoYoutube from '../../assets/icons/LogoYoutube';

const Footer: FC<IFooterProps> = memo(props => {
  const {
    className,
    emailAddress,
    phoneNumber,
    openingTimes,
    headingZero,
    headingOne,
    headingTwo,
    headingThree,
    linkGroupOne,
    linkGroupTwo,
    linkGroupThree,
    legalText,
  } = props;

  const actualYear = new Date().getFullYear();

  const renderLinkGroup = (
    linkGroup: ILink[],
    heading: string | null = null,
  ) => (
    <div className="footer--column">
      {heading && (
        <Heading size="small" color="medium">
          {heading}
        </Heading>
      )}
      <ul>
        {linkGroup.map(entry => (
          <li key={entry.label}>
            <Link color="white" size="regular" plain href={entry.href}>
              {entry.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSocialLink = () => (
    <div className="footer--social-icons">
      <Button
        color="medium"
        size="small"
        fill="outline"
        round
        icon={<LogoFacebook />}
        iconPosition="before"
      />
      <Button
        color="medium"
        size="small"
        fill="outline"
        round
        icon={<LogoTwitter />}
        iconPosition="before"
      />
      <Button
        color="medium"
        size="small"
        fill="outline"
        round
        icon={<LogoInstagram />}
        iconPosition="before"
      />
      <Button
        color="medium"
        size="small"
        fill="outline"
        round
        icon={<LogoLinkedin />}
        iconPosition="before"
      />
      <Button
        color="medium"
        size="small"
        fill="outline"
        className="-round"
        icon={<LogoYoutube />}
        iconPosition="before"
      />
    </div>
  );

  return (
    <footer className={cx('footer', className)}>
      <div className="footer--column">
        {headingZero && (
          <Heading size="small" color="medium">
            {headingZero}
          </Heading>
        )}
        <ul>
          {phoneNumber && (
            <li className="-mb-300">
              <Text size="small" color="medium">
                Phone
              </Text>{' '}
              <Link color="white" href={`tel:${phoneNumber}`} size="small">
                {phoneNumber}
              </Link>
            </li>
          )}
          {openingTimes &&
            openingTimes.map(entry => (
              <li key={entry.day}>
                <Text size="small" color="medium" key={`${entry.day}_day`}>
                  {entry.day}
                </Text>{' '}
                <Text size="small" color="white" key={`${entry.time}_time`}>
                  {entry.time}
                </Text>
              </li>
            ))}
          <br />
          {emailAddress && (
            <li className="-mt-300">
              <Link
                plain
                size="small"
                color="white"
                href={`mail:${emailAddress}`}
              >
                {emailAddress}
              </Link>
            </li>
          )}
        </ul>
        <li>{renderSocialLink()}</li>
        <Logo asset="bvrla" />
      </div>

      {/* Link Group One */}
      {linkGroupOne && renderLinkGroup(linkGroupOne, headingOne)}

      {/* Link Group Two */}
      {linkGroupTwo && renderLinkGroup(linkGroupTwo, headingTwo)}

      {/* Link Group Three */}
      {linkGroupThree && renderLinkGroup(linkGroupThree, headingThree)}
      <div className="footer--divider -fullwidth" />
      <Text tag="p" size="xsmall" color="light" className="footer--copyright">
        &copy;
        {actualYear} Autorama UK LTD. All rights reserved.
      </Text>
      {legalText && (
        <Text tag="p" size="xsmall" color="medium">
          {legalText}
        </Text>
      )}
    </footer>
  );
});

export default Footer;
