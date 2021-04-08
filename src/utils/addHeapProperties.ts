export const addHeapUserIdentity = (userID: string) => {
  try {
    // @ts-ignore
    window.heap?.identify(userID);
  } catch (error) {
    console.error(error);
  }
};

export const addHeapUserProperties = (properties: {}) => {
  try {
    // @ts-ignore
    window.heap?.addUserProperties(properties);
  } catch (error) {
    console.error(error);
  }
};
