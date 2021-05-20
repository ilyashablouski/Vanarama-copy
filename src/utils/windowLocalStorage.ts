export const setLocalStorage = (key: string, value: any) => {
  window?.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return window?.localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  return window?.localStorage.removeItem(key);
};
