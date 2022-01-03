/* eslint-disable no-undef */
describe('Bloglist', function () {
  const user = {
    name: 'Teemu Teekkari',
    username: 'tteekkari',
    password: 'salainen'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Log in')
  })

  it('user can login', function () {
    cy.get('#username-input').type(user.username)
    cy.get('#password-input').type(user.password)
    cy.get('#loginbutton').click()

    cy.contains(`${user.name} logged in`)
  })

418
})