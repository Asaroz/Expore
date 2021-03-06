/// <reference types="cypress" />

describe("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("Has three input fields (email, password and stay)", () => {
        cy.get("input").should("have.length", 3);
    });

    it("Asks for valid email", () => {
        cy.get("input#email").type("invalid").then(e => e[0].checkValidity()).should("be.false");
        cy.get("input#email").type("valid@test.com").then(e => e[0].checkValidity()).should("be.true");
    });

    it("Asks for password", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").then(e => e[0].checkValidity()).should("be.false");
    });

    it("Logs in, click, opens on dropdown menu and logs out", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("123456");
        cy.get("button[type='submit']").click();
        cy.get("h1").contains("Welcome Test User");
        cy.get("img.userPageAvatar").click();
        cy.get("div#itemPageLogout").click();
        cy.get("input").should("have.length", 3);
    });

});