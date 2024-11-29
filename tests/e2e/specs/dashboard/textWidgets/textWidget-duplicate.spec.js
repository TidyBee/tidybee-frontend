describe("Text Widget Duplicate exist", () => {
  it("Visits MainPage Page & check existence of text widget duplicate", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers dupliqués").should("exist");
  });
});
