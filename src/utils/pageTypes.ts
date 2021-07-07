/* eslint-disable import/prefer-default-export */
export const PAGE_TYPES = {
  homepage: 'Homepage',
  hubPage: 'Hub Page',
  offersPage: 'Offers Page',
  makePage: 'Make Page',
  rangePage: 'Range Page',
  modelPage: 'Model Page',
  vehicleTypePage: 'Vehicle Type Page',
  PLP: 'PLP',
  PDP: 'PDP',
  checkoutPage: 'Checkout Page',
  orderConfirmationPage: 'Order Confirmation Page',
  enquiryConfirmationPage: 'Enquiry Confirmation Page',
  promoPage: 'Promo Page',
  insuranceTypePage: 'Insurance Type Page',
  blogPage: 'Blog Page',
  contentPage: 'Content Page',
  accountDetailPage: 'Account Detail Page',
  comparatorPage: 'Comparator Page',
  reviewPage: 'Review Page',
  eligibilityCheckerPage: 'Eligibility Checker Page',
  ABCPage: 'ABC Page',
  servicePage: 'Service+ Page',
  helpMeChoosePage: 'Help Me Choose Page',
  leaseProductPage: 'Lease Product Page',
  vehicleReview: 'Vehicle Review',
  nonBlogPage: 'Non-Blog',
  wishlist: 'Wishlist',
};

export const SITE_SECTIONS = {
  homepage: 'Homepage',
  cars: 'Cars',
  vans: 'Vans',
  pickUps: 'Pick-Ups',
  electric: 'Electric',
  wishlist: 'Wishlist',
  ecommerce: 'Ecommerce',
  insurance: 'Insurance',
  fleet: 'Fleet',
  contact: 'Contact',
  loginRegister: 'Login/Register',
  myAccount: 'My Account',
  blog: 'Blog',
  other: 'Other',
  proposition: 'Proposition',
  guides: 'Guides',
  reviews: 'Reviews',
  location: 'Location',
};

