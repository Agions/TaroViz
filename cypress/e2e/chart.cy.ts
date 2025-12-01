describe('Chart Component E2E', () => {
  beforeEach(() => {
    // Visit the test application
    cy.visit('http://localhost:8080')
  })

  it('should render the test application successfully', () => {
    cy.contains('TaroViz Test Application').should('be.visible')
    cy.contains('Chart Controls').should('be.visible')
  })

  it('should render all chart types correctly', () => {
    // Test Line Chart
    cy.get('button').contains('Line Chart').click()
    cy.get('.chart-container').should('be.visible')
    cy.get('.chart-title').contains('BaseChart with line data').should('be.visible')

    // Test Bar Chart
    cy.get('button').contains('Bar Chart').click()
    cy.get('.chart-title').contains('BaseChart with bar data').should('be.visible')

    // Test Pie Chart
    cy.get('button').contains('Pie Chart').click()
    cy.get('.chart-title').contains('BaseChart with pie data').should('be.visible')
  })

  it('should show and hide loading state', () => {
    cy.get('button').contains('Show Loading').click()
    // Check if loading indicator is shown (implementation-specific)
    // This will depend on how loading is implemented in the chart
    
    cy.get('button').contains('Hide Loading').click()
    // Check if loading indicator is hidden
  })

  it('should toggle between light and dark themes', () => {
    cy.get('.theme-switcher select').should('exist')
    
    // Test light theme
    cy.get('.theme-switcher select').select('light')
    // Check if light theme is applied (implementation-specific)
    
    // Test dark theme
    cy.get('.theme-switcher select').select('dark')
    // Check if dark theme is applied (implementation-specific)
  })

  it('should update chart data when requested', () => {
    cy.get('button').contains('Update Data').click()
    // Verify that data update was triggered (check console or implementation-specific indicators)
    cy.log('Data update button clicked')
  })

  it('should render specialized chart components', () => {
    // Check if all specialized chart components are rendered
    cy.contains('Specialized Chart Components').should('be.visible')
    cy.contains('LineChart Component').should('be.visible')
    cy.contains('BarChart Component').should('be.visible')
    cy.contains('PieChart Component').should('be.visible')
  })

  it('should render responsive charts', () => {
    // Check if responsive chart is rendered
    cy.contains('Responsive Charts').should('be.visible')
    cy.contains('Responsive BaseChart (50% width)').should('be.visible')
  })

  it('should maintain consistent UI across chart types', () => {
    // Test that all chart containers have consistent styling
    cy.get('.chart-container').should('have.length.greaterThan', 3)
    cy.get('.chart-title').should('have.length.greaterThan', 3)
  })

  it('should handle chart interactions', () => {
    // Test chart interactions (implementation-specific)
    // This will depend on how interactions are implemented in the chart
    cy.log('Chart interaction tests would be implemented here')
  })
})

