describe("Text Widget Unused exist", () => {
  it("Visits MainPage Page & check existence of text widget Unused", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers inutilisés").should("exist");
  });
});
