import React, { FC } from 'react';
import cx from 'classnames';
import { ICardProps } from '../interfaces';
import Card from '..';
import { IMediaProps } from '../../../atoms/media/interface';
import Media from '../../../atoms/media';

export interface IOrderDetailsProps extends ICardProps {
  media: IMediaProps;
}

const MediaCard: FC<IOrderDetailsProps> = props => {
  const { media, children } = props;

  return (
    <Card {...props}>
      <Media
        {...media}
        className={cx('card-image', media.className)}
        dataTestId="card-media"
      />
      {children}
    </Card>
  );
};

export default MediaCard;
