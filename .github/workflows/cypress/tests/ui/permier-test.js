describe('TwentyCampusWP', {
    viewportHeight: 1000,
    viewportWidth: 1500
}, function () {

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    afterEach(() => {
        if (cy.state('test').state === 'failed') {
            Cypress.runner.stop()
        }
    })

    it('Visualisation de la page d\'accueil et click sur le bouton recherche', function () {
        cy.visit('http://localhost')

        cy.contains('premier')
    })

})
