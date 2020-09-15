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
  // non-blog articles
  {
    from: '/covid-19-small-business-support-team-meet-the-team.html',
    to: '/non-blog/covid-19-small-business-support-team-meet-the-team',
  },
  {
    from: '/dpf',
    to: '/non-blog/dpf',
  },
  {
    from: '/fca/our-lenders.html',
    to: '/non-blog/fca/our-lenders',
  },
  {
    from: '/fifa-petition.html',
    to: '/non-blog/fifa-petition',
  },
  {
    from: '/club-reward-scheme.html',
    to: '/non-blog/club-reward-scheme',
  },
  {
    from: '/covid-19-small-business-support.html',
    to: '/non-blog/covid-19-small-business-support',
  },
  {
    from: '/car-leasing/fca/our-lenders.html',
    to: '/non-blog/car-leasing/fca/our-lenders',
  },
  {
    from: '/used-van-vs-new-van.html',
    to: '/non-blog/used-van-vs-new-van',
  },
  {
    from: '/vanarama-referral-rewards-referred.html',
    to: '/non-blog/vanarama-referral-rewards-referred',
  },
  {
    from: '/car-leasing/mileage-booster-and-damage-cover/terms-and-conditions.html',
    to: '/non-blog/car-leasing/mileage-booster-and-damage-cover/terms-and-conditions',
  },
  {
    from: '/about-us/:article.html',
    to: '/non-blog/about-us/:article',
  },
  {
    from: '/careers/:article.html',
    to: '/non-blog/careers/:article',
  },
  {
    from: '/careers/case-studies/:article.html',
    to: '/non-blog/careers/case-studies/:article',
  },
  {
    from: '/careers/sunday-times-top-100-staff-comments/:article.html',
    to: '/non-blog/careers/sunday-times-top-100-staff-comments/:article',
  },
  {
    from: '/careers/vacansies/:article.html',
    to: '/non-blog/careers/vacansies/:article',
  },
  {
    from: '/authors/:article.html',
    to: '/non-blog/authors/:article',
  },
  {
    from: '/contact-us/:article.html',
    to: '/non-blog/contact-us/:article',
  },
  {
    from: '/finance-info/:article.html',
    to: '/non-blog/finance-info/:article',
  },
  {
    from: '/finance-info/:article.html',
    to: '/non-blog/finance-info/:article',
  },
  {
    from: '/finance-info/:article.html',
    to: '/non-blog/finance-info/:article',
  },
// ^ non-blog articles
];
