/// <reference types="cypress" />

describe("Create Universe", () => {
    beforeEach(() => {
        // Logs in before each test
        cy.visit("/");
        cy.get("input#email").type("valid@test.com");
        cy.get("input#password").type("123456");
        cy.get("button[type='submit']").click();
    });

    it("Create a new universe", () => {
        cy.get(".universePageButton").click();
        cy.get("#title").type("New Universe");
        cy.get("#description").type("Description for new Universe");
        cy.get("button[type='submit']").click();
    });

    it("Go to new universe page and create a new item", () => {
        cy.get("[testId='universeLink']").contains("New Universe").click();
        cy.get("[testId='createItemButton']").contains("New item").click();
        cy.get("#title").type("New Item");
        cy.get("#description").type("Description for new item");
        cy.get("button[type='submit']").click();
    });

    it("Deletes the universe and the subitem", () => {
        cy.get("[testId='deleteUniverseButton']").eq(0).click();
        cy.get(".btn.btn-danger").click();
        cy.get("[testId=confirmDelete]").click();
    });

    it("Verifies that everything was deleted", () => {
        cy.get("p").contains("You don't have any universes");
       
    });
});