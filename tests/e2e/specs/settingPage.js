describe("Setting Page Test", () => {
  it("Visits setting Page", () => {
    cy.visit("/");
    cy.get(`[data-cy=Configuration]`).click();
  });
});
