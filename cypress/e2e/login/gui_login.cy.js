/// <reference types="Cypress"/>
describe.only('Teste Funcional de Login', () => {
  beforeEach(() => {
    localStorage.clear();

    const users = [
      { email: 'paulo@gmail.com', password: '123' }
    ];
    localStorage.setItem('users_bd', JSON.stringify(users));
  });

  it.only('Deve realizar login com sucesso', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('.email > input').type('paulo@gmail.com');
    cy.get('.senha > input').type('123');
    cy.get('.btn-login').click();

    cy.url().should('eq', 'http://localhost:3000/home?'); 
    cy.get('h3').should('contain', 'Menu');
  });

  it('Não deve permitir login com credenciais inválidas', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('.email > input').type('user_invalido@gmail.com');
    cy.get('.senha > input').type('senha_incorreta');
    cy.get('.btn-login').click();

    cy.url().should('eq', 'http://localhost:3000/login');

    cy.get('.error-message').should('contain', 'Credenciais inválidas');
  });
});
