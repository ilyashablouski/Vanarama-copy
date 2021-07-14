import React, { FunctionComponent } from 'react';
import Image from 'core/atoms/image/Image';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  GenericPageQuery_genericPage_sectionsAsArray,
  GenericPageQuery_genericPage_sectionsAsArray_cards_cards,
} from '../../../generated/GenericPageQuery';

type ThreeColumnSectionProps = {
  title?: string;
  data?: GenericPageQuery_genericPage_sectionsAsArray | null;
};

export const ThreeColumnSection: FunctionComponent<ThreeColumnSectionProps> = ({
  title,
  data,
}) => {
  return (
    <>
      <div className="row:default">
        <h3 className="heading -large -black -a-center -mb-500">{title}</h3>

        <div className="row:cards-3col -a-center -mb-500">
          {data?.cards?.map(item => {
            console.log(item);
            return (
              <>
                <div>
                  <Image
                    src={
                      getSectionsData(
                        ['featured2', 'image', 'file', 'url'],
                        'noData',
                      ) ||
                      'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg'
                    }
                  />
                  <p className="heading -lead -black -pv-300">{item?.cards}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
