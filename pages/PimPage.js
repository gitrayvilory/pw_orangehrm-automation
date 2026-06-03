class PimPage {
  constructor(page) {
    this.page = page;
    this.addEmployeeButton = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button');
    this.firstNameInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[1]/div/div/div[2]/div[1]/div[2]/input');
    this.middleNameInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[1]/div/div/div[2]/div[2]/div[2]/input');
    this.lastNameInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[1]/div/div/div[2]/div[3]/div[2]/input');
    this.employeeIdInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input');
    this.saveButton = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]');
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async fillEmployeeForm(firstName, middleName, lastName, employeeId, imagePath = null) {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.click();
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
    
    await this.employeeIdInput.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.employeeIdInput.fill(employeeId);

    // Si envías una ruta de imagen, realiza la carga
  if (imagePath) {
    await this.page.locator('input[type="file"]').setInputFiles(imagePath);
  }

  }

  async clickSave() {
    await this.saveButton.click();
  }
}

module.exports = { PimPage };
