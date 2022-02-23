/// <reference types="cypress" />

import {
  APP_URL,
  checkDESCSortingOrder,
  CAR_LEASING_TEST_ID,
} from '../../../support/utils';

describe(`
    [Search Page Container]
    Car Leasing Page
    - search page
    `, () => {
  const dataUiTestId = CAR_LEASING_TEST_ID;
  const cardContainer = 'search-results';

  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/car-leasing/search`, [
      {
        route: '/graphql',
        alias: 'graphqlRequests',
      },
    ]);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
  });

  it('Showing more than 0 results', () => {
    cy.get('.card.product').should('have.length.greaterThan', 0);
  });

  it('load more button works', () => {
    cy.loadMoreBtn(dataUiTestId);
  });

  it('breadcrumbs navigation works', () => {
    cy.breadcrumbsNavigation({
      link: '/car-leasing.html',
      breadcrumb: 'Car Leasing',
    });
  });

  it('view special offers only checkbox works', () => {
    cy.checkSpecialOffer(dataUiTestId);
  });

  it('filtering results by manufacturer, body type and transmission', () => {
    let bodyStyle = '';
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Make & Model"]`).click();
    cy.get(`select[data-uitestid=${dataUiTestId}_select_manufacturer]`).select(
      'BMW',
    );
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Body Type"]`).click();
    cy.get(
      `div[data-uitestid="${dataUiTestId}_formgroup_Body Type"] button.choice-box:first-child`,
    )
      .click()
      .then($el => {
        bodyStyle = $el.text();
      });
    cy.location().should(location => {
      expect(location.search).to.eq(`?bodyStyles=${bodyStyle}&make=bmw`);
    });
  });

  it('price changes after lease type changes', () => {
    cy.changeLeaseType(dataUiTestId);
  });

  it('sorting results by price from high to low', () => {
    cy.get(`select[data-uitestid=${dataUiTestId}_select]`).select('rate_DESC');
    cy.intercept({ pathname: '/graphql' }).as('graphqlRequest');
    cy.wait('@graphqlRequest')
      .wait('@graphqlRequest')
      .wait('@graphqlRequest')
      .wait('@graphqlRequest')
      .get('.card.product')
      .should(checkDESCSortingOrder);
  });

  it('first item is added to compare', () => {
    cy.addItemToCompare({ dataUiTestId, cardContainer });
  });

  it('first item is added to the wishlist', () => {
    cy.addItemToWishlist({ dataUiTestId, cardContainer });
  });

  it('details page is opening after click on an offer', () => {
    cy.openDetailsPage({ dataUiTestId, cardContainer });
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
