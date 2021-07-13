import React, { FunctionComponent } from 'react';
import Image from "core/atoms/image/Image";
import {getSectionsData} from "../../utils/getSectionsData";
import { Item } from './interfaces';

type ThreeColumnSectionProps = {
  title?: string;
  data?: Item[];
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
          {data.map(item => {
            return (
              <>
                <div>
                  <Image
                    src={getSectionsData(['featured2', 'image', 'file', 'url'], 'noData') ||
                  'https://res.cloudinary.com/diun8mklf/image/upload/c_fill,g_center,h_425,q_auto:best,w_800/v1581538982/cars/AudiQ30718_4_k5ojqt.jpg' } />
                  <p className="heading -lead -black -pv-300">
                    {item.title}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};