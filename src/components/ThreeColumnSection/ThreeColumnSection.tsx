import React from 'react';
import Image from 'core/atoms/image/Image';
import { getSectionsData } from '../../utils/getSectionsData';
import { GenericPageQuery_genericPage_sectionsAsArray_cards_cards_image } from '../../../generated/GenericPageQuery';

type ThreeColumnSectionProps = {
  cards: CardItem[];
  title: string;
};

interface CardItem {
  image: GenericPageQuery_genericPage_sectionsAsArray_cards_cards_image;
  body: string;
}

const ThreeColumnSection: React.FC<ThreeColumnSectionProps> = ({
  title,
  cards,
}) => {
  if (!cards.length) {
    return null;
  }

  const defaultImage: string =
    'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg';

  return (
    <>
      <div className="row:default">
        <h3 className="heading -large -black -a-center -mb-500">{title}</h3>

        <div className="row:cards-3col -a-center -mb-500">
          {cards?.map((item: CardItem, idx: number) => {
            return (
              <>
                <div key={idx.toString()}>
                  <Image
                    src={
                      getSectionsData(['image', 'file', 'url'], item) ||
                      defaultImage
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
