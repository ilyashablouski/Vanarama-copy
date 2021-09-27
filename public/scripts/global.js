function addAdditionalData(data) {
  // eslint-disable-next-line no-undef
  window.localStorage.setItem('additionalData', JSON.stringify(data));
}

// eslint-disable-next-line no-undef
window.vanarama = {
  addAdditionalData,
};

// TODO: Remove after iPro integration
const mockedData = { test: 'test' };
addAdditionalData(mockedData);
