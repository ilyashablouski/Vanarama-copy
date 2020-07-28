import Link from '@vanarama/uibook/lib/components/atoms/link';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { TColor } from '@vanarama/uibook/lib/types/color';
import { TSize } from '@vanarama/uibook/lib/types/size';

export interface IParsedLinkProps {
  title: string;
  href: string;
  color?: TColor;
  fill?: 'solid' | 'outline' | 'clear';
  icon?: React.ReactNode;
  iconColor?: TColor;
  iconPosition?: 'before' | 'after';
  round?: boolean;
  size?: TSize;
  withoutDefaultClass?: boolean;
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
