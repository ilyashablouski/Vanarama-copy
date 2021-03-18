export const addHeapUserIdentity = (userID: string) => {
    //@ts-expect-error
    window.heap?.identify(userID)
}

export const addHeapUserProperties = (properties: {}) => {
    //@ts-expect-error
    window.heap?.addUserProperties(properties)
}