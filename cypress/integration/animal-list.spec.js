/// <reference types="Cypress" />

context("Misc", () => {
  beforeEach(() => {
    it("Animal-list, add enty", () => {
      cy.visit("localhost:3000");
      cy.get("#animal-form__input").type("Holy cow");
    });
  });
});
