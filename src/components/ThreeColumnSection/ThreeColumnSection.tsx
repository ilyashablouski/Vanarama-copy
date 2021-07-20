import React from 'react';
import Image from 'core/atoms/image/Image';
import { getSectionsData } from '../../utils/getSectionsData';

type ThreeColumnSectionProps = {
  cards: [];
  title: string;
};

const ThreeColumnSection: React.FC<ThreeColumnSectionProps> = ({
  title,
  cards,
}) => {
  if (!cards.length) {
    return null;
  }

  return (
    <>
      <div className="row:default">
        <h3 className="heading -large -black -a-center -mb-500">{title}</h3>

        <div className="row:cards-3col -a-center -mb-500">
          {cards?.map((item: any) => {
            return (
              <>
                <div>
                  <Image
                    src={
                      getSectionsData(['image', 'file', 'url'], item) ||
                      'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg'
                    }
                  />
                  <p className="heading -lead -black -pv-300">{item.body}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ThreeColumnSection;
