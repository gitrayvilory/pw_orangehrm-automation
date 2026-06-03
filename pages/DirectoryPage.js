class DirectoryPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;

    // Selectores XPath extraídos estrictamente de tu JSON
    this.employeeNameInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input');
    this.searchButton = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]');
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
    await this.employeeNameInput.click();
    await this.employeeNameInput.fill(employeeName);
    
    // Espera prudencial para que el componente asíncrono cargue las sugerencias en pantalla
    await this.page.waitForTimeout(1000);
    
    // Réplica exacta de las acciones por teclado del JSON (ArrowDown + Enter)
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    
    // Clic en el botón de búsqueda
    await this.searchButton.click();
  }
}

module.exports = { DirectoryPage };
