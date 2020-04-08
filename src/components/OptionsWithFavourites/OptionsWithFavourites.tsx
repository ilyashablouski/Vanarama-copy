import React from 'react';
import { IOptionsWithFavouritesProps } from './interfaces';

/**
 * A helper component that renders select options with the "favourite"
 * options on top.
 */
const OptionsWithFavourites: React.FC<IOptionsWithFavouritesProps> = ({
  options,
}) => (
  <>
    {options?.favourites?.map(favourite => (
      <option key={favourite} value={favourite}>
        {favourite}
      </option>
    ))}
    {/* Only show the separator if there are favourites */}
    {options?.favourites?.length > 0 && <option disabled>---</option>}
    {options?.data?.map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </>
);

export default OptionsWithFavourites;
