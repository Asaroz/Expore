/// <reference types="cypress" />

describe("Register", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("Has four input fields (email, password, confirm password and name)", () => {
        cy.get(".registerContainer").find("input").should("have.length", 4);
    });

    it("Asks for valid email", () => {
        cy.get("input#email").type("invalid").then(e => e[0].checkValidity()).should("be.false");
        cy.get("input#email").type("valid@test.com").then(e => e[0].checkValidity()).should("be.true");
    });

    it("Asks for password", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").then(e => e[0].checkValidity()).should("be.false");
    });

    it("Asks for confirm password", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("1234");
        cy.get("input#passwordConfirm").then(e => e[0].checkValidity()).should("be.false");
    });

    it("Asks for name", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("1234");
        cy.get("input#passwordConfirm").type("1234");
        cy.get("input#name").then(e => e[0].checkValidity()).should("be.false");
        cy.get("input#name").type("valid").then(e => e[0].checkValidity()).should("be.true");
    });

    it("Asks for avatar", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("1234");
        cy.get("input#passwordConfirm").type("1234");
        cy.get("input#name").type("valid");
        cy.get("button[type='submit']").click();
        cy.get("div.warning").contains("Must select an avatar");
    });

    it("Fail to register when passwords don't match", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("123456");
        cy.get("input#passwordConfirm").type("123457");
        cy.get("input#name").type("valid");
        cy.get("input#avaPoultryOne").click();
        cy.get("button[type='submit']").click();
        cy.get("div.warning").contains("Passwords must match");
    });

    it("Fail to register valid@test.com because user already exists", () => {
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("123456");
        cy.get("input#passwordConfirm").type("123456");
        cy.get("input#name").type("valid");
        cy.get("input#avaPoultryOne").click();
        cy.get("button[type='submit']").click();
        cy.get("div.warning").contains("Email already exists");
    });
    
});