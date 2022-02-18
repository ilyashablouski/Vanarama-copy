/// <reference types="cypress" />

import {
  APP_URL,
  checkDESCSortingOrder,
  CAR_LEASING_TEST_ID,
} from '../../../support/utils';

describe(`
      [Search Page Container] 
      Car Leasing Page
      - special offers
      `, () => {
  const dataUiTestId = CAR_LEASING_TEST_ID;

  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/car-leasing/special-offers`, [
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
      link: '/car-leasing.html',
      breadcrumb: 'Car Leasing',
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
      .wait('@graphqlRequest')
      .wait('@graphqlRequest')
      .get('.card.product')
      .should(checkDESCSortingOrder);
  });

  it('load more button works', () => {
    cy.loadMoreBtn(dataUiTestId);
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
