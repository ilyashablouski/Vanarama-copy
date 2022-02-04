// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars

namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
  interface cy {
    scrollToFooter: () => void;
    visitAndWait: (
      appRoute: string,
      endpoints: {
        route: string;
        alias: string
      }[]) => void;
    clearSessionStorage: () => void;
    loadMoreBtn: (dataUiTestId: string) => void;
    breadcrumbsNavigation: (params: {
      link: string;
      breadcrumb: string;
    }) => void;
    checkSpecialOffer: (dataUiTestId: string) => void;
    sortDESC: (dataUiTestId: string) => null;
    addItemToCompare: (params: { dataUiTestId: string, cardContainer: string }) => void;
    addItemToWishlist: (params: { dataUiTestId: string, cardContainer: string }) => void;
    openDetailsPage: (params: { dataUiTestId: string, cardContainer: string }) => void;
    termsAndConditions: (params: {
      dataUiTestId: string;
      link: string;
    }) => void;
    changeLeaseType: (dataUiTestId: string) => void;
    getAttached: (selector: string) => void;
  }
}
