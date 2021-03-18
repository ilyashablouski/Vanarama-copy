export const addHeapUserIdentity = (userID: string) => {
    //@ts-ignore
    window.heap?.identify(userID)
};

export const addHeapUserProperties = (properties: {}) => {
    //@ts-ignore
    window.heap?.addUserProperties(properties)
};
