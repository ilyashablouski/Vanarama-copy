import cx from 'classnames';
import React from 'react';

import Text from 'core/atoms/text';
import Heading from 'core/atoms/heading';
import ImageV2 from 'core/atoms/image/ImageV2';
import Card from 'core/molecules/cards';
import { IBaseProps } from 'core/interfaces/base';

interface IProps extends IBaseProps {
  title: string;
  body: string;
  imageSrc: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  isCompact?: boolean;
}

const IvanCta: React.FC<IProps> = ({
  isCompact,
  className,
  title,
  body,
  imageSrc,
  imageHeight,
  imageWidth,
  children,
}) => {
  if (isCompact) {
    return (
      <div className={cx(className, 'ivan-cta--compact')}>
        <Text color="white" size="xsmall">
          {body}
        </Text>
        <ImageV2
          width={imageWidth}
          height={imageHeight}
          src={imageSrc}
          alt={title}
          plain
        />
      </div>
    );
  }
  return (
    <Card inline className={cx(className, 'ivan-cta')}>
      <ImageV2
        className="card-image"
        width={imageWidth}
        height={imageHeight}
        src={imageSrc}
        alt={title}
        plain
      />
      <div className="title">
        <Heading size="lead" color="black">
          {title}
        </Heading>
      </div>
      <Text color="dark" size="regular">
        {body}
      </Text>
      {children}
    </Card>
  );
};

export default IvanCta;
