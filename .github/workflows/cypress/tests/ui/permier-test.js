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
        cy.visit('https://www.twenty-campus.com/fr/')

        cy.contains('.footer_banner_button', 'JE RECHERCHE').click()
    })

    it('Vérification existence des résidences', function () {
        cy.wait(3000)

        cy.get('body')
            .then(($body) => {
                if ($body.find('.leaflet-marker-icon').length === 0) {
                    throw new Error('Il n\'y a pas de résidence')
                }

                if ($body.find('.leaflet-marker-icon').length < 9) {
                    throw new Error('On affiche ' + $body.find('.leaflet-marker-icon').length + ' clusters')
                }
            })
    })

    it('Recherche de la ville d\'Amiens', function () {
        cy.get('body')
            .then(($body) => {
                // On écrit dans la recherche la ville
                cy.get('#map_residences_searcher')
                    .type('Amiens')

                cy.wait(200)

                // On sélectionne la ville dans l'autocomplete
                cy.get('.ui-menu-item-wrapper')
                    .first()
                    .click()

                cy.wait(500)

                // On clique sur la ville
                cy.get('.town_list .aside_item')
                    .first()
                    .click()

                // On accède à la ville sélectionnée.
                cy.get('.town_list .aside_item.active .aside_get')
                    .click()
            })
    })

    it('Sélectionner la résidence', function () {
        cy.wait(500)
        cy.get('#principal-city').scrollIntoView()

        cy.get('#principal-city .all-city-region div a')
            .first()
            .click()
    })

    it('Voir les logements', function () {
        cy.wait(200)

        cy.get('.footer_banner_link')
            .click()
    })

    it('Sélectionner et réserver le studio 18m²', function () {
        cy.wait(200)

        cy.get('#housing_selector .housing_selector_item')
            .eq(1)
            .click()

        cy.contains('.description p', '17 et 19m²')

        cy.get('.add_housing_button')
            .click()
    })

    it('On arrive sur le dossier locataire', function () {
        cy.wait(200)

        cy.url().should('include', 'logement_id=')
        cy.contains('.register__step-title', 'Préparation du dossier')
    })
})
