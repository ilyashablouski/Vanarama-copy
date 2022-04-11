function addAdditionalData(data) {
  try {
    JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("additionalData doesn't contain JSON\n".concat(error));
    return;
  }
  window.localStorage.setItem('additionalData', data);
}

window.vanarama = {
  addAdditionalData,
};
