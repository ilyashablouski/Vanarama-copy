/// <reference types="cypress" />
import { checkDESCSortingOrder } from '../../support/utils';

describe('Global Search', () => {
  beforeEach(() => {
    cy.visit('https://dev.vanarama-nonprod.com/search?searchTerm=bmw');
  });

  it('displays 12 result and Load More action', () => {
    cy.get('.card').should('have.length', 12);
    cy.get('.button--inner')
      .contains('Load More')
      .click({ force: true });
    cy.get('.card').should('have.length', 24);
  });
  it('Filter sidebar should open', () => {
    cy.get('button')
      .contains('Filter')
      .click();
    cy.get('.srp-f-flyout').should('be.visible');
  });
  it('Select some filter', () => {
    cy.get('button')
      .contains('Filter')
      .click();
    cy.get('div[role="button"]')
      .contains('Transmission')
      .click();
    cy.get('label')
      .contains('Automatic')
      .click();
    cy.location().should(location => {
      expect(location.search).to.eq('?searchTerm=bmw&transmissions=Automatic');
    });
  });
  it('Change sort order from High to Low', () => {
    cy.get('button')
      .contains('Sort')
      .click();
    cy.get('label')
      .contains('Price High To Low')
      .click();
    cy.get(
      'i[data-uitestid="global-search-page-container_icon_close-filter"]',
    ).click();
    cy.get('.card.product').then(checkDESCSortingOrder);
  });
});
