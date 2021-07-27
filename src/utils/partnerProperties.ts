import Cookies from 'js-cookie';
import { setLocalStorage } from './windowLocalStorage';
import { getSessionStorage } from './windowSessionStorage';
import { Nullish } from '../types/common';
import { Partner_partner_footer as IPartnerFooter } from '../../generated/Partner';

const PARTNER_COOKIE_NAME = 'activePartnership';
const PARTNER_SESSION_ACTIVE = 'partnershipSessionActive';
const CUSTOM_SESSION_FUEL_TYPES = 'customSessionFuelTypes';
const PARTNER_FOOTER = 'partnerFooter';

export interface IPartnerData {
  slug: Nullish<string>;
  color: Nullish<string>;
  uuid: Nullish<string>;
  vehicleTypes: Nullish<string[]>;
  telephone: Nullish<string>;
}

export function isPartnerSessionActive() {
  const partnershipActive = getSessionStorage(PARTNER_SESSION_ACTIVE);
  return !!partnershipActive;
}

export function getPartnerProperties() {
  if (
    Cookies.get(PARTNER_COOKIE_NAME) &&
    getSessionStorage(PARTNER_SESSION_ACTIVE)
  ) {
    return Cookies.getJSON(PARTNER_COOKIE_NAME);
  }
  return undefined;
}

export function getPartnerSlug() {
  if (Cookies.get(PARTNER_COOKIE_NAME)) {
    return Cookies.getJSON(PARTNER_COOKIE_NAME).slug;
  }
  return undefined;
}

export function setPartnerProperties(
  data: IPartnerData | undefined,
  expires: number,
) {
  if (data) {
    Cookies.set(PARTNER_COOKIE_NAME, data, {
      expires,
    });
  }
}

export function removePartnerProperties() {
  Cookies.remove(PARTNER_COOKIE_NAME);
}

export function setSessionFuelTypes(fuelTypes: string[]) {
  Cookies.set(CUSTOM_SESSION_FUEL_TYPES, fuelTypes);
}
export function getSessionFuelTypes() {
  Cookies.get(CUSTOM_SESSION_FUEL_TYPES);
}

export function setPartnerFooter(data: Nullish<IPartnerFooter>) {
  if (data) {
    setLocalStorage(PARTNER_FOOTER, JSON.stringify(data));
  }
}

export function clearInactiveSessionFuelTypes() {
  if (
    Cookies.get(CUSTOM_SESSION_FUEL_TYPES) &&
    !getSessionStorage(PARTNER_SESSION_ACTIVE)
  ) {
    Cookies.remove(CUSTOM_SESSION_FUEL_TYPES);
  }
}

export default getPartnerProperties;
