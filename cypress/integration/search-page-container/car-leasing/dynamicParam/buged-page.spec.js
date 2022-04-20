/// <reference types="cypress" />

import {
  APP_URL,
  CAR_LEASING_TEST_ID,
  getFullPriceFromCard,
} from '../../../../support/utils';

describe(
  `
  [Search Page Container]
  Car Leasing
  - manufacturer page
  `,
  { viewportWidth: 1200 },
  () => {
    const dataUiTestId = CAR_LEASING_TEST_ID;
    const cardContainer = 'top-offers';

    beforeEach(() => {
      cy.visit(APP_URL);
      cy.clearSessionStorage();
      cy.get('[data-uitestid=cookieBar-accept-button]').click();
      cy.get('button.header-navtoggle').click();
      cy.get('a[data-uitestid="header-CARS-link"]').click();
      cy.get(
        'button[data-uitestid="header_secondary-menu_CARS_button_Cars By Budget"]',
      ).click();
      cy.get(
        'ul[data-uitestid="header_secondary-menu_CARS_menu-tertiary_Cars By Budget"]>li:nth-child(3)',
      ).click();
    });

    it('should show relevant results', () => {
      cy.get('.card.product price').should($cards => {
        $cards.each(function checkPrice() {
          const price = getFullPriceFromCard(this);
          expect(price).to.be.below(250);
        });
      });
    });

    it('hot offers carousel is scrolling', () => {
      cy.get(`div[data-uitestid="${dataUiTestId}_top-offers_product-card-0"]`)
        .as('firstProductCard')
        .should('be.visible');
      cy.get('span.swiper-pagination-bullet').then($elements => {
        $elements[2].click();
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
        link: '/car-leasing.html',
        breadcrumb: 'Car Leasing',
      });
    });

    it('filtering results by body type and fuel type', () => {
      let bodyStyle = '';
      cy.get('div.search-filters--title').click();
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
      cy.get(`span[data-uitestid="${dataUiTestId}_span_Fuel Type"]`)
        .as('FuelTypeAccordion')
        .click();
      cy.get(`span[data-uitestid="${dataUiTestId}_span_Diesel"]`).click();
      cy.get('@FuelTypeAccordion').click();
      cy.location().should(location => {
        expect(location.search).to.eq(
          `?bodyStyles=${bodyStyle}&fuelTypes=Diesel`,
        );
      });
    });

    it('price changes after lease type changes', () => {
      cy.changeLeaseType({ dataUiTestId });
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
      cy.get('section h2.heading')
        .contains('Why Lease With Vanarama')
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
  },
);
