describe("Text Widget misnamed exist", () => {
  it("Visits MainPage Page & check existence of text widget misnamed", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers mal nommés").should("exist");
  });
});
