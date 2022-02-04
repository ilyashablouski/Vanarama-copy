/// <reference types="cypress" />

import { APP_URL, isMobile } from '../../support/utils';

describe('Search Page Container navigation', () => {
  beforeEach(() => {
    cy.visitAndWait(`${APP_URL}/car-leasing/volvo/xc60`, [
      {
        route: '/graphql',
        alias: 'graphqlRequests',
      },
    ]);
    cy.clearSessionStorage();
    cy.get('[data-uitestid=cookieBar-accept-button]').click();
  });

  it('bread crumbs navigate 1 step back', () => {
    if (isMobile()) {
      cy.get('nav.breadcrumbs--mobile')
        .find('a.breadcrumbs__link')
        .contains('Back to Volvo')
        .click();
    } else {
      cy.get('nav.breadcrumbs--desktop')
        .find('a.breadcrumbs__link')
        .contains('Volvo')
        .click();
    }
    cy.location('pathname').should('eq', '/volvo-car-leasing.html');
  });

  it('scroll back to top', () => {
    cy.scrollTo('bottom');
    cy.get('div.active.scroll-top').click();
    cy.get('span.logo').should('be.visible');
  });

  it('carousel is working fine', () => {
    cy.scrollToFooter();
    cy.get('div.carousel')
      .find('button.swiper-next')
      .click();
    cy.get('div[data-swiper-slide-index=0]').should('be.visible');
  });
});
