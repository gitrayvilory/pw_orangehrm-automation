class PimPage {
  constructor(page) {
    this.page = page;
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('xpath=//div[div/label[text()="Employee Id"]]//input');
    this.saveButton = page.locator('button:has-text("Save")');
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
