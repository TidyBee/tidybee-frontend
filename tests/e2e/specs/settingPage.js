describe("Setting Page Test", () => {
  it("Visits setting Page", () => {
    cy.visit("/");
    cy.get(`[data-cy=Settings]`).click();
  });
  // it("Visits setting Page & Flexible choice", () => {
  //   cy.visit("/");
  //   cy.get(`[data-cy=Settings]`).click();
  //   cy.get(`[data-cy=Flexible]`).click();
  //   cy.get(`[data-cy=top_parameters-title]`).contains(
  //     "Display of the number of files in the Tops",
  //   );
  //   cy.get(`[data-cy=top_parameters-select]`).contains("5");
  //   cy.get(`[data-cy=naming_formats-title]`).contains("File Naming Formats");
  //   cy.get(`[data-cy=naming_formats-select]`).contains("XXX.pdf");
  //   cy.get(`[data-cy=unused_file_durations-title]`).contains(
  //     "From which moment is the file considered unused",
  //   );
  //   cy.get(`[data-cy=unused_file_durations-select]`).contains("3 years");
  //   cy.get(`[data-cy=size_thresholds-title]`).contains(
  //     "From what size is it considered too heavy ",
  //   );
  //   cy.get(`[data-cy=size_thresholds-select]`).contains("10 GB");
  //   cy.get(`[data-cy=save]`).click();
  // });

  // it("Visits setting Page & Normal choice", () => {
  //   cy.visit("/");
  //   cy.get(`[data-cy=Settings]`).click();
  //   cy.get(`[data-cy=Normal]`).click();
  //   cy.get(`[data-cy=top_parameters-title]`).contains(
  //     "Display of the number of files in the Tops",
  //   );
  //   cy.get(`[data-cy=top_parameters-select]`).contains("5");
  //   cy.get(`[data-cy=naming_formats-title]`).contains("File Naming Formats");
  //   cy.get(`[data-cy=naming_formats-select]`).contains("XXX_date.pdf");
  //   cy.get(`[data-cy=unused_file_durations-title]`).contains(
  //     "From which moment is the file considered unused",
  //   );
  //   cy.get(`[data-cy=unused_file_durations-select]`).contains("1 year");
  //   cy.get(`[data-cy=size_thresholds-title]`).contains(
  //     "From what size is it considered too heavy ",
  //   );
  //   cy.get(`[data-cy=size_thresholds-select]`).contains("5 GB");
  //   cy.get(`[data-cy=save]`).click();
  // });

  // it("Visits setting Page & Strict choice", () => {
  //   cy.visit("/");
  //   cy.get(`[data-cy=Settings]`).click();
  //   cy.get(`[data-cy=Strict]`).click();
  //   cy.get(`[data-cy=top_parameters-title]`).contains(
  //     "Display of the number of files in the Tops",
  //   );
  //   cy.get(`[data-cy=top_parameters-select]`).contains("5");
  //   cy.get(`[data-cy=naming_formats-title]`).contains("File Naming Formats");
  //   cy.get(`[data-cy=naming_formats-select]`).contains(
  //     "XXX_date_directory.pdf",
  //   );
  //   cy.get(`[data-cy=unused_file_durations-title]`).contains(
  //     "From which moment is the file considered unused",
  //   );
  //   cy.get(`[data-cy=unused_file_durations-select]`).contains("6 months");
  //   cy.get(`[data-cy=size_thresholds-title]`).contains(
  //     "From what size is it considered too heavy ",
  //   );
  //   cy.get(`[data-cy=size_thresholds-select]`).contains("2 GB");
  //   cy.get(`[data-cy=save]`).click();
  // });
});
