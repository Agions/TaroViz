describe('TaroViz Charts E2E Tests', () => {
  beforeEach(() => {
    // Visit the development server
    cy.visit('http://localhost:8080');
  });

  it('should render the main application', () => {
    // Check if the app container exists
    cy.get('#root').should('exist');
  });

  it('should render chart controls', () => {
    // Check if chart controls section exists
    cy.contains('Chart Controls').should('be.visible');

    // Check if all control buttons exist
    cy.contains('button', 'Line Chart').should('exist');
    cy.contains('button', 'Bar Chart').should('exist');
    cy.contains('button', 'Pie Chart').should('exist');
    cy.contains('button', 'Update Data').should('exist');
    cy.contains('button', 'Show Loading').should('exist');
    cy.contains('button', 'Dark Mode').should('exist');
  });

  it('should render all chart sections', () => {
    // Check if all chart sections exist
    cy.contains('h2', 'BaseChart Component').should('be.visible');
    cy.contains('h2', 'Specialized Chart Components').should('be.visible');
    cy.contains('h2', 'Responsive Charts').should('be.visible');
  });

  it('should display chart containers', () => {
    // Check if chart containers are displayed
    cy.get('.chart-container').should('have.length.greaterThan', 0);
    cy.get('.chart-title').should('have.length.greaterThan', 0);
  });

  it('should handle chart type switching', () => {
    // Test switching to bar chart
    cy.contains('button', 'Bar Chart').click();
    cy.contains('.chart-title', 'BaseChart with bar data').should('be.visible');

    // Test switching to pie chart
    cy.contains('button', 'Pie Chart').click();
    cy.contains('.chart-title', 'BaseChart with pie data').should('be.visible');

    // Test switching back to line chart
    cy.contains('button', 'Line Chart').click();
    cy.contains('.chart-title', 'BaseChart with line data').should('be.visible');
  });

  it('should toggle dark mode', () => {
    // Test dark mode toggle
    cy.contains('button', 'Dark Mode').click();
    cy.get('.theme-switcher select').should('have.value', 'dark');

    // Test light mode toggle
    cy.contains('button', 'Light Mode').click();
    cy.get('.theme-switcher select').should('have.value', 'light');
  });

  it('should toggle loading state', () => {
    // Test showing loading
    cy.contains('button', 'Show Loading').click();
    cy.contains('button', 'Hide Loading').should('be.visible');

    // Test hiding loading
    cy.contains('button', 'Hide Loading').click();
    cy.contains('button', 'Show Loading').should('be.visible');
  });

  it('should update data when button is clicked', () => {
    // Test update data button - just verify it clicks without errors
    cy.contains('button', 'Update Data').click();
    // Click again to ensure multiple clicks work
    cy.contains('button', 'Update Data').click();
    // No assertion needed beyond successful click
  });
});
