export const accountMock = {
  login: {
    success: {
      data: {
        login: 'token',
      },
    },
    failure: {
      data: {
        error: 'error',
      },
    },
  },
  register: {
    success: {
      data: 'success',
    },
    failure: {
      data: {
        error: 'error',
      },
    },
  },
};
