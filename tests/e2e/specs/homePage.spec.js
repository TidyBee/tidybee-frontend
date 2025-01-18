describe("Component from Home Page exist", () => {
  it("Visits Home Page & check existence of text widget duplicated", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers dupliqués").should("exist");
  });
  it("Visits Home Page & check existence of text widget misnamed", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers mal nommés").should("exist");
  });
  it("Visits Home Page & check existence of text widget unused", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers inutilisés").should("exist");
  });
  it("Visits Home Page & check existence of text widget count all files", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Fichiers surveillés").should("exist");
  });
  it("Visits Home Page & check existence of text widget graph", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Analyse de votre espace de stockage").should("exist");
  });
  it("Visits Home Page & check existence of graphwidget", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Analyse de votre espace de stockage").should("exist");
  });
});