import React from 'react';
import Icon from 'core/atoms/icon';
import ChevronBack from 'core/assets/icons/ChevronBack';
import ChevronForward from 'core/assets/icons/ChevronForward';

const Pagination = () => {
  return (
    <div className="carousel--nav">
      <button className="carousel--nav-arrow swiper-prev" type="button">
        <Icon icon={<ChevronBack />} color="darker" size="regular" />
      </button>

      <div className="swiper-pagination" />

      <button className="carousel--nav-arrow swiper-next" type="button">
        <Icon icon={<ChevronForward />} color="darker" size="regular" />
      </button>
    </div>
  );
};

export default Pagination;
