
describe("Component from Configuration Page exist", () => {
  it("Visits Configuration Page & check existence of component", () => {
    cy.visit("/configuration");
    cy.wait(1000);
    cy.contains("dashboard.widgets.undefined").should("exist");
  });
});