describe("Text Widget misnamed exist", () => {
  it("Visits MainPage Page & check existence of text widget misnamed", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=textwidget-title]`).contains("Number of misnamed files");
    cy.get(`[data-cy=textwidget-number]`).contains("259");
    cy.get(`[data-cy=textwidget-text-bottom]`).contains("-12% over last month");
  });

  it("Visits MainPage & fails loading misnamed widget", () => {
    cy.intercept({method: 'GET', url: '*getTextWidgetbadname'}, {forceNetworkError: true})

    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=widget-loading-failed]`).should("exist");
  })
});
