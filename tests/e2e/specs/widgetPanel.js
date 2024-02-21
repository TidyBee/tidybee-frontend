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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
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
  it("Add Text widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-TextWidget]`).contains("Text Widget");

    cy.get(`[data-cy=widget-TextWidget-evolution]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-btn-edit]`).click();
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("exist");
    cy.get(`[data-cy=widget-TextWidget-btn-close]`).contains("Close");
    cy.get(`[data-cy=widget-TextWidget-btn-evolution]`).click();
    cy.get(`[data-cy=widget-TextWidget-btn-close]`).click();
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-evolution]`).should("exist");
    longPress(`[data-cy=widget-TextWidget]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-TextWidget]`).contains("Text Widget");
  });

  it("Add Text widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-TextWidget]`).contains("Text Widget");

    cy.get(`[data-cy=widget-TextWidget-evolution]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-btn-edit]`).click();
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("exist");
    cy.get(`[data-cy=widget-TextWidget-btn-close]`).contains("Close");
    cy.get(`[data-cy=widget-TextWidget-btn-evolution]`).click();
    cy.get(`[data-cy=widget-TextWidget-btn-close]`).click();
    cy.get(`[data-cy=widget-TextWidget-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-TextWidget-evolution]`).should("exist");
    longPress(`[data-cy=widget-TextWidget]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-TextWidget]`).should("not.exist");
  });
  it("Add Directory widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Directory]`).contains("Folder tracker");

    cy.get(`[data-cy=widget-Directory-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-Directory-btn-edit]`).click();
    cy.get(`[data-cy=widget-Directory-settings]`).should("exist");
    cy.get(`[data-cy=widget-Directory-btn-close]`).contains("Close");
    cy.get(`[data-cy=widget-Directory-btn-submit]`).contains("Submit");
    cy.get(`[data-cy=widget-Directory-input]`).type("Hello World");
    cy.get(`[data-cy=widget-Directory-btn-submit]`).click();
    cy.get(`[data-cy=widget-Directory-settings]`).should("not.exist");
    longPress(`[data-cy=widget-Directory]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Directory]`).contains("Folder tracker");
  });

  it("Add Directory widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Misnamed-btn]`).contains("Top Misnamed Files");
    cy.get(`[data-cy=widgetPanel-TextWidget-btn]`).contains("Text Widget");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).contains("Folder tracker");
    cy.get(`[data-cy=widgetPanel-Directory-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Directory]`).contains("Folder tracker");

    cy.get(`[data-cy=widget-Directory-settings]`).should("not.exist");
    cy.get(`[data-cy=widget-Directory-btn-edit]`).click();
    cy.get(`[data-cy=widget-Directory-settings]`).should("exist");
    cy.get(`[data-cy=widget-Directory-btn-close]`).contains("Close");
    cy.get(`[data-cy=widget-Directory-btn-submit]`).contains("Submit");
    cy.get(`[data-cy=widget-Directory-input]`).type("Hello World");
    cy.get(`[data-cy=widget-Directory-btn-close]`).click();
    longPress(`[data-cy=widget-Directory]`);
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Directory]`).should("not.exist");
  });
});
