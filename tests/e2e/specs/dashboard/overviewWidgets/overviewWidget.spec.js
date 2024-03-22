describe("overview Widget exist", () => {
  it("Check and confirm the existence of the Overview widget on the MainPage.", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter-btn]`).should("exist");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-fileitem-user-friendly-rs]`).contains("user_friendly.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-user-friendly-rs]`).contains("B");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-user-friendly-rs]`).should("exist");
  });

  it("Visits MainPage Page & check existence of overview & switch to duplicated tab", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).click();
    cy.get(`[data-cy=overviewwidget-duplicated-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-duplicated-filter-btn]`).should("exist");
    cy.get(`[data-cy=overviewwidget-fileitem-creative-solution-rs]`).should("exist").contains("creative_solution.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-creative-solution-rs]`).contains("E");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist");
  });

  it("Visits MainPage Page & check existence of overview & switch to unused tab", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).click();
    cy.get(`[data-cy=overviewwidget-unused-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-unused-filter-btn]`).should("exist");
    cy.get(`[data-cy=overviewwidget-fileitem-creative-solution-rs]`).should("exist").contains("creative_solution.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-creative-solution-rs]`).contains("E");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist");
  });

  it("Visits MainPage Page & check existence of overview & switch to heavy tab", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).click();
    cy.get(`[data-cy=overviewwidget-heavy-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-heavy-filter-btn]`).should("exist");
    cy.get(`[data-cy=overviewwidget-fileitem-creative-solution-rs]`).should("exist").contains("creative_solution.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-creative-solution-rs]`).contains("E");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist");
  });

  it("Visits MainPage Page & check existence of overview & use filter", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter-btn]`).should("exist").click();
    cy.get(`[data-cy=OverViewWidget-filter-option-change-btn]`).should("exist").click();
    cy.contains('Least recent use').should("exist").click()
    cy.get(`[data-cy=OverViewWidget-misnamed-filter-close-btn]`).should("exist").click();
    cy.get(`[data-cy=overviewwidget-fileitem-creative-solution-rs]`).should("exist").contains("creative_solution.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-creative-solution-rs]`).contains("E");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist");
  });

  it("Visits MainPage Page & check existence of overview & use tidyscore", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get(`[data-cy=overviewwidget-container]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-one]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-two]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-three]`).should("exist");
    cy.get(`[data-cy=overviewwidget-tabs-four]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter]`).should("exist");
    cy.get(`[data-cy=overviewwidget-misnamed-filter-btn]`).should("exist");
    cy.get(`[data-cy=overviewwidget-fileitem-creative-solution-rs]`).should("exist").contains("creative_solution.rs");
    cy.get(`[data-cy=overviewwidget-fileitem-tidyscore-creative-solution-rs]`).contains("E");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-graph]`).should("not.exist");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist").click();

    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-graph]`).should("exist");
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-creative-solution-rs]`).should("exist").click();
    cy.get(`[data-cy=overviewwidget-fileitem-toggle-tidyscore-graph]`).should("not.exist");
  });
});
