export interface IAboutProps {
  /* required data for form drop downs, sourced via getInitialProps */
  allDropDowns: any;

  /* cached data for preloading forms when returning from other step in olaf journey */
  preloadData: any;

  /* action to cache form data */
  captchaOlafData: (pageRef: string, data: {}) => void;
}
