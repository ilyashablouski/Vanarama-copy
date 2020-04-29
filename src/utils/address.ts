interface TAddress {
  city: string | null;
  lineOne: string | null;
  lineTwo: string | null;
  postcode: string | null;
}

// eslint-disable-next-line import/prefer-default-export
export const addressToDisplay = <T extends TAddress>({
  city,
  lineOne,
  lineTwo,
  postcode,
}: T) => [lineOne, lineTwo, city, postcode].filter(Boolean).join(', ');
