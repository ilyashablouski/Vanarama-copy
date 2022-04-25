import { getLocalStorage, setLocalStorage } from './windowLocalStorage';

interface IBlueConicProfile {
  setRefusedObjectives: (ids: string[]) => void;
  setConsentedObjectives: (ids: string[]) => void;
  getRefusedObjectives: () => string[];
  getConsentedObjectives: () => string[];
}

declare global {
  interface Window {
    blueConicClient?: {
      event: {
        subscribe: (
          eventName: string,
          handlerObject: object,
          handlerFunction: () => void,
        ) => void;
      };
      profile: {
        updateProfile: () => void;
        getProfile: () => IBlueConicProfile;
      };
    };
  }
}

export enum CookiePreferencesTypeEnum {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

export const COOKIE_PREFERENCES_STORAGE_KEY = 'cookiePreferences';
const BLUE_CONIC_OBJECTIVE_LIST = [
  'analysing_or_predicting_preferences_or_behaviour',
  'tracking_and_profiling_for_direct_marketing_and_advertising',
  'personalised_content',
];

export function isBlueConicClientLoaded() {
  // https://support.blueconic.com/hc/en-us/articles/202605221-JavaScript-front-end-API#blueconicclient-methods
  return (
    typeof window.blueConicClient !== 'undefined' &&
    typeof window.blueConicClient.event !== 'undefined' &&
    typeof window.blueConicClient.event.subscribe !== 'undefined'
  );
}

function getUserProfile() {
  return window.blueConicClient?.profile?.getProfile();
}
function updateUserProfile() {
  window.blueConicClient?.profile?.updateProfile();
}

function setBlueConicConsentedObjectives() {
  getUserProfile()?.setConsentedObjectives(BLUE_CONIC_OBJECTIVE_LIST);
  updateUserProfile();
}
function setBlueConicRefusedObjectives() {
  getUserProfile()?.setRefusedObjectives(BLUE_CONIC_OBJECTIVE_LIST);
  updateUserProfile();
}

export function updateBlueConicCookiePreferences() {
  const cookiePreferences = getLocalStorage(COOKIE_PREFERENCES_STORAGE_KEY);

  switch (cookiePreferences) {
    case CookiePreferencesTypeEnum.ACCEPT:
      setBlueConicConsentedObjectives();
      break;
    case CookiePreferencesTypeEnum.DECLINE:
      setBlueConicRefusedObjectives();
      break;
    default:
      break;
  }
}

export function acceptBlueConicCookie() {
  setBlueConicConsentedObjectives();
  setLocalStorage(
    COOKIE_PREFERENCES_STORAGE_KEY,
    CookiePreferencesTypeEnum.ACCEPT,
  );
}
export function declineBlueConicCookie() {
  setBlueConicRefusedObjectives();
  setLocalStorage(
    COOKIE_PREFERENCES_STORAGE_KEY,
    CookiePreferencesTypeEnum.DECLINE,
  );
}
