describe("Text Widget Unused exist", () => {
  it("Visits MainPage Page & check existence of text widget Unused", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=textwidget-title]`).contains("Number of unused files");
    cy.get(`[data-cy=textwidget-number]`).contains("408");
    cy.get(`[data-cy=textwidget-text-bottom]`).contains("+8% over last month");
  });
});
