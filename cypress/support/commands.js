/* eslint-disable cypress/no-unnecessary-waiting */
import {
  isMobile,
  checkOfferLabel,
  getFullPriceFromCard,
  checkDESCSortingOrder,
} from './utils';

Cypress.Commands.add('scrollToFooter', () => {
  const timeToWait = 500;
  let timeoutMs = 3000;
  while (timeoutMs > 0) {
    timeoutMs -= timeToWait;
    cy.wait(timeToWait);
    cy.window().scrollTo('bottom');
  }
});

Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then(window => window.sessionStorage.clear());
});

Cypress.Commands.add('visitAndWait', (appRoute, endpoints) => {
  // iterate over endpoints and alias them
  endpoints.forEach(({ route, alias }) => {
    cy.intercept(route).as(alias);
  });

  // visit a page in your application
  cy.visit(appRoute);

  // wait for all of the endpoints to respond before beginning tests
  cy.wait(endpoints.map(({ alias }) => `@${alias}`));
});

Cypress.Commands.add('breadcrumbsNavigation', ({ link, breadcrumb }) => {
  if (isMobile()) {
    cy.get('nav.breadcrumbs--mobile')
      .find('a.breadcrumbs__link')
      .click();
  } else {
    cy.get('nav.breadcrumbs--desktop')
      .find('a.breadcrumbs__link')
      .contains(breadcrumb)
      .click();
  }
  cy.location('pathname').should('eq', link);
});

Cypress.Commands.add('checkSpecialOffer', dataUiTestId => {
  cy.get(`label[data-uitestid=${dataUiTestId}_label_specialOffer]`).click();
  cy.intercept({ pathname: '/graphql/', method: 'POST' }).as('graphqlRequest');
  cy.wait('@graphqlRequest');
  cy.get('div.card.product').then(checkOfferLabel);
});

Cypress.Commands.add('sortDESC', dataUiTestId => {
  cy.get(`select[data-uitestid=${dataUiTestId}_select]`).select('rate_DESC');
  cy.intercept({ pathname: '/graphql', method: 'POST' }).as('graphqlRequest');
  cy.wait('@graphqlRequest');
  cy.wait('@graphqlRequest')
    .wait('@graphqlRequest')
    .wait('@graphqlRequest')
    .get('.card.product', { timeout: 4000 })
    .then(checkDESCSortingOrder);
});

Cypress.Commands.add('changeLeaseType', dataUiTstId => {
  cy.get(`span[data-uitestid=${dataUiTstId}_Business]`).click();
  const oldPrices = [];

  cy.get('div.card.product')
    .as('productCards')
    .then($cards => {
      $cards.each(function collectPrice() {
        const price = getFullPriceFromCard(this);
        oldPrices.push(price);
      });
    });
  cy.get(`span[data-uitestid=${dataUiTstId}_Personal]`).click();

  cy.get('@productCards').then($cards => {
    $cards.each(function checkPrice(index) {
      const price = getFullPriceFromCard(this);
      expect(price).to.be.below(oldPrices[index]);
    });
  });
});

Cypress.Commands.add('openDetailsPage', ({ dataUiTestId, cardContainer }) => {
  let link = '';
  cy.get(
    `a[data-uitestid=${dataUiTestId}_${cardContainer}_product-card-0_view-offer-button]`,
  )
    .should('be.visible')
    .as('viewProductBtn')
    .invoke('attr', 'href')
    .then(href => {
      link = href;
    });
  cy.get('@viewProductBtn')
    .contains('View Offer')
    .click();
  cy.location('pathname').should(url => {
    expect(url).to.eq(link);
  });
});

Cypress.Commands.add('addItemToWishlist', ({ dataUiTestId, cardContainer }) => {
  let cardTitle = '';
  cy.get(`div[data-uitestid=${dataUiTestId}_${cardContainer}_product-card-0]`)
    .should('be.visible')
    .then($card => {
      cardTitle = $card[0]
        .querySelector('span.heading.-large')
        .textContent.toLowerCase();
    });
  cy.get(
    `button[data-uitestid=${dataUiTestId}_${cardContainer}_product-card-0-wishlist-button]`,
  )
    .should('be.visible')
    .click();
  cy.get('a[data-uitestid=header-wishlist_link]').click();
  cy.location('pathname').should('eq', '/wishlist');
  cy.get('div.card.product')
    .should('be.visible')
    .then($cards => {
      const wishCardTitle = $cards[0]
        .querySelector('span.heading.-large')
        .textContent.toLowerCase();
      expect(wishCardTitle).to.eq(cardTitle);
    });
});

Cypress.Commands.add('addItemToCompare', ({ dataUiTestId, cardContainer }) => {
  let productCardTitle;
  cy.get(
    `span[data-uitestid=${dataUiTestId}_${cardContainer}_product-card-0_span_heading]`,
  ).then($text => {
    productCardTitle = $text
      .text()
      .split(' ')[0]
      .toLowerCase();
  });
  cy.get(
    `button[data-uitestid=${dataUiTestId}_${cardContainer}_product-card-0_compare-button]`,
  ).click();
  cy.get('div[data-uitestid=comparator-bar]').should('be.visible');
  cy.get('div[data-uitestid=comparator-bar-vehicle-card0-present]')
    .find('p.heading')
    .should($text => {
      const compareCardTitle = $text
        .text()
        .split(' ')[0]
        .toLowerCase();
      expect(compareCardTitle, 'manufacturer').to.equal(productCardTitle);
    });
  cy.get(
    'button[data-uitestid=comparator-bar-vehicle_card-remove-button-1]',
  ).click();
});

Cypress.Commands.add('loadMoreBtn', dataUiTestId => {
  cy.intercept('POST', '/graphql').as('graphqlRequest');
  cy.get(`button[data-uitestid=${dataUiTestId}_button_load-more]`).click();
  cy.wait('@graphqlRequest');
  cy.get('.card.product').should('have.length', 36);
});

Cypress.Commands.add('termsAndConditions', ({ dataUiTestId, link }) => {
  cy.scrollTo('bottom');
  cy.get(`a[data-uitestid=${dataUiTestId}_link_terms-and-conditions]`)
    .should('be.visible')
    .click();
  cy.location('pathname').should('eq', link);
});
