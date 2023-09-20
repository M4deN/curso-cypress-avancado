describe('Hacker Stories Vercel', () => {

    const initialTerm = 'redux'
  
    context('Vercel Hacker Stories Lesson Finaly', () => {  
      beforeEach(() => {

        cy.visit('https://hackernews-seven.vercel.app/')
        cy.intercept(
          'GET',
          `**/search?query=${initialTerm}&page=0&hitsPerPage=100`         
        ).as('cachedRequest')
      })
  
      it('Verifica se a requisição inicial foi cacheada', () => {

        cy.visit('https://hackernews-seven.vercel.app/')
        cy.wait('@cachedRequest').then((interception) => {
            const interceptedResponse = interception.response.body
            expect(interceptedResponse).to.have.property('hits')
            expect(interceptedResponse.hits).to.be.an('array')
            expect(interceptedResponse.hits).to.have.length.above(0)
            Cypress.log({
                name: 'Intercepted Response',
                message: JSON.stringify(interception.response.body) 
            })   
      })
    })
  
      it('Recarrega a página e verifica novamente a requisição', () => {
        
        cy.reload()
        cy.wait('@cachedRequest').then((interception) => {
            const interceptedResponse = interception.response.body
            expect(interceptedResponse).to.have.property('hits')
            expect(interceptedResponse.hits).to.be.an('array')
            expect(interceptedResponse.hits).to.have.length.above(0)
            Cypress.log({
                name: 'Intercepted Response',
                message: JSON.stringify(interception.response.body) 
            })   
        })
      })
    })
})