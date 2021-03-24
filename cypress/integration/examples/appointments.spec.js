describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/").contains("Monday");
  });
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[placeholder='Enter Student Name']").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt='Edit']").click({ force: true });

    cy.get("[alt='Tori Malcolm']").click();

    cy.get("[placeholder='Enter Student Name']").clear().type("Butch Coolidge");

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.contains(".appointment__card--show", "Butch Coolidge");
  });
  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("deleting").should("exist");
    cy.contains("deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
