import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import Text from '../../atoms/text';
import Image from '../../atoms/image';
import Card from '../cards';
import Heading from '../../atoms/heading';

interface IProps extends IBaseProps {
  title: string;
  body: string;
  imageSrc: string;
  isCompact?: boolean;
}

const IvanCta: React.FC<IProps> = ({
  isCompact,
  className,
  title,
  body,
  imageSrc,
  children,
}) => {
  if (isCompact) {
    return (
      <div className={cx(className, 'ivan-cta--compact')}>
        <Text color="white" size="xsmall">
          {body}
        </Text>
        <Image src={imageSrc} plain />
      </div>
    );
  }
  return (
    <Card inline className={cx(className, 'ivan-cta')}>
      <Image src={imageSrc} plain className="card-image" />
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
