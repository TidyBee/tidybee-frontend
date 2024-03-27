describe("Text Widget Duplicate exist", () => {
  it("Visits MainPage Page & check existence of text widget duplicate", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=textwidget-title]`).contains("Number of duplicate files");
    cy.get(`[data-cy=textwidget-number]`).contains("124");
    cy.get(`[data-cy=textwidget-text-bottom]`).contains("+19% over last month");
  });

  it("Visits MainPage & fails loading duplicate widget", () => {
    cy.intercept({method: 'GET', url: '*getTextWidgetduplicate'}, {forceNetworkError: true})

    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=widget-loading-failed]`).should("exist");
  })
});
