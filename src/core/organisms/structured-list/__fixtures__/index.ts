export const defaultList = [
  {
    label: 'Email',
    value: 'example@example.com',
    id: 'email',
    dataTestId: 'email-value',
  },
  {
    label: 'Fullname',
    value: 'Mr John Doe',
    id: 'fullname',
    dataTestId: 'full-name-value',
  },
  {
    label: 'Mobile',
    value: '012100000',
    id: 'mobile',
    dataTestId: 'mobile-value',
  },
];

export const editableList = [
  {
    textEdit: true,
    label: 'Email',
    value: 'example@example.com',
    name: 'email',
    id: 'email',
  },
  {
    textEdit: true,
    label: 'Fullname',
    value: 'Mr John Doe',
    name: 'fullname',
    id: 'fullname',
  },
  {
    textEdit: true,
    label: 'Mobile',
    value: '012100000',
    name: 'mobile',
    id: 'mobile',
  },
  {
    selectEdit: true,
    label: 'Country Of Birth',
    value: 'United Kingdom',
    options: {
      data: ['Unitied Kingdom', 'Canada', 'Unitied States'],
      favourites: ['United Kingdom'],
    },
    name: 'cob',
    id: 'cob',
  },
];
