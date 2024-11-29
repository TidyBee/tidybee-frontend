describe("Grade Widget exist", () => {
  it("Visits MainPage Page & check existence of gradewidget", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.contains("Le grade de votre espace partagé").should("exist");
  });
});
