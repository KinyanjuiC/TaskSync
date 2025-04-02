describe('TaskSync End-to-End Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080'); // Replace with your local server URL
    });

    it('should add a new task', () => {
        cy.get('#task-title').type('Test Task 1');
        cy.get('#task-description').type('This is a test task');
        cy.get('#task-priority').select('High');
        cy.get('#profile-selector').select('Work');
        cy.get('#task-due-date').type('2025-04-10');
        cy.get('button[type="submit"]').click();

        cy.get('.list-group-item').should('have.length', 1);
        cy.contains('Test Task 1');
        cy.contains('High');
        cy.contains('Work');
    });

    it('should mark a task as completed', () => {
        cy.get('#task-title').type('Test Task 2');
        cy.get('#task-description').type('Complete this task');
        cy.get('#task-priority').select('Medium');
        cy.get('#profile-selector').select('Personal');
        cy.get('#task-due-date').type('2025-04-15');
        cy.get('button[type="submit"]').click();

        cy.get('.complete-task').click();
        cy.get('.list-group-item.completed').should('have.length', 1);
    });

    it('should delete a task', () => {
        cy.get('#task-title').type('Test Task 3');
        cy.get('#task-description').type('Delete this task');
        cy.get('#task-priority').select('Low');
        cy.get('#profile-selector').select('Default');
        cy.get('#task-due-date').type('2025-04-20');
        cy.get('button[type="submit"]').click();

        cy.get('.delete-task').click();
        cy.get('.list-group-item').should('have.length', 0);
    });

    it('should edit a task', () => {
        cy.get('#task-title').type('Test Task 4');
        cy.get('#task-description').type('Edit this task');
        cy.get('#task-priority').select('High');
        cy.get('#profile-selector').select('Custom');
        cy.get('#task-due-date').type('2025-04-25');
        cy.get('button[type="submit"]').click();

        cy.get('.edit-task').click();
        cy.get('#task-title').clear().type('Updated Task 4');
        cy.get('button[type="submit"]').click();

        cy.contains('Updated Task 4');
    });
});