describe('E2E Testing', () => {
  it('should navigate to home page', () => {
    cy.visit('/');
  });

  it('sould wait for table list render', () => {
    cy.wait(500);
    cy.get('.rdt_TableBody').find('.rdt_TableRow').should('have.length', 50);
  });

  it('sould filter table list by Male gender', () => {
    cy.get('[data-testid="gender"]').select('male');

    cy.wait(500);

    cy.get('.rdt_TableBody')
      .get('.rdt_TableRow')
      .eq(1)
      .get('.rdt_TableCell:nth-child(2)')
      .eq(1)
      .should('have.text', 'Male');
  });

  it('sould filter table list by Female gender', () => {
    cy.get('[data-testid="gender"]').select('female');

    cy.wait(500);

    cy.get('.rdt_TableBody')
      .get('.rdt_TableRow')
      .eq(1)
      .get('.rdt_TableCell:nth-child(2)')
      .eq(1)
      .should('have.text', 'Female');
  });

  it('sould click on load more button', () => {
    cy.get('[data-testid="load-more"]').click();

    cy.wait(500);

    cy.get('.rdt_TableBody').find('.rdt_TableRow').should('have.length', 100);
  });

  it('sould search by first name', () => {
    cy.get('.rdt_TableBody')
      .get('.rdt_TableRow')
      .eq(1)
      .get('.rdt_TableCell:nth-child(1)')
      .eq(1)
      .then(($elem) => {
        const fullName = $elem.text();
        const firstName = fullName.split(' ')[0];
        cy.get('[data-testid="search"]').type(firstName);
      });
    
    cy.wait(500);

    cy.get('.rdt_TableBody').find('.rdt_TableRow').should('have.length', 1);

    cy.get('[data-testid="search"]').clear();
  });

  it('sould open client detail modal', () => {
    cy.get('.rdt_TableBody')
      .get('.rdt_TableRow')
      .eq(1)
      .get('.rdt_TableCell:nth-child(5)')
      .eq(1)
      .find('button')
      .click();

    cy.url().should('include', 'viewId');
  });

  it('sould client detail modal has ID', () => {
    cy.get('.chakra-modal__content')
      .get('ul')
      .get('li:last-child')
      .should('not.be.empty');

    cy.url().should('include', 'viewId');
  });
});
