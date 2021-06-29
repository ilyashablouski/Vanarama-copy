export const addHeapUserIdentity = (userID: string) => {
  try {
    // @ts-ignore
    window.heap?.identify(userID);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Heap error', error);
  }
};

export const addHeapUserProperties = (properties: {}) => {
  try {
    // @ts-ignore
    window.heap?.addUserProperties(properties);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Heap error', error);
  }
};
