module.exports = [
  {
    source: '/:manufacturer-:vehicleType-leasing/:model/:description.html',
    destination: '/:vehicleType-leasing/:manufacturer/:model/:description',
  },
  {
    source:
      '/:manufacturer-:vehicleType-leasing/:model/:bodyStyle/:description.html',
    destination:
      '/:vehicleType-leasing/:manufacturer/:model/:bodyStyle/:description',
  },
  {
    source: '/:manufacturer-:vehicleType-leasing.html',
    destination: '/:vehicleType-leasing/:manufacturer',
  },
  {
    source: '/:manufacturer-:vehicleType-leasing/:model.html',
    destination: '/:vehicleType-leasing/:manufacturer/:model',
  },
  {
    source: '/car-leasing/small.html',
    destination: '/car-leasing/city-car',
  },
  {
    source: '/car-leasing/:bodyStyle.html',
    destination: '/car-leasing/:bodyStyle',
  },
  {
    source: '/car-leasing/4x4-suv.html',
    destination: '/car-leasing/4x4',
  },
  {
    source: '/car-leasing/eco.html',
    destination: '/car-leasing/electric',
  },
  {
    source: '/specialist-van-leasing.html',
    destination: '/van-leasing/Specialist',
  },
  {
    source: '/:bodyStyle-leasing.html',
    destination: '/van-leasing/:bodyStyle',
  },
  {
    source: '/automatic-vans.html',
    destination: '/van-leasing/automatic',
  },
];
