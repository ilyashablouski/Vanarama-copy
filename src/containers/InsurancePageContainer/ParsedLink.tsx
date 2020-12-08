import dynamic from 'next/dynamic';
import { TColor } from '@vanarama/uibook/lib/types/color';
import { TSize } from '@vanarama/uibook/lib/types/size';
import Skeleton from '../../components/Skeleton';

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Link = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/link'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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
