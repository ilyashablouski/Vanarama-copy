import Cookies from 'js-cookie';
import { setLocalStorage } from './windowLocalStorage';

const PARTNER_COOKIE_NAME = 'activePartnership';

export interface IPartnerData {
  slug: string;
  color: string;
  uuid: string;
  vehicleTypes: [string];
  telephone: string;
}

interface IPartnerFooter {
  legalStatement: {
    __typename: string;
    body: string;
    name: string;
    title: string;
  };
  linkGroups: [];
}

export function getPartnerProperties() {
  if (Cookies.get(PARTNER_COOKIE_NAME)) {
    const partnerCookie = Cookies.getJSON(PARTNER_COOKIE_NAME);

    return partnerCookie;
  }
  return undefined;
}

export function setPartnerProperties(data: IPartnerData, expires: number) {
  Cookies.set('activePartnership', data, {
    expires,
  });
}

export function setPartnerFooter(data: IPartnerFooter) {
  setLocalStorage('partnerFooter', JSON.stringify(data));
}

export default getPartnerProperties;
