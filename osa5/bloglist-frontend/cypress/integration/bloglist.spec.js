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

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type(user.username)
      cy.get('#password-input').type(user.password)
      cy.get('#loginbutton').click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('dfjalöskdfjalösdjflökj')
      cy.get('#password-input').type('jsldfjlsdkjflsdkjf')
      cy.get('#loginbutton').click()

      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', { username: user.username, password: user.password })
        .then(response => {
          localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function () {
      cy.get('.blogForm>.togglable-button').click()

      cy.get('#title').type('Some title')
      cy.get('#author').type('Some author')
      cy.get('#url').type('www.somewebsite.com')

      cy.get('#add-blog-btn').click()
      cy.get('.blogs').contains('Some title')
    })

    describe('When a blog has been added', function () {
      const addBlog = name => {
        cy.get('.blogForm>.togglable-button').click()

        cy.get('#title').type(`${name} title`)
        cy.get('#author').type(`${name} author`)
        cy.get('#url').type(`www.${name}website.com`)
  
        cy.get('#add-blog-btn').click()
      }
      beforeEach(function () {
        addBlog('First')
      })

      it('A blog can be liked', function () {
        cy.get('.view-btn').click()
        cy.get('.like-btn').click()
        cy.get('.like-btn').click()

        cy.get('.like-container').contains('2')
      })

      it('A blog can be removed', function () {
        cy.get('.view-btn').click()
        cy.get('.delete-btn').click()
        cy.on('window:confirm', () => true)

        cy.get('.message').contains('Removed blog First title')
      })

      it('Blogs are sorted by likes', function () {
        addBlog('Second')
        addBlog('Third')

        cy.get('.blogs').contains('First').parent().as('FirstBlog')
        cy.get('.blogs').contains('Second').parent().as('SecondBlog')
        cy.get('.blogs').contains('Third').parent().as('ThirdBlog')

        cy.get('@FirstBlog').contains('view').click()
        cy.get('@SecondBlog').contains('view').click()
        cy.get('@ThirdBlog').contains('view').click()

        cy.get('@SecondBlog').contains('Like').click()
        cy.get('@SecondBlog').contains('Like').click()
        cy.get('@ThirdBlog').contains('Like').click()
        cy.get('@ThirdBlog').contains('Like').click()
        cy.get('@ThirdBlog').contains('Like').click()

        cy.get('.blogInfo').then(containers => {
          cy.wrap(containers[0]).should('contain', 'Third')
          cy.wrap(containers[1]).should('contain', 'Second')
          cy.wrap(containers[2]).should('contain', 'First')
        })
      })


    })
  })


})