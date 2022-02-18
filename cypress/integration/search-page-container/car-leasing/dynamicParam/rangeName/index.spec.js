/// <reference types="cypress" />

import { APP_URL, CAR_LEASING_TEST_ID } from '../../../../../support/utils';

describe(
  `
  [Search Page Container]
  Car Leasing
  - range page
  `,
  { viewportWidth: 1200 },
  () => {
    const dataUiTestId = CAR_LEASING_TEST_ID;
    const cardContainer = 'search-results';

    beforeEach(() => {
      cy.visitAndWait(APP_URL, [
        {
          route: '/graphql',
          alias: 'graphqlRequests',
        },
      ]);
      cy.clearSessionStorage();
      cy.get('[data-uitestid=cookieBar-accept-button]').click();
      cy.get('button.header-navtoggle').click();
      cy.get('a[data-uitestid="header-CARS-link"]').click();
      cy.get(
        'button[data-uitestid="header_secondary-menu_CARS_button_Cars By Manufacturer"]',
      ).click();
      cy.get(
        'ul[data-uitestid="header_secondary-menu_CARS_menu-tertiary_Cars By Manufacturer"]>li:nth-child(3)',
      ).click();
      cy.get(
        `a[data-uitestid="${dataUiTestId}_search-results_range-card-0_view-all-button"]`,
      ).click();
    });

    it('breadcrumbs navigation works', () => {
      cy.breadcrumbsNavigation({
        link: '/car-leasing.html',
        breadcrumb: 'Car Leasing',
      });
    });

    it('top info block is shown', () => {
      cy.get(
        `section[data-uitestid="${dataUiTestId}_top-category-info"]`,
      ).should('be.visible');
    });

    it('Showing more than 0 results', () => {
      cy.get('.card.product').should('have.length.greaterThan', 0);
    });

    it('filtering results by budget and transmission', () => {
      cy.get('div.search-filters--title').click();
      cy.get(`span[data-uitestid="cars-search-page_span_Budget"]`)
        .as('BudgetAccordion')
        .click();
      cy.get('select[data-uitestid="cars-search-page_select_from"]').select(
        '0',
      );
      cy.get('select[data-uitestid="cars-search-page_select_to"]').select(
        '350',
      );
      cy.get('@BudgetAccordion').click();
      cy.get(`span[data-uitestid=${dataUiTestId}_span_Transmission]`)
        .click()
        .as('AccordionTransmission');
      cy.get(`span[data-uitestid=${dataUiTestId}_span_Automatic]`).click();
      cy.get('@AccordionTransmission').click();
      cy.location().should(location => {
        expect(location.search).to.eq(
          '?transmissions=Automatic&pricePerMonth=0|350',
        );
      });
    });

    it('price changes after lease type changes', () => {
      cy.changeLeaseType(dataUiTestId);
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

    it('new range content is shown', () => {
      cy.get('div[data-uitestid="cars-search-page_new-range-content"]').should(
        'exist',
      );
    });

    it('related carousel is scrolling', () => {
      cy.scrollToFooter();
      cy.get(
        `div.carousel[data-uitestid=${dataUiTestId}_new-range-content_related_carousel]`,
      )
        .find('button.swiper-next')
        .click();
      cy.get(
        `[data-uitestid=${dataUiTestId}_new-range-content_related_0_card_title]`,
      ).should('not.be.visible');
    });

    it('terms and conditions link works', () => {
      cy.termsAndConditions({
        dataUiTestId,
        link: '/legal/terms-and-conditions',
      });
    });
  },
);
