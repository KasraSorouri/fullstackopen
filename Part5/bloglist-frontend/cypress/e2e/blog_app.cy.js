describe('Blog App Test', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Test',
      username: 'user1',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('/')
  })

  it('Login form is shown', function () {
    cy.get('html')
      .should('contain', 'login')
      .should('contain', 'username')
      .should('contain', 'password')
      .should('not.contain', 'blogs')
  })

  describe('Login test', function () {
    it('Login fails whith wrong username', function () {
      cy.get('[name="username"]').type('wrong')
      cy.get('[name="password"]').type('1234')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(120, 5, 55)')
    })

    it('Login fails whith wrong password', function () {
      cy.get('[name="username"]').type('user1')
      cy.get('[name="password"]').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(120, 5, 55)')
    })

    it('Successful login', function () {
      cy.get('[name="username"]').type('user1')
      cy.get('[name="password"]').type('1234')
      cy.contains('login').click()

      cy.get('html')
        .should('contain', 'User Test logged in')
    })
  })

  describe('After logged in', function () {
    beforeEach(function () {
      cy.login({ username:'user1', password:'1234' })
    })

    it('New blog can be created', function () {
      cy.contains('Add Blog').click()
      cy.get('[name="title"]').type('The test blog')
      cy.get('[name="author"]').type('Test Person')
      cy.get('[name="url"]').type('www.test.com')
      cy.get('#createNewBlog').click()

      cy.contains('The test blog by Test Person')
    })
  })
})

