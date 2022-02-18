/// <reference types="cypress" />

import { APP_URL, CAR_LEASING_TEST_ID } from '../../../support/utils';

describe(`
  [Search Page Container]
  Car Leasing
  - manufacturer page
  `, () => {
  const dataUiTestId = CAR_LEASING_TEST_ID;

  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/car-leasing/all-manufacturers`, [
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
      link: '/car-leasing.html',
      breadcrumb: 'Car Leasing',
    });
  });

  it('top info block is shown', () => {
    cy.get(`section[data-uitestid="${dataUiTestId}_top-info-block"]`).should(
      'be.visible',
    );
  });

  it('filtering results by body type and transmission', () => {
    let bodyStyle = '';
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Body Type"]`).click();
    cy.get(
      `div[data-uitestid="${dataUiTestId}_formgroup_Body Type"] button.choice-box:first-child`,
    )
      .click()
      .then($el => {
        bodyStyle = $el.text();
      });
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Transmission]`).click();
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Automatic]`).click();
    cy.location().should(location => {
      expect(location.search).to.eq(
        `?transmissions=Automatic&bodyStyles=${bodyStyle}`,
      );
    });
  });

  it('price changes after lease type changes', () => {
    cy.changeLeaseType(dataUiTestId);
  });

  it('Showing more than 0 results', () => {
    cy.get('div.card').should('have.length.greaterThan', 0);
  });

  it('the correct page opens by clicking on the first card', () => {
    let title = '';
    cy.get(
      `div[data-uitestid="${dataUiTestId}_search-results_range-card-0_title"]`,
    ).then(function getText($el) {
      title = $el.text();
    });
    cy.get(
      `a[data-uitestid="${dataUiTestId}_search-results_range-card-0_view-all-button"]`,
    ).click();
    cy.get(`h1[data-uitestid="${dataUiTestId}_page-title_heading"]`).should(
      $el => {
        expect($el.text()).to.contain(title);
      },
    );
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
