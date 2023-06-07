import { randomNum } from "./../../src/app/modules/customer-management/utils/random-number";
import { getParsedInternationalByNumber } from "./../../src/app/modules/customer-management/utils/google-phone";

describe("template spec", () => {
  let generateRandString = randomNum(1000);
  localStorage.setItem(
    "customerList",
    "[{BankAccountNumber:  12345, DateOfBirth : 1991-10-26T20:30:00.000Z,Email: mahrokh@gmail.com,Firstname: mahrokh,Lastname: osanlou,PhoneNumber: +989127430071}]"
  );

  it("correct", () => {
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
      .type("Fake_Qa" + generateRandString.toString() + "@gmail.com")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq(
          "Fake_Qa" + generateRandString.toString() + "@gmail.com"
        );
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

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let exist = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });
        expect(
          exist,
          "Code : 202, Message: Duplicate customer by Email address!"
        ).to.not.be.true;
      });
  });

  it("incorrectPhoneNumber", () => {
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
      .type("Fake_Qa" + generateRandString.toString() + "@gmail.com")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq(
          "Fake_Qa" + generateRandString.toString() + "@gmail.com"
        );
      });

    cy.get("#birthDate")
      .type("10/27/1991")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("10/27/1991");
      });

    cy.get("#phoneNumber")
      .type("+909127430071")
      .then((el) => {
        let phoneNumberValidation =
          getParsedInternationalByNumber("+909127430071");
        expect(
          phoneNumberValidation,
          "Code : 101, Message:Invalid Mobile Number!"
        ).to.not.be.false;
      });

    cy.get("#bankAccount")
      .type("12345")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq("12345");
      });

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let exist = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });
        expect(
          exist,
          "Code : 202, Message: Duplicate customer by Email address!"
        ).to.not.be.true;
      });
  });

  it("incorrectEmail", () => {
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
      .type("Fake_Qa" + generateRandString.toString())
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq(
          "Fake_Qa" + generateRandString.toString() + "@gmail.com",
          "Code : 102, Message:  Invalid Email address!"
        );
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

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let exist = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });
        expect(
          exist,
          "Code : 202, Message: Duplicate customer by Email address!"
        ).to.not.be.true;
      });
  });

  it("incorrectBankAccount", () => {
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
      .type("Fake_Qa" + generateRandString.toString() + "@gmail.com")
      .then((el) => {
        let input_value = el.val();
        expect(input_value).to.eq(
          "Fake_Qa" + generateRandString.toString() + "@gmail.com"
        );
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
      .type(generateRandString.toString() + "account")
      .then((el) => {
        let input_value = el.val();
        expect(
          input_value,
          "Code : 103, Message: Invalid Bank Account Number!"
        ).to.eq("12345");
      });

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let exist = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });
        expect(
          exist,
          "Code : 202, Message: Duplicate customer by Email address!"
        ).to.not.be.true;
      });
  });

  it("douplicateCustomer", () => {
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

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let existCustomer = list.some((el: any) => {
          return (
            el.Firstname == "mahrokh" &&
            el.Lastname == "osanlou" &&
            el.DateOfBirth == "1991-10-26T20:30:00.000Z"
          );
        });
        expect(
          existCustomer,
          "Code : 201, Message: Duplicate customer by First-name, Last-name, Date-of-Birth!"
        ).to.not.be.true;
      });
  });

  it("douplicateEmail", () => {
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

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");
        let exist = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });
        expect(
          exist,
          "Code : 202, Message: Duplicate customer by Email address!"
        ).to.not.be.true;
      });
  });

  it("douplicateEmail&Customer", () => {
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

    cy.get("#submit")
      .click()
      .as("customer")
      .then(() => {
        let list = JSON.parse(localStorage.getItem("customerList") ?? "");

        let existCustomer = list.some((el: any) => {
          return (
            el.Firstname == "mahrokh" &&
            el.Lastname == "osanlou" &&
            el.DateOfBirth == "1991-10-26T20:30:00.000Z"
          );
        });

        let existEmail = list.some((el: any) => {
          return el.Email == "mahrokh@gmail.com";
        });

        const douplicate = existCustomer && existEmail ? true : false;
        expect(
          douplicate,
          `[{ Code : 201, Message: Duplicate customer by First-name, Last-name, Date-of-Birth! },
            { Code : 202, Message: Duplicate customer by Email address!}]`
        ).to.not.be.true;
      });
  });
});
