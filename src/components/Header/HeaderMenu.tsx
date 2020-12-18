/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { IBaseProps } from 'core/interfaces/base';
import { IHeaderLink } from './Header';
import Skeleton from '../Skeleton';

const HeaderMenuLink = dynamic(() => import('./HeaderMenuLink'));
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

export interface IHeaderMenuProps extends IBaseProps {
  menuLinks: IHeaderLink[];
  open: boolean;
  onClickMenu: () => void;
}

const HeaderMenu: FC<IHeaderMenuProps> = memo(props => {
  const { menuLinks, open, onClickMenu } = props;

  return (
    <nav
      id="nav"
      className={cx('menu', {
        '-open': open,
      })}
    >
      <ul className="menu-primary">
        <li className="menu-li menu-title">
          <Button
            withoutDefaultClass
            className="link"
            onClick={() => onClickMenu()}
            dataTestId="menu-title"
            color="black"
            fill="clear"
            label="Menu"
          />
        </li>
        {!!menuLinks.length &&
          menuLinks.map((entry, idx) => (
            <HeaderMenuLink
              key={`${entry.id}_${idx.toString()}`}
              link={entry}
              isMenuOpen={open}
            />
          ))}
      </ul>
    </nav>
  );
});

export default HeaderMenu;
