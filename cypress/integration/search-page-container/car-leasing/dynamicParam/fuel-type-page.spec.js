/// <reference types="cypress" />

import { APP_URL, CAR_LEASING_TEST_ID } from '../../../../support/utils';

describe(
  `
  [Search Page Container]
  Car Leasing
  - manufacturer page
  `,
  { viewportWidth: 1200 },
  () => {
    const dataUiTestId = CAR_LEASING_TEST_ID;
    const cardContainer = 'search-results';

    beforeEach(() => {
      cy.visit(APP_URL);
      cy.clearSessionStorage();
      cy.get('[data-uitestid=cookieBar-accept-button]').click();
      cy.get('button.header-navtoggle').click();
      cy.get('a[data-uitestid="header-CARS-link"]').click();
      cy.get(
        'button[data-uitestid="header_secondary-menu_CARS_button_Cars By Type"]',
      ).click();
      cy.get(
        'ul[data-uitestid="header_secondary-menu_CARS_menu-tertiary_Cars By Type"]>li:nth-child(5)',
      ).click();
    });

    it('should show relevant results', () => {
      cy.get('.card.product').should('contain.text', 'Electric');
    });

    it('Showing more than 0 results', () => {
      cy.get('.card.product').should('have.length.greaterThan', 0);
    });

    it('breadcrumbs navigation works', () => {
      cy.breadcrumbsNavigation({
        link: '/car-leasing.html',
        breadcrumb: 'Car Leasing',
      });
    });

    it('filtering results by body type and fuel type', () => {
      let bodyStyle = '';
      cy.get('div.search-filters--title').click();
      cy.get(`span[data-uitestid="cars-search-page_span_Budget"]`)
        .as('BudgetAccordion')
        .click();
      cy.get('select[data-uitestid="cars-search-page_select_to"]').select(
        '350',
      );
      cy.get('select[data-uitestid="cars-search-page_select_from"]').select(
        '0',
      );
      cy.get('@BudgetAccordion').click();
      cy.get(`span[data-uitestid="${dataUiTestId}_span_Body Type"]`)
        .as('AccordionBodyType')
        .click();
      cy.get(
        `div[data-uitestid="${dataUiTestId}_formgroup_Body Type"] button.choice-box:first-child`,
      )
        .click()
        .then($el => {
          bodyStyle = $el.text();
        });
      cy.get('@AccordionBodyType').click();
      cy.location().should(location => {
        expect(location.search).to.eq(
          `?bodyStyles=${bodyStyle}&pricePerMonth=0|350`,
        );
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

    it('"why lease with vanarama" is shown', () => {
      cy.scrollToFooter();
      cy.get('section h2.heading')
        .contains('Why Lease With Vanarama')
        .nextAll()
        .should('have.length', 4);
    });

    it('related carousel is shown', () => {
      cy.scrollToFooter();
      cy.get(
        `div.carousel[data-uitestid=${dataUiTestId}_related_carousel]`,
      ).should('be.visible');
    });

    it('terms and conditions link works', () => {
      cy.termsAndConditions({
        dataUiTestId,
        link: '/legal/terms-and-conditions',
      });
    });
  },
);
