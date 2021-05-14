export const setSessionStorage = (key: string, value: any) => {
  window?.sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => {
  return window?.sessionStorage.getItem(key);
};

export const setObjectAsSessionStorage = (key: string, value: any) => {
  window?.sessionStorage.setItem(key, JSON.stringify(value));
};

export const getObjectFromSessionStorage = (key: any) => {
  if (window?.sessionStorage.getItem(key)) {
    return JSON.parse(window?.sessionStorage.getItem(key) || '');
  }
  return null;
};
