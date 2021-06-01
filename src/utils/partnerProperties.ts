import Cookies from 'js-cookie';
import { setLocalStorage } from './windowLocalStorage';
import { getSessionStorage } from './windowSessionStorage';
import { mapFuelSearchQueryToParam } from '../containers/SearchPageContainer/helpers';
import { Nullish } from '../types/common';
import { Partner_partner_footer as IPartnerFooter } from '../../generated/Partner';

const PARTNER_COOKIE_NAME = 'activePartnership';

export interface IPartnerData {
  slug: Nullish<string>;
  color: Nullish<string>;
  uuid: Nullish<string>;
  vehicleTypes: Nullish<string[]>;
  telephone: Nullish<string>;
}

export function getPartnerProperties() {
  if (
    Cookies.get(PARTNER_COOKIE_NAME) &&
    getSessionStorage('partnershipSessionActive')
  ) {
    return Cookies.getJSON(PARTNER_COOKIE_NAME);
  }
  return undefined;
}

export function setPartnerProperties(
  data: IPartnerData | undefined,
  expires: number,
) {
  if (data) {
    Cookies.set('activePartnership', data, {
      expires,
    });
  }
}

export function setSessionFuelTypes(fuelTypes: string[]) {
  Cookies.set('customSessionFuelTypes', mapFuelSearchQueryToParam(fuelTypes));
}

export function setPartnerFooter(data: Nullish<IPartnerFooter>) {
  if (data) setLocalStorage('partnerFooter', JSON.stringify(data));
}

export function clearInactiveSessionFuelTypes() {
  if (
    Cookies.get('customSessionFuelTypes') &&
    !getSessionStorage('partnershipSessionActive')
  ) {
    Cookies.remove('customSessionFuelTypes');
  }
}

export default getPartnerProperties;
