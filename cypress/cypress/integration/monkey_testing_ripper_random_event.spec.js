describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})
function randomEvent(monkeysLeft) {
    var monkeysLeft = monkeysLeft;

    if(monkeysLeft > 0) {
        var randomOption = getRandomInt(0,4);
    
        switch (randomOption) {
            case 0:
                randomClick();
                break;
            case 1:
                randomFillTextInput();
                break;
            case 2:
                randomSelectCombo();
                break;
            case 3:
                randomButtonClick();
                break;
        }    
        
        monkeysLeft = monkeysLeft - 1;
        cy.log(randomOption);        
        setTimeout(randomEvent, 10000, monkeysLeft);
    }       
}

function randomClick() {      
    cy.get('a').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});            
        }            
    });    
    cy.log("randomClick");
}

function randomFillTextInput() {          
    cy.get('input').then($textInputs => {
        var randomTextInput = $textInputs.get(getRandomInt(0, $textInputs.length));
        if(!Cypress.dom.isHidden(randomTextInput)) {
            cy.wrap(randomTextInput).click({force: true}).type("test");            
        }            
    });
    cy.log("randomFillTextInput");
}

function randomSelectCombo() {      
    cy.get('select').then($combos => {
        var randomCombo = $combos.get(getRandomInt(0, $combos.length));                 
        
        if(!Cypress.dom.isHidden(randomCombo)) {
            cy.wrap(randomCombo).children('option')
            .eq(getRandomInt(0, randomCombo.length))
            .then(e => {
                cy.wrap(randomCombo).select(e.val())
              });
        }            
    });
    cy.log("randomSelectCombo");
}

function randomButtonClick() {      
    cy.get('button').then($buttons => {
        var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
        if(!Cypress.dom.isHidden(randomButton)) {
            cy.wrap(randomButton).click({force: true});            
        }            
    });    
    cy.log("randomButtonClick");   
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};