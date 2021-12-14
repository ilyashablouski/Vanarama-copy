import { FC, ReactNode } from 'react';

interface IColoredSection {
  children: ReactNode;
  backgroundColor?: string;
  height?: string;
  className?: string;
}

const ColoredSection: FC<IColoredSection> = ({
  children,
  backgroundColor,
  className,
}) => {
  return (
    <section
      className={`row:bg-hero ${className}`}
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      {children}
    </section>
  );
};

export default ColoredSection;
