/// <reference types="cypress" />

import {
  APP_URL,
  checkDESCSortingOrder,
  PICKUP_LEASING_TEST_ID,
} from '../../../support/utils';

describe(`
      [Search Page Container] 
      Pickup Truck Leasing Page
      - special offers
      `, () => {
  const dataUiTestId = PICKUP_LEASING_TEST_ID;

  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/pickup-truck-leasing/special-offers`, [
      {
        route: '/graphql',
        alias: 'graphqlRequests',
      },
    ]);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
    cy.intercept({ pathname: '/graphql' }).as('graphqlRequest');
  });

  it('breadcrumbs navigation works', () => {
    cy.breadcrumbsNavigation({
      link: '/',
      breadcrumb: 'Home',
    });
  });

  it('Showing more than 0 results', () => {
    cy.get('.card.product').should('have.length.greaterThan', 0);
  });

  it('filtering results by transmission and fuel type', () => {
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Transmission]`).click();
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Automatic]`).click();
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Fuel Type"]`).click();
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Diesel"]`).click();
    cy.location().should(location => {
      expect(location.search).to.eq(
        '?transmissions=Automatic&fuelTypes=Diesel',
      );
    });
  });

  it('sorting results by price from high to low', () => {
    cy.get(`select[data-uitestid=${dataUiTestId}_select]`).select('rate_DESC');
    cy.intercept({ pathname: '/graphql' }).as('graphqlRequest');
    cy.wait('@graphqlRequest')
      .wait('@graphqlRequest', { timeout: 4000 })
      .get('.card.product')
      .should(checkDESCSortingOrder);
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
