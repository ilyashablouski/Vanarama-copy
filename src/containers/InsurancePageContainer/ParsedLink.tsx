import React from 'react';
import dynamic from 'next/dynamic';
import { TColor } from '../../types/color';
import { TSize } from '../../types/size';
import Skeleton from '../../components/Skeleton';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Link = dynamic(() => import('core/atoms/link'), {
  loading: () => <Skeleton count={1} />,
});

export interface IParsedLinkProps {
  title: string;
  href: string;
  color?: TColor;
  fill?: 'solid' | 'outline' | 'clear';
  size?: TSize;
  className?: string;
}

export const ParsedLink = ({
  title,
  fill,
  href,
  size,
  className,
  color,
}: IParsedLinkProps) => (
  <Link href={href}>
    <Button
      label={title}
      color={color}
      fill={fill}
      size={size}
      className={className}
    />
  </Link>
);
