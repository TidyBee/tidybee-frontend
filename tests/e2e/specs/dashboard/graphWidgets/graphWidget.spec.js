describe("Graph Widget exist", () => {
  it("Visits MainPage Page & check existence of graphwidget", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Analyse de votre espace de stockage").should("exist");
    cy.get(`[data-cy=graphwidget-graph]`).should("exist");
  });
});
