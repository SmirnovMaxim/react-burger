import {API} from "../../../src/config/params";

describe('check constructor', () => {
  it('create order', () => {
    cy.intercept('POST', `${API}orders`).as('createOrder');
    cy.intercept('GET', `${API}ingredients`).as('fetchIngredients');

    cy.visit('http://localhost:3000');

    cy.wait('@fetchIngredients');

    cy.get('[data-test-id="constructor"]').as('constructor');
    cy.get('body').as('body');

    cy.get('[data-test-id="ingredientTabs"]').children().should('have.length', 3);
    cy.get('[data-test-id="ingredientGroup"]').should('have.length', 3).as('group');

    for (let i = 0; i < 3; i++) {
      cy.get('@group')
        .eq(i)
        .within(() => {
          cy.get('[data-test-id="ingredient"]').eq(0).as('ingredient');
          cy.get('@ingredient').click();
          cy.location('pathname').should('contain', '/ingredient/');
          cy.get('@body').type('{esc}');
          cy.get('@ingredient').drag('@constructor');
        });
    }

    cy.get('@constructor').get('button').click();
    cy.location('pathname').should('equal', '/login');

    cy.get('form').within(() => {
      cy.get('.input__icon-action').eq(0).click();
      cy.get('input[type=email]').type(Cypress.config('login'));
      cy.get('input[type=password]').type(Cypress.config('password'));
      cy.root().submit();
    });

    cy.location('pathname').should('equal', '/');
    cy.get('@constructor').get('button').click();

    cy.wait('@createOrder');
    cy.get('#modals').contains('идентификатор заказа');
  });
});
