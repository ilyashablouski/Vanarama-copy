module.exports = [
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
