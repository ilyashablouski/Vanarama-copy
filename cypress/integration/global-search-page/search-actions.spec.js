/// <reference types="cypress" />

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
  it('Change sort order from Low to high', () => {
    cy.get('button')
      .contains('Sort')
      .click();
    cy.get('label')
      .contains('Price Low To High')
      .click();
    cy.get('.srp-f-mask').click('right');
    cy.get('.card').then($el => {
      const isCorrectOrder = Array.from(Array($el.length)).every(
        (_node, index) => {
          if (index === 0 || index - 1 === $el.length) {
            return true;
          }
          let firstElementPrice;
          let secondElementPrice;
          firstElementPrice = $el.get(index).querySelector('.price--pounds')
            .textContent;
          firstElementPrice += $el.get(index).querySelectorAll('.price--sub')[1]
            .textContent;
          secondElementPrice = $el
            .get(index + 1)
            ?.querySelector('.price--pounds').textContent;
          secondElementPrice += $el
            .get(index + 1)
            ?.querySelectorAll('.price--sub')[1].textContent;
          return firstElementPrice <= secondElementPrice;
        },
      );
      expect(isCorrectOrder).to.eq(true);
    });
  });
});
