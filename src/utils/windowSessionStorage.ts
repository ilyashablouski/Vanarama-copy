export const setSessionStorage = (key: string, value: any) => {
  window?.sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key: string) => {
  window?.sessionStorage.removeItem(key);
};

export const getSessionStorage = (key: string) => {
  return window?.sessionStorage.getItem(key);
};

export const setObjectAsSessionStorage = (key: string, value: any) => {
  window?.sessionStorage.setItem(key, JSON.stringify(value));
};

export const getObjectFromSessionStorage = (key: any) => {
  if (window && window?.sessionStorage.getItem(key)) {
    return JSON.parse(window?.sessionStorage.getItem(key) || '');
  }
  return null;
};
