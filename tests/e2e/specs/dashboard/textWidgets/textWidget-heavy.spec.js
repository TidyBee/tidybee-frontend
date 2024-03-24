describe("Text Widget Heavy exist", () => {
  it("Visits MainPage Page & check existence of text widget heavy", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=textwidget-title]`).contains("Number of heavy files");
    cy.get(`[data-cy=textwidget-number]`).contains("86");
    cy.get(`[data-cy=textwidget-text-bottom]`).contains("-5% over last month");
  });

  it("Visits MainPage & fails loading heavy widget", () => {
    cy.intercept({method: 'GET', url: '*getTextWidgetheavy'}, {forceNetworkError: true})

    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=widget-loading-failed]`).should("exist");
  })
});
