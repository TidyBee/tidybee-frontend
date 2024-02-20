const longPress = (selector) => {
  cy.wait(1000);
  cy.get(selector).trigger("mousedown");
  cy.wait(1000);
};

describe("Widget capability of displaying many files", () => {
    it("Show 100 files", () => {
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
      cy.get(`[data-cy=widget-Directory-input]`).type("100");
      cy.get(`[data-cy=widget-Directory-btn-submit]`).click();
      cy.get(`[data-cy=file-0]`).should("exist");
      cy.get(`[data-cy=file-99]`).should("exist");
      longPress(`[data-cy=widget-Directory]`);
      cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
      cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
      cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
      cy.get(`[data-cy=widget-Directory]`).should("not.exist");
    });
    it("Show 1000 files", () => {
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
        cy.get(`[data-cy=widget-Directory-input]`).type("1000");
        cy.get(`[data-cy=widget-Directory-btn-submit]`).click();
        cy.get(`[data-cy=file-0]`).should("exist");
        cy.get(`[data-cy=file-999]`).should("exist");
        longPress(`[data-cy=widget-Directory]`);
        cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
        cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
        cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
        cy.get(`[data-cy=widget-Directory]`).should("not.exist");
      });
      it("Show 10000 files", () => {
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
        cy.get(`[data-cy=widget-Directory-input]`).type("10000");
        cy.get(`[data-cy=widget-Directory-btn-submit]`).click();
        cy.get(`[data-cy=file-0]`).should("exist");
        cy.get(`[data-cy=file-9999]`).should("exist");
        longPress(`[data-cy=widget-Directory]`);
        cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
        cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
        cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
        cy.get(`[data-cy=widget-Directory]`).should("not.exist");
      });
})