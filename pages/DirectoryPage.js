class DirectoryPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;

    // Selectores XPath extraídos estrictamente de tu JSON
    this.directoryButton = page.locator("xpath=//button[i[contains(@class, 'bi-caret-down-fill')]]");
    this.employeeNameInput = page.locator("xpath=//input[@placeholder='Type for hints...']")//page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input');
    this.searchButton = page.locator('button:has-text("Search")');
    //this.searchResultText = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[3]/div/div[1]/div/div[2]/div/div/input');
  }

  /**
   * Navega directamente a la URL del módulo Directory registrada en el JSON
   */
  async navigate() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
  }

  /**
   * Realiza la búsqueda interactuando con el sistema de hints/autocompletado del sistema
   * @param {string} employeeName 
   */
  async searchByEmployeeName(employeeName) {
    await this.directoryButton.click(); // Clic en el botón Directory para activar el módulo
    await this.employeeNameInput.click();
    await this.employeeNameInput.fill(employeeName);
    
    // Espera prudencial para que el componente asíncrono cargue las sugerencias en pantalla
    await this.page.waitForTimeout(2000);
    
    // Réplica exacta de las acciones por teclado del JSON (ArrowDown + Enter)
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    
    // Clic en el botón de búsqueda
    await this.searchButton.click();
  }
}

module.exports = { DirectoryPage };
