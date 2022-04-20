/// <reference types="cypress" />

import { APP_URL, CAR_LEASING_TEST_ID } from '../../../../../support/utils';

describe(`
  [Search Page Container]
  Car Leasing
  - range page -> body style
  `, () => {
  const dataUiTestId = CAR_LEASING_TEST_ID;
  const cardContainer = 'search-results';

  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/car-leasing/bmw/5-series/estate`, [
      {
        route: '/graphql',
        alias: 'graphqlRequests',
      },
    ]);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
  });

  it('breadcrumbs navigation works', () => {
    cy.breadcrumbsNavigation({
      link: '/bmw-car-leasing/5-series.html',
      breadcrumb: '5 Series',
    });
  });

  it('Showing more than 0 results', () => {
    cy.get('.card.product').should('have.length.greaterThan', 0);
  });

  it('filtering results by budget and fuel type', () => {
    cy.get('div.search-filters--title').click();
    cy.get(`span[data-uitestid="cars-search-page_span_Budget"]`)
      .as('BudgetAccordion')
      .click();
    cy.get('select[data-uitestid="cars-search-page_select_to"]').select('350');
    cy.get('select[data-uitestid="cars-search-page_select_from"]').select('0');
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Fuel Type"]`).click();
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Diesel"]`).click();
    cy.location().should(location => {
      expect(location.search).to.eq('?fuelTypes=Diesel&pricePerMonth=0|350');
    });
  });

  it('price changes after lease type changes', () => {
    cy.changeLeaseType({ dataUiTestId });
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

  it('"why lease bmw?" is shown', () => {
    cy.contains('Why Lease the BMW 5 Series Touring?').should('exist');
  });

  it('"why lease with vanarama" is shown', () => {
    cy.scrollToFooter();
    cy.get('section h2.heading')
      .contains('Why Lease With Vanarama')
      .nextAll()
      .should('have.length', 4);
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
