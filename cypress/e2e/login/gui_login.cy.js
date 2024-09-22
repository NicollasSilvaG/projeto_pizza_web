/// <reference types="Cypress"/>

describe('Teste Funcional de Login', () => {
    beforeEach(() => {
      localStorage.clear();
  
      const users = [
        { email: 'paulo@gmail.com', password: '123' }
      ];
      localStorage.setItem('users_bd', JSON.stringify(users));
    });
    
    it('Deve realizar login com sucesso', () => {

      cy.visit('http://localhost:3000/login');
  
      cy.get('.email > input').type('paulo@gmail.com');
  
      cy.get('.senha > input').type('123');
  
      cy.get('.btn-login').click();
  
      cy.get('h1').should('contain', 'Home');

    });
  });
  