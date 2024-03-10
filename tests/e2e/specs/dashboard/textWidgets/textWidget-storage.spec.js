describe("Text Widget Storage exist", () => {
  it("Visits MainPage Page & check existence of text widget Storage", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=textwidget-title]`).contains("Shared spaces");
    cy.get(`[data-cy=textwidget-graph]`).should("exist");
    cy.get(`[data-cy=textwidget-graph-value]`).contains("237/512GB");
    cy.get(`[data-cy=textwidget-text-bottom]`).contains("+4% over last month");
  });
});
