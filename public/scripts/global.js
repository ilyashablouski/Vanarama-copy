function addAdditionalData(data) {
  try {
    JSON.parse(data);
  } catch (e) {
    console.error(`additionalData doesn't contain JSON\n${e}`);
    return;
  }
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('additionalData', data);
}

// eslint-disable-next-line no-undef
window.vanarama = {
  addAdditionalData,
};
