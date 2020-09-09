module.exports = [
  // {
  //   from: '/seat-car-leasing/ibiza/hatchback/1-0-fr-ez-5dr-161392.html',
  //   to: '/car-leasing/seat/ibiza/hatchback/10-fr-ez-5-doors',
  // },
  // {
  //   from:
  //     '/audi-car-leasing/a1/sportback/35-tfsi-vorsprung-5dr-s-tronic-163825.html',
  //   to: '/car-leasing/audi/a1/hatchback/35-tfsi-vorsprung-5-doors-s-tronic',
  // },
  {
    from: '/:manufacturer-:vehicleType-leasing.html',
    to: '/:vehicleType-leasing/:manufacturer',
  },
  {
    from: '/:manufacturer-:vehicleType-leasing/:model.html',
    to: '/:vehicleType-leasing/:manufacturer/:model',
  },
  {
    from: '/car-leasing/small.html',
    to: '/car-leasing/city-car',
  },
  {
    from: '/car-leasing/:bodyStyle.html',
    to: '/car-leasing/:bodyStyle',
  },
  {
    from: 'car-leasing/4x4-suv.html',
    to: '/car-leasing/4x4',
  },
  {
    from: '/car-leasing/eco.html',
    to: '/car-leasing/electric',
  },
  {
    from: '/specialist-van-leasing.html',
    to: '/van-leasing/Specialist',
  },
  {
    from: '/:bodyStyle-leasing.html',
    to: '/van-leasing/:bodyStyle',
  },
  {
    from: '/automatic-vans.html',
    to: '/van-leasing/automatic',
  },
];
