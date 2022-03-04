/// <reference types="cypress" />

import { APP_URL, VAN_LEASING_TEST_ID } from '../../../../support/utils';

describe(`
  [Search Page Container]
  Van Leasing
  - manufacturer page
  `, () => {
  const dataUiTestId = VAN_LEASING_TEST_ID;
  const cardContainer = 'top-offers';

  beforeEach(() => {
    cy.visit(`${APP_URL}/van-leasing`);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
    cy.scrollToFooter();
    cy.get(
      `a[data-uitestid="van-leasing-page_search-by-manufacturer_citroen_link"]`,
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
    cy.get('a[href="/guides/van-leasing-explained"]')
      .as('GuideLink')
      .should('be.visible');
    cy.get(`button[data-uitestid=${dataUiTestId}_button_read-more]`).click();
    cy.get('@GuideLink').should('not.be.visible');
  });

  it('hot offers carousel is scrolling', () => {
    cy.get(`div[data-uitestid="${dataUiTestId}_top-offers_product-card-0"]`)
      .as('firstProductCard')
      .should('be.visible');
    cy.get('span.swiper-pagination-bullet').then($elements => {
      $elements[3].click();
    });
    cy.get(
      `div[data-uitestid="${dataUiTestId}_top-offers_product-card-3"]`,
    ).should('be.visible');
    cy.get('@firstProductCard').should('not.be.visible');
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
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Body Type"]`).click();
    cy.get(`span[data-uitestid="${dataUiTestId}_span_Small Van"]`).click();
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Transmission]`).click();
    cy.get(`span[data-uitestid=${dataUiTestId}_span_Automatic]`).click();
    cy.location().should(location => {
      expect(location.search).to.eq(
        '?transmissions=Automatic&bodyStyles=Small+Van',
      );
    });
  });

  it('price changes after lease type changes', () => {
    cy.changeLeaseType(dataUiTestId);
  });

  it('first item is added to compare', () => {
    cy.addItemToCompare({ dataUiTestId, cardContainer, isCarousel: true });
  });

  it('first item is added to the wishlist', () => {
    cy.addItemToWishlist({ dataUiTestId, cardContainer, isCarousel: true });
  });

  it('details page is opening after click on an offer', () => {
    cy.openDetailsPage({ dataUiTestId, cardContainer, isCarousel: true });
  });

  it('"why lease with vanarama" is shown', () => {
    cy.scrollToFooter();
    cy.contains('Why Lease With Vanarama?')
      .nextAll()
      .should('have.length', 4);
  });

  it('related carousel is scrolling', () => {
    cy.scrollToFooter();
    cy.get(`div.carousel[data-uitestid=${dataUiTestId}_related_carousel]`)
      .find('button.swiper-next')
      .click();
    cy.get(`[data-uitestid=${dataUiTestId}_related_0_card] > div`).should(
      'not.be.visible',
    );
  });

  it('terms and conditions link works', () => {
    cy.termsAndConditions({
      dataUiTestId,
      link: '/legal/terms-and-conditions',
    });
  });
});
