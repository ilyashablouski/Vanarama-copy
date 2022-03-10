/// <reference types="cypress" />

import {
  APP_URL,
  checkDESCSortingOrder,
  VAN_LEASING_TEST_ID,
} from '../../../../support/utils';

describe(`
  [Search Page Container]
  Van Leasing 
  - range page
  `, () => {
  const dataUiTestId = VAN_LEASING_TEST_ID;
  const cardContainer = 'search-results';

  beforeEach(() => {
    cy.visit(`${APP_URL}/van-leasing`);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
    cy.scrollToFooter();
    cy.get(
      'a[data-uitestid="van-leasing-page_search-by-manufacturer_citroen_link"]',
    ).click();
    cy.get(
      'a[data-uitestid="vans-search-page_search-results_range-card-0_view-all-button"]',
    ).click();
  });

  it('read more block opens', () => {
    cy.get(`div[data-uitestid=${dataUiTestId}_block_read-more]`).should(
      'have.class',
      '-truncate',
    );
    cy.get(`button[data-uitestid=${dataUiTestId}_button_read-more]`).click();
    cy.get(`div[data-uitestid=${dataUiTestId}_block_read-more]`).should(
      'not.have.class',
      '-truncate',
    );
    cy.get(
      'a[href="/finance-info/van-finance-options/business-contract-hire.html"]',
    )
      .as('GuideLink')
      .should('be.visible');
    cy.get(`button[data-uitestid=${dataUiTestId}_button_read-more]`).click();
    cy.get('@GuideLink').should('not.be.visible');
  });

  it('Showing more than 0 results', () => {
    cy.get('.card.product').should('have.length.greaterThan', 0);
  });

  it('breadcrumbs navigation works', () => {
    cy.breadcrumbsNavigation({
      link: '/van-leasing.html',
      breadcrumb: 'Van Leasing',
    });
  });

  it('filtering results by body type and transmission', () => {
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

  it('price changes after lease type changes', () => {
    cy.changeLeaseType(dataUiTestId);
  });

  it('sorting results by price from high to low', () => {
    cy.get(`select[data-uitestid=${dataUiTestId}_select]`).select('rate_DESC');
    cy.intercept({ pathname: '/graphql' }).as('graphqlRequest');
    cy.wait('@graphqlRequest')
      .wait('@graphqlRequest')
      .wait('@graphqlRequest');
    cy.get('.card.product').should(checkDESCSortingOrder);
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

  it('"why lease with vanarama" is shown', () => {
    cy.scrollToFooter();
    cy.contains('Why Lease With Vanarama?')
      .nextAll()
      .should('have.length', 4);
  });

  it('related carousel is shown', () => {
    cy.scrollToFooter();
    cy.get('div.carousel[data-uitestid=vans-search-page_related_carousel]')
      .find('button.swiper-next')
      .click();
    cy.get('[data-uitestid=vans-search-page_related_0_card] > div').should(
      'be.visible',
    );
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
