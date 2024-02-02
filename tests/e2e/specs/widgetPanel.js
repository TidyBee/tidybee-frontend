describe("Widget panel usability test", () => {
  it("widgetpanel close & return button works", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-panel-back-btn]`).click();
    cy.get(`[data-cy=widget-panel-close-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).should("not.exist");
  });
  it("Add & Delete multiple widget", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-large-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");

    cy.get(`[data-cy=widget-Heaviest]`).trigger("mousedown");
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Unused]`).trigger("mousedown");
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Heaviest]`).should("not.exist");
    cy.get(`[data-cy=widget-Unused]`).should("not.exist");
  });
  it("Add Top Heaviest Files widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    cy.get(`[data-cy=widget-Heaviest]`).trigger("mousedown");
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
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Heaviest]`).contains("Top Heaviest Files");

    cy.get(`[data-cy=widget-Heaviest]`).trigger("mousedown");
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
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");

    cy.get(`[data-cy=widget-Unused]`).trigger("mousedown");
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
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Unused]`).contains("Top Unused Files");

    cy.get(`[data-cy=widget-Unused]`).trigger("mousedown");
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Unused]`).should("not.exist");
  });
  it("Add Top Missnamed Files widget & don't delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Missnamed]`).contains("Top missnamed Files");

    cy.get(`[data-cy=widget-Missnamed]`).trigger("mousedown");
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-no]`).first().click({ force: true });

    cy.get(`[data-cy=widget-Missnamed]`).contains("Top missnamed Files");
  });

  it("Add Top Missnamed Files widget & delete", () => {
    cy.visit("/");
    cy.get(`[data-cy=add-widget-btn]`).click();
    cy.get(`[data-cy=widgetPanel-Heaviest-btn]`).contains("Top Heaviest Files");
    cy.get(`[data-cy=widgetPanel-Unused-btn]`).contains("Top Unused Files");
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).contains(
      "Top Missnamed Files",
    );
    cy.get(`[data-cy=widgetPanel-Missnamed-btn]`).click();
    cy.get(`[data-cy=widget-small-size-btn]`).contains("3x3");
    cy.get(`[data-cy=widget-large-size-btn]`).contains("6x6");
    cy.get(`[data-cy=widget-small-size-btn]`).click();
    cy.get(`[data-cy=widget-Missnamed]`).contains("Top missnamed Files");

    cy.get(`[data-cy=widget-Missnamed]`).trigger("mousedown");
    cy.get(`[data-cy=widget-delete-btn-yes]`).contains("yes");
    cy.get(`[data-cy=widget-delete-btn-no]`).contains("no");
    cy.get(`[data-cy=widget-delete-btn-yes]`).first().click({ force: true });
    cy.get(`[data-cy=widget-Missnamed]`).should("not.exist");
  });
});
