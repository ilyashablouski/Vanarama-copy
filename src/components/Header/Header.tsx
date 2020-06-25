import React, { FC, memo } from 'react';
// import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
// import Button from '@vanarama/uibook/lib/components/atoms/button';
// import Heading from '@vanarama/uibook/lib/components/atoms/heading';
// import Icon from '@vanarama/uibook/lib/components/atoms/icon';
// import Text from '@vanarama/uibook/lib/components/atoms/text';
// import Logo from '@vanarama/uibook/lib/components/atoms/logo';
// import IvanCta from '@vanarama/uibook/lib/components/molecules/ivan-cta';

// import Call from '@vanarama/uibook/lib/assets/icons/Call';
// import Menu from '@vanarama/uibook/lib/assets/icons/Menu';
// import ChevronDown from '@vanarama/uibook/lib/assets/icons/ChevronDown';

import { ILinkProps } from '../RouterLink/interface';
// import RouterLink from '../RouterLink/RouterLink';

export interface IHeaderProps extends IBaseProps {
  topBarLinks: ILinkProps[];
  loginLink: ILinkProps;
  phoneNumberLink: ILinkProps;
  showIvan?: boolean;
  message?: string;
}

const Header: FC<IHeaderProps> = memo(() => {
  // const {
  //   className,
  //   topBarLinks,
  //   loginLink,
  //   showIvan,
  //   message,
  //   phoneNumberLink,
  // } = props;

  // const renderChildrenMenu = (childrenLinks: ILinkProps[]) => {
  //   return (
  //     <nav data-testid="header--menu-children">
  //       <ul>
  //         {childrenLinks.map((link: ILinkProps) => (
  //           <li key={link.label}>
  //             <RouterLink
  //               link={link}
  //               classNames={{
  //                 size: 'large',
  //                 color: 'black',
  //               }}
  //               className="button -clear"
  //             >
  //               {link.label}
  //             </RouterLink>
  //           </li>
  //         ))}
  //       </ul>
  //     </nav>
  //   );
  // };

  // const renderMenu = () => {
  //   return (
  //     <div className="header--menu" data-testid="header--menu">
  //       <nav className="header--menu-nav">
  //         {!!topBarLinks.length &&
  //           topBarLinks.map(entry => (
  //             <Button
  //               key={entry.label}
  //               className="-multiple"
  //               fill="clear"
  //               color="inherit"
  //               label={
  //                 <>
  //                   <RouterLink link={entry}>
  //                     <Heading size="lead" color="inherit">
  //                       {entry.label}
  //                     </Heading>
  //                     {!!entry.childrenLinks?.length && (
  //                       <Icon color="dark" icon={<ChevronDown />} />
  //                     )}
  //                   </RouterLink>
  //                   {!!entry.childrenLinks?.length &&
  //                     renderChildrenMenu(entry.childrenLinks)}
  //                 </>
  //               }
  //             />
  //           ))}
  //         {loginLink && (
  //           <>
  //             <span className="header--vertical-rule" />
  //             <Button
  //               key={loginLink.label}
  //               color="inherit"
  //               fill="clear"
  //               label={
  //                 <Text size="lead" color="inherit">
  //                   <RouterLink
  //                     link={loginLink}
  //                     className="button -clear"
  //                     classNames={{ size: 'large', color: 'inherit' }}
  //                   >
  //                     {loginLink.label}
  //                   </RouterLink>
  //                 </Text>
  //               }
  //             />
  //           </>
  //         )}
  //       </nav>
  //     </div>
  //   );
  // };

  // const renderCta = () => {
  //   if (showIvan) {
  //     return <IvanCta isCompact />;
  //   }
  //   return (
  //     <RouterLink
  //       link={phoneNumberLink}
  //       className="button -clear"
  //       classNames={{ size: 'large', color: 'inherit' }}
  //     >
  //       01442 838195
  //     </RouterLink>
  //   );
  // };

  // const renderMessage = () => (
  //   <div className="header--notice" data-testid="header--notice">
  //     <Text tag="p" color="darker">
  //       {message}
  //     </Text>
  //   </div>
  // );

  return (
    <header />
    // ToDo: uncomment it when header will be fixed
    // <header className={cx('header', className)} data-testid="header">
    //   <div className="header--logo" data-testid="header--logo">
    //     <RouterLink
    //       link={{ href: '/', label: '' }}
    //       classNames={{ color: 'orange', plain: true }}
    //     >
    //       <Logo asset="vanarama" />
    //     </RouterLink>
    //   </div>
    //   {renderMenu()}
    //   <div className="header--compact-menu" data-testid="header--compact-menu">
    //     <Button
    //       className="header--responsive-icon"
    //       color="orange"
    //       fill="clear"
    //       dataTestId="call-btn"
    //       label={
    //         <RouterLink
    //           className="-clear"
    //           classNames={{ size: 'large', color: 'inherit' }}
    //           link={phoneNumberLink}
    //         >
    //           <Icon icon={<Call />} size="small" name="call-sharp" />
    //         </RouterLink>
    //       }
    //     />
    //     <Button
    //       className="header--responsive-icon"
    //       color="orange"
    //       fill="clear"
    //       iconPosition="before"
    //       dataTestId="menu-btn"
    //       label={<Icon icon={<Menu />} size="small" />}
    //     />
    //   </div>
    //   <div className="header--cta" data-testid="header--cta">
    //     {renderCta()}
    //     {!!message && renderMessage()}
    //   </div>
    // </header>
  );
});

export default Header;
