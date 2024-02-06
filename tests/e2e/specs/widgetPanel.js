const longPress = (selector) => {
  cy.wait(1000);
  cy.get(selector).trigger("mousedown");
  cy.wait(1000);
};

describe("Widget panel usability test", () => {
  it("Add & Delete multiple widget", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-large-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");
  });
  it("widgetpanel close & return button works", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-panel-back-btn]`).click();
    cy.get(`[data-cy=widget-panel-close-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).should("not.exist");
  });
  it("Add Top Heaviest Files widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    longPress(`[data-cy=widget-Heaviest]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");
  });

  it("Add Top Heaviest Files widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    longPress(`[data-cy=widget-Heaviest]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Heaviest]`).should("not.exist");
  });
  it("Add Top Unused Files widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");

    longPress(`[data-cy=widget-Unused]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");
  });

  it("Add Top Unused Files widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");

    longPress(`[data-cy=widget-Unused]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Unused]`).should("not.exist");
  });
  it("Add Top Misnamed Files widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Misnamed]`).contains("Top misnamed Files");

    longPress(`[data-cy=widget-Misnamed]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Misnamed]`).contains("Top misnamed Files");
  });

  it("Add Top Misnamed Files widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Misnamed]`).contains("Top misnamed Files");

    longPress(`[data-cy=widget-Misnamed]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Misnamed]`).should("not.exist");
  });
});