export const PAGES = [
  {
    pages: [
      '/about-us',
      '/careers',
      '/covid-19-small-business-support',
      '/fan-hub',
      '/fca',
      '/fifa-petition',
      '/leasing-questions',
      '/legal',
      '/locations',
      '/maintenance',
      '/manarama',
      '/national-league',
      '/redundancy-and-life-event-cover',
      '/refer-a-friend',
      '/sitemap',
      '/smiles',
      '/community',
    ],
    pageType: PAGE_TYPES.contentPage,
    siteSection: SITE_SECTIONS.other,
  },
  {
    pages: ['/reviews/vans/[hub]'],
    pageType: PAGE_TYPES.hubPage,
    siteSection: SITE_SECTIONS.pickUps,
  },
  {
    pages: ['/reviews/vans'],
    pageType: PAGE_TYPES.contentPage,
    siteSection: SITE_SECTIONS.pickUps,
  },
  {
    pages: ['/account/login-register'],
    pageType: PAGE_TYPES.accountDetailPage,
    siteSection: SITE_SECTIONS.loginRegister,
  },
  {
    pages: ['/account'],
    pageType: PAGE_TYPES.accountDetailPage,
    siteSection: SITE_SECTIONS.myAccount,
  },
  {
    pages: ['/advanced-breakdown-cover'],
    pageType: PAGE_TYPES.ABCPage,
    siteSection: SITE_SECTIONS.proposition,
  },
  {
    pages: ['/b2b/olaf'],
    pageType: PAGE_TYPES.checkoutPage,
    siteSection: SITE_SECTIONS.ecommerce,
  },
  {
    pages: ['/olaf/about/sole-trader/summary', '/olaf/about/summary'],
    pageType: PAGE_TYPES.orderConfirmationPage,
    siteSection: SITE_SECTIONS.ecommerce,
  },
  {
    pages: ['/olaf/thank-you'],
    pageType: PAGE_TYPES.enquiryConfirmationPage,
    siteSection: SITE_SECTIONS.ecommerce,
  },
  {
    pages: ['/olaf'],
    pageType: PAGE_TYPES.checkoutPage,
    siteSection: SITE_SECTIONS.ecommerce,
  },
  {
    pages: ['/black-friday'],
    pageType: PAGE_TYPES.promoPage,
    siteSection: SITE_SECTIONS.other,
  },
  {
    pages: ['/blog', '/non-blog'],
    pageType: PAGE_TYPES.blogPage,
    siteSection: SITE_SECTIONS.blog,
  },
  {
    pages: ['/car-leasing/[...details-page]'],
    pageType: PAGE_TYPES.PDP,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing/[dynamicParam]/[rangeName]/[bodyStyles]'],
    pageType: PAGE_TYPES.vehicleTypePage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing/[dynamicParam]/[rangeName]'],
    pageType: PAGE_TYPES.rangePage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing/[dynamicParam]'],
    pageType: PAGE_TYPES.makePage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing/all-car-manufacturers', '/car-leasing/search'],
    pageType: PAGE_TYPES.PLP,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing/special-offers'],
    pageType: PAGE_TYPES.offersPage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/car-leasing'],
    pageType: PAGE_TYPES.hubPage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/van-leasing/[...details-page]'],
    pageType: PAGE_TYPES.PDP,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/van-leasing/[dynamicParam]/[rangeName]'],
    pageType: PAGE_TYPES.rangePage,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/van-leasing/[dynamicParam]'],
    pageType: PAGE_TYPES.makePage,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/van-leasing/special-offers'],
    pageType: PAGE_TYPES.offersPage,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/van-leasing'],
    pageType: PAGE_TYPES.PLP,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/club-reward-scheme', '/comparator'],
    pageType: PAGE_TYPES.comparatorPage,
    siteSection: SITE_SECTIONS.proposition,
  },
  {
    pages: ['/contact-us'],
    pageType: PAGE_TYPES.contentPage,
    siteSection: SITE_SECTIONS.contact,
  },
  {
    pages: ['/fleet'],
    pageType: PAGE_TYPES.hubPage,
    siteSection: SITE_SECTIONS.fleet,
  },
  {
    pages: ['/guides'],
    pageType: PAGE_TYPES.leaseProductPage,
    siteSection: SITE_SECTIONS.guides,
  },
  {
    pages: ['/insurance'],
    pageType: PAGE_TYPES.insuranceTypePage,
    siteSection: SITE_SECTIONS.insurance,
  },
  {
    pages: ['/lease-eligibility-checker'],
    pageType: PAGE_TYPES.eligibilityCheckerPage,
    siteSection: SITE_SECTIONS.proposition,
  },
  {
    pages: ['/lease-finance/cars'],
    pageType: PAGE_TYPES.leaseProductPage,
    siteSection: SITE_SECTIONS.cars,
  },
  {
    pages: ['/lease-finance/vans'],
    pageType: PAGE_TYPES.leaseProductPage,
    siteSection: SITE_SECTIONS.vans,
  },
  {
    pages: ['/lease-finance'],
    pageType: PAGE_TYPES.leaseProductPage,
    siteSection: SITE_SECTIONS.other,
  },
  {
    pages: ['/lease-finance'],
    pageType: PAGE_TYPES.leaseProductPage,
    siteSection: SITE_SECTIONS.other,
  },
  {
    pages: ['/leasing-offers'],
    pageType: PAGE_TYPES.offersPage,
    siteSection: SITE_SECTIONS.other,
  },
  {
    pages: ['/pickup-truck-leasing/special-offers'],
    pageType: PAGE_TYPES.PLP,
    siteSection: SITE_SECTIONS.pickUps,
  },
  {
    pages: ['/pickup-truck-leasing'],
    pageType: PAGE_TYPES.PLP,
    siteSection: SITE_SECTIONS.pickUps,
  },
  {
    pages: ['/electric-leasing'],
    pageType: PAGE_TYPES.PLP,
    siteSection: SITE_SECTIONS.electric,
  },
  {
    pages: ['/wishlist'],
    pageType: PAGE_TYPES.wishlist,
    siteSection: SITE_SECTIONS.wishlist,
  },
  {
    pages: ['/'],
    pageType: PAGE_TYPES.homepage,
    siteSection: SITE_SECTIONS.homepage,
  },
];
