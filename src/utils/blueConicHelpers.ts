interface IBlueConicProfile {
  setRefusedObjectives: (ids: string[]) => void;
  setConsentedObjectives: (ids: string[]) => void;
  getRefusedObjectives: () => string[];
  getConsentedObjectives: () => string[];
}

declare global {
  interface Window {
    blueConicClient?: {
      profile: {
        updateProfile: () => void;
        getProfile: () => IBlueConicProfile;
      };
    };
  }
}

const blueConicIds = [
  'analysing_or_predicting_preferences_or_behaviour',
  'tracking_and_profiling_for_direct_marketing_and_advertising',
  'personalised_content',
];

function getUserProfile() {
  return window.blueConicClient?.profile?.getProfile();
}

function updateUserProfile() {
  window.blueConicClient?.profile?.updateProfile();
}

export function acceptCookieBlueConic() {
  getUserProfile()?.setConsentedObjectives(blueConicIds);
  updateUserProfile();
}

export function declineCookieBlueConic() {
  getUserProfile()?.setRefusedObjectives(blueConicIds);
  updateUserProfile();
}

export function shouldRenderCookieBar() {
  const profile = getUserProfile();

  return !(
    profile?.getConsentedObjectives()?.length ||
    profile?.getRefusedObjectives()?.length
  );
}
