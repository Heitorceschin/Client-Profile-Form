# Testes Automatizados com Cypress - Projeto DevSquad QA

##  Objetivo
Este repositório tem como finalidade demonstrar a automação de testes end-to-end utilizando Cypress, validando fluxos críticos e identificando bugs na aplicação.

## 📎 Documentação de Testes Manuais
 [Abrir Formulario ](https://qa-training.sbx.devsquad.app/)
---

##  Estrutura de Pastas
```bash
project-devsquad-qa/
├── cypress/
│   ├── e2e/
│   │   └── form.cy.js          # Testes principais
│   ├── support/
│   └── fixtures/
├── docs/
│   └── Testes_Manuais.docx     # Evidências e testes manuais
├── package.json
├── README.md
```

---

## 🛠 Scripts Disponíveis
Scripts definidos no `package.json`:
```json
"scripts": {
  "cy:open": "cypress open",
  "cy:open:mobile": "cypress open --config viewportWidth=410,viewportHeight=860",
  "test": "cypress run",
  "test:mobile": "cypress run --config viewportWidth=410,viewportHeight=860",
  "test:cloud": "cypress run --record"
}
```

###  Como executar
```bash
npm install
npm run cy:open      # Para abrir a interface do Cypress
npm run test          # Para rodar em modo headless
```

---

##  Bugs Detectados e Documentados com Cypress

### 1. `Radio Business` não selecionável com seletor tradicional
> O componente é visualmente um botão customizado, não um `input[type="radio"]`.
```js
cy.get('[role="radiogroup"]').find('[role="radio"]').eq(1).click({ force: true })
```

### 2. Campo de renda aceita valor negativo
> Mesmo com máscara visual, o valor `-50000` é aceito e renderizado como `-50,000`.
```js
cy.get('#annualIncome').type('-50000', { delay: 0 })
cy.get('#annualIncome').should('have.value', '-50,000')
```

### 3. País e estado não se correlacionam
> É possível selecionar `Brazil` como país e `Arizona` como estado, o que é inválido.
```js
cy.get('[data-flux-control]').eq(0).click({ force: true })
cy.contains('Brazil').click({ force: true })
cy.get('[data-flux-control]').eq(1).click({ force: true })
cy.contains('Arizona').click({ force: true })
```

### 4. Botão de envio com classe `.absolute`
> Não há um `button[type="submit"]`, sendo necessário clicar usando a classe visual.
```js
cy.get('.absolute').click({ force: true })
```

### 5. Toast de sucesso exibido em inglês
> A mensagem exibida é `Client created successfully!`, usada para validação.
```js
cy.contains('Client created successfully!', { timeout: 10000 })
  .should('be.visible')
```

### 6. Erros no console (não impedem execução)
```bash
TypeError: Cannot redefine property: disabled
```

---

## 📎 Documentação de Testes Manuais
📄 [Abrir arquivo PDF com testes manuais](docs\Relatorio_Teste_Manual_Heitor_Ceschin.pdf)

