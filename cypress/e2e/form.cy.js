describe('Formulário de Cadastro - Testes Automatizados', () => {
  beforeEach(() => {
    cy.visit('https://qa-training.sbx.devsquad.app/')
  })

  it.only('preenche e nome e email com dados válidos', () => {
    // Preenche nome e e-mail
    cy.get('#name').type('HeitorCeschin')
    cy.get('#email').type('heitor@teste.com')
    // Preenche data de nascimento válida
    cy.get('input[type="date"]').type('1990-01-01')
  })

  it.only('preenche e nome  com dados Inválidos', () => {
    // Preenche nome invalido
    cy.get('#name').type('Heitor@#$%%$#$983()*(')
  })

  it.only('preencher numero americano/canadense', () => {
    // Define prefixo +1 (EUA, CAN)
    cy.get('#countryPrefix').invoke('val', '1').trigger('input')

    // Preenche telefone (mesmo com formatação invisível)
    cy.get('#phone').invoke('val', '(555)5551234').trigger('input')
  })

  it.only('Seleciona o segundo botão de rádio ("Business") pelo índice', () => {
    // Clica no segundo botão de rádio dentro do grupo (índice 1 = Business)
    cy.get('[role="radiogroup"]')
      .find('[role="radio"]')
      .eq(1) 
      .click({ force: true })

    // Valida que ele está selecionado
    cy.get('[role="radiogroup"]')
      .find('[role="radio"]')
      .eq(1)
      .should('have.attr', 'aria-checked', 'true')
  })

  it.only('permite inserir valor negativo na renda (BUG)', () => {
    cy.get('#annualIncome')
      .type('-50000', { delay: 0 })

    // Validação com vírgula, como aparece na interface visual
    cy.get('#annualIncome').should('have.value', '-50,000')

  })

  it.only('aceita data de nascimento futura (BUG)', () => {
    const futureDate = '2100-01-01'
    cy.get('input[type="date"]').type(futureDate)
    cy.get('input[type="date"]').should('have.value', futureDate)
  })

  it.only('permite selecionar o país "Brazil" e o estado "Arizona" ', () => {
    // Country 
    cy.get('[data-flux-control]').eq(0).click({ force: true })
    cy.contains('Brazil').click({ force: true })

    // State
    cy.get('[data-flux-control]').eq(1).click({ force: true })
    cy.contains('Arizona').click({ force: true })

  })

  //teste Mostrando envio de formulario com informações inválidas , mostrando que obteve sucesso
  it.only('preenche o formulário com valores incorretos e submete com sucesso (BUG)', () => {
    // Nome e e-mail válidos
    cy.get('#name').type('Heitor Ceschin')
    cy.get('#email').type('heitor@teste.com')

    // Prefixo e telefone
    cy.get('#countryPrefix').invoke('val', '+55').trigger('input')
    cy.get('#phone').invoke('val', '11983334056').trigger('input')

    // Data de nascimento futura
    cy.get('input[type="date"]').type('2090-01-01')

    // Seleciona tipo "Business" (2º radio)
    cy.get('[role="radiogroup"]').find('[role="radio"]').eq(1).click({ force: true })
    cy.get('[role="radiogroup"]').find('[role="radio"]').eq(1).should('have.attr', 'aria-checked', 'true')

    // Renda anual negativa 
    cy.get('#annualIncome')
      .type('-50000', { delay: 0 })
      .should('have.value', '-50,000')

    // Seleciona combinação inválida: Brazil + Arizona
    cy.get('[data-flux-control]').eq(0).click({ force: true })
    cy.contains('Brazil').click({ force: true })

    cy.get('[data-flux-control]').eq(1).click({ force: true })
    cy.contains('Arizona').click({ force: true })

    // Aceita termos que esta quebrado, o cypress quebra 
    /*cy.get('input[type="checkbox"]').check({ force: true })*/

    // enviar formulário
    cy.get('.absolute').click({ force: true })

    // Verifica mensagem de sucesso
    cy.contains('Client created successfully!', { timeout: 10000 })
      .should('be.visible')
  })
})
