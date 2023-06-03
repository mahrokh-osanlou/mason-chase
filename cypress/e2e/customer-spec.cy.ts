describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:4200/pages/customer-create");
    cy.get("#firstName")
      .type("mahrokh")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("mahrokh");
      });

    cy.get("#lastName")
      .type("osanlou")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("osanlou");
      });

    cy.get("#email")
      .type("mahrokh@gmail.com")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("mahrokh@gmail.com");
      });

    cy.get("#birthDate")
      .type("10/27/1991")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("10/27/1991");
      });

    cy.get("#phoneNumber")
      .type("+989127430071")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("+989127430071");
      });

    cy.get("#bankAccount")
      .type("12345")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("12345");
      });

    cy.get("#submit").click().as("customer");
    window.localStorage.getItem("customerList");
  });
});
