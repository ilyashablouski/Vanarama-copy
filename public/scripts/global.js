function addAdditionalData(data) {
  try {
    JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`additionalData doesn't contain JSON\n${error}`);
    return;
  }
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('additionalData', data);
}

// eslint-disable-next-line no-undef
window.vanarama = {
  addAdditionalData,
};
