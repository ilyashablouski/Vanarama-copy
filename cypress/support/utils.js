export const APP_URL = 'http://localhost:6601';
export const VAN_LEASING_TEST_ID = 'vans-search-page';

export const isMobile = () => {
  return (
    Cypress.config('viewportWidth') <
    Cypress.env('mobileViewportWidthBreakpoint')
  );
};

export const getFullPriceFromCard = element => {
  const pricePartOne = element.querySelector('.price--pounds').textContent;
  const pricePartTwo = element.querySelectorAll('.price--sub')[1].textContent;
  return Number.parseFloat(pricePartOne + pricePartTwo);
};

export const checkDESCSortingOrder = $cards => {
  const isCorrectOrder = Array.from($cards).every((item, index, array) => {
    const currPrice = getFullPriceFromCard(item);
    const nextPrice = array[index + 1]
      ? getFullPriceFromCard(array[index + 1])
      : 0;
    return currPrice >= nextPrice;
  });
  expect(isCorrectOrder).to.eq(true);
};

export const checkOfferLabel = $cards => {
  const hasHotOfferLabel = Array.from($cards).some(
    item => !!item.querySelectorAll(`div[data-uitestid$="hot-offer"]`),
  );
  expect(hasHotOfferLabel).to.eq(true);
};
