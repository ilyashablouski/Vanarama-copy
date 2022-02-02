import React from 'react';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';
import { IBaseProps } from 'core/interfaces/base';

const Pagination = ({ dataUiTestId }: IBaseProps) => {
  return (
    <div className="carousel--nav">
      <button
        className="carousel--nav-arrow swiper-prev"
        type="button"
        data-uitestid={
          dataUiTestId
            ? `${dataUiTestId}_swiper-pagination_arrow-prev`
            : undefined
        }
      >
        <Icon icon={<ChevronBack />} color="darker" size="regular" />
      </button>

      <div
        className="swiper-pagination"
        data-uitestid={
          dataUiTestId ? `${dataUiTestId}_swiper-pagination` : undefined
        }
      />

      <button
        className="carousel--nav-arrow swiper-next"
        type="button"
        data-uitestid={
          dataUiTestId
            ? `${dataUiTestId}_swiper-pagination_arrow-next`
            : undefined
        }
      >
        <Icon icon={<ChevronForward />} color="darker" size="regular" />
      </button>
    </div>
  );
};

export default Pagination;
